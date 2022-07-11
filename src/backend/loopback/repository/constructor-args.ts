import { FormElementInterface } from "../../../interfaces/form";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";

const validTypes = [
  "checkbox",
  "radio",
  "datalist",
  "fieldset",
  "input",
  "select",
  "slide",
  "textarea",
  "text",
  "autocomplete",
];

const setRepositoryConstructorArguments = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }
  const modelName = object.form.id.replace("Form", "");
  let _repositoryConstructorArguments: string = ``;

  object.form.elements.forEach(element => {
    _repositoryConstructorArguments += setRepositoryConstructorArgumentsByElement(object, element);
  });

  let code = `
  super(${TextTransformation.pascalfy(modelName)}, dataSource);
  ${_repositoryConstructorArguments}
  `;

  return code;
};

const setRepositoryConstructorArgumentsByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  const modelName = object.form!.id.replace("Form", "");
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  let code = ``;

  if (validTypes.includes(type)) {
    if (value.optionsApi) {
      const className = TextTransformation.setIdToClassName(TextTransformation.pascalfy(TextTransformation.singularize(value.optionsApi.endpoint.split('-').join(' '))));
      const propertyName = TextTransformation.setIdToPropertyName(TextTransformation.pascalfy(TextTransformation.singularize(value.optionsApi.endpoint.split('-').join(' '))));

      if (value.isMultiple) {
        code += `
        this.${propertyName} = this.createHasManyThroughRepositoryFactoryFor('${propertyName}', ${modelName.toLowerCase() === className.toLowerCase() ? 'Getter.fromValue(this)' : `${propertyName}RepositoryGetter`}, ${modelName}Has${className}RepositoryGetter,);
        this.registerInclusionResolver('${propertyName}', this.${propertyName}.inclusionResolver);
        `;
      } else {
        code += `
        this.${propertyName} = this.createBelongsToAccessorFor('${propertyName}', ${propertyName}RepositoryGetter,);
        this.registerInclusionResolver('${propertyName}', this.${propertyName}.inclusionResolver);
        `;
      }
    }
  } else if (type === 'tabs') {
    element.tabs?.forEach(tab => {
      tab.elements.forEach(tabElement => {
        code += setRepositoryConstructorArgumentsByElement(object, tabElement);
      });
    });
  }

  return code;
};

export { setRepositoryConstructorArguments };
