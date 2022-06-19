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
  "autocomplete",
];

const setRepositoryConstructorParams = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let _constructorParams: string = ``;

  object.form.elements.forEach((element) => {
    _constructorParams += setConstructorParamsByElement(object, element);
  });

  let code = `
  @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ${_constructorParams}
  `;

  return code;
};

const setConstructorParamsByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  const modelName = object.form!.id.replace("Form", "");
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  let code = ``;

  if (validTypes.includes(type)) {
    if (value.optionsApi) {
      const modelNameClass = TextTransformation.setIdToClassName(modelName);
      const className = TextTransformation.setIdToClassName(
        TextTransformation.pascalfy(
          TextTransformation.singularize(
            value.optionsApi.endpoint.split("-").join(" ")
          )
        )
      );
      const propertyName = TextTransformation.setIdToPropertyName(
        TextTransformation.pascalfy(
          TextTransformation.singularize(
            value.optionsApi.endpoint.split("-").join(" ")
          )
        )
      );

      code += `@repository.getter('${className}Repository') ${propertyName}RepositoryGetter: Getter<${className}Repository>,`;

      if (value.isMultiple) {
        code += `@repository.getter('${modelNameClass}Has${className}Repository') ${modelName}Has${className}RepositoryGetter: Getter<${modelNameClass}Has${className}Repository>,`;
      }
    }
  } else if (type === "tabs") {
    element.tabs?.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        code += setConstructorParamsByElement(object, tabElement);
      });
    });
  }

  return code;
};

export { setRepositoryConstructorParams };
