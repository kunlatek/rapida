import { FormElementInterface } from "../../../interfaces/form";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";
import { getAllElements } from "../main";

const setRepositoryProperties = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let code = ``;

  const elements: Array<FormElementInterface> = getAllElements(object.form?.elements);

  elements.forEach(element => {
    code += setRepositoryPropertiesByElement(object, element);
  });

  return code;
};

const setRepositoryPropertiesByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  const modelName = object.form!.id.replace("Form", "");
  const value = Object.values(element)[0];

  let code = ``;

  if (value.optionsApi && value.optionsApi.endpoint) {
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

  return code;
};

export { setRepositoryProperties };
