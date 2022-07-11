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

const setRepositoryProperties = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let code = ``;

  object.form.elements.forEach(element => {
    code += setRepositoryPropertiesByElement(object, element);
  });

  return code;
};

const setRepositoryPropertiesByElement = (
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
        public readonly ${propertyName}: HasManyThroughRepositoryFactory<${className}, typeof ${className}.prototype._id,
          ${TextTransformation.pascalfy(modelName)}Has${className},
          typeof ${TextTransformation.pascalfy(modelName)}.prototype._id
        >;
        `;
      } else {
        code += `public readonly ${propertyName}: BelongsToAccessor<${className}, typeof ${TextTransformation.pascalfy(modelName)}.prototype._id>;`;
      }
    }
  } else if (type === 'tabs') {
    element.tabs?.forEach(tab => {
      tab.elements.forEach(tabElement => {
        code += setRepositoryPropertiesByElement(object, tabElement);
      });
    });
  }

  return code;
};

export { setRepositoryProperties };
