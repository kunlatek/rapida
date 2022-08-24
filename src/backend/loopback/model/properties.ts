import { FormElementInterface } from "../../../interfaces/form";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";
import { getAllElements } from "../main";

const stringTypes = [
  "email",
  "password",
  "tel",
  "text",
  "url",
  "date",
  "datetime-local",
  "month",
  "range",
  "time",
  "url",
  "week",
];
const numberTypes = ["number"];

const booleanTypes = ["slide"];

const setModelProperties = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let code = `
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;
  `;

  const elements: Array<FormElementInterface> = getAllElements(object.form.elements);

  elements.forEach((element) => {
    code += setByElement(object, element);
  });

  return code;
};

const setByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  const modelName = object.form!.id.replace("Form", "");
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  let code = ``;

  const propertyType = value.isMultiple ?
    'array' :
    (
      stringTypes.includes(value.type || type) ? 'String' :
        (
          numberTypes.includes(value.type || type) ? 'number' :
            (booleanTypes.includes(value.type || type) ? 'boolean' : 'any')
        )
    )

  if (value.optionsApi && value.optionsApi.endpoint) {
    const className = TextTransformation.setIdToClassName(TextTransformation.pascalfy(TextTransformation.singularize(value.optionsApi.endpoint.split('-').join(' '))));
    const propertyName = TextTransformation.setIdToPropertyName(TextTransformation.pascalfy(TextTransformation.singularize(value.optionsApi.endpoint.split('-').join(' '))));
    const modelNameClass = TextTransformation.setIdToClassName(modelName);

    if (value.isMultiple) {
      code += `
        @property({ type: 'array', itemType: 'any'})
        ${value.name}?: any[];
        @hasMany(() => ${className}, {
          through: {
            model: () => ${modelNameClass}Has${className},
            ${modelNameClass === className ? `keyFrom: '${propertyName}Id', keyTo: '${propertyName}RelatedId',` : ''}
          }
        })
        ${propertyName}: ${className}[];
        `;
    } else {
      code += `
        @belongsTo(() => ${className})
        ${value.name}?: String;
        `;
    }
  } else {
    code += `
      @property({
          type: '${propertyType}',
          ${value.isMultiple ? "itemType: 'any'," : 'jsonSchema: {nullable: true},'}
      })
      ${value.name}?: ${value.isMultiple ? 'any[]' : propertyType};
      `;
  }

  // code += `
  //     @property({
  //         type: 'array',
  //         itemType: 'object',
  //     })
  //     ${value.id}?: object[];
  //     `;

  return code;
}


export {
  setModelProperties
};