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

  object.form.elements.forEach((element) => {
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

  if (validTypes.includes(type)) {
    const propertyType = value.isMultiple ?
      'array' :
      (
        stringTypes.includes(value.type || type) ? 'String' :
          (
            numberTypes.includes(value.type || type) ? 'number' :
              (booleanTypes.includes(value.type || type) ? 'boolean' : 'any')
          )
      )

    if (value.optionsApi) {
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
        ${propertyName}Id: String;
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
  } else if (type === 'tabs') {
    element.tabs?.forEach(tab => {
      tab.elements.forEach(tabElement => {
        code += setByElement(object, tabElement);
      });
    })
  } else if (type === 'array') {

    code += `
        @property({
            type: 'array',
            itemType: 'object',
        })
        ${value.id}?: object[];
        `;

    if (element.array?.elements) {
      element.array?.elements?.forEach(element => {
        code += setByElement(object, element);
      })
    }
  }

  return code;
}


export {
  setModelProperties
};