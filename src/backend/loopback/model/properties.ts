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

const setArrayTypeModels = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let code = ``;

  const elements: Array<FormElementInterface> = getAllElements(object.form.elements);

  elements.forEach((element) => {
    const type = Object.keys(element)[0];
    if (type === 'array') {
      const value = Object.values(element)[0];
      const relatedType = TextTransformation.setIdToClassName(value.id);

      let _properties = ``;
      let _relatedProperties = '';
      value.elements?.forEach((elementProperty: FormElementInterface) => {
        _properties += setByElementInArrayType(elementProperty);

        if (elementProperty.autocomplete) {
          const collection = TextTransformation.setIdToClassName(TextTransformation.pascalfy(TextTransformation.singularize(elementProperty.autocomplete?.optionsApi?.endpoint?.split('-').join(' ') || '')));
          _relatedProperties += `{ Collection: '${collection}', attr: '${elementProperty.autocomplete.name}' },`;
        }
      });

      const _arrayOfRelatedProperties = _relatedProperties.length ?
        `
      @property({
        type: 'array',
        itemType: 'object',
        jsonSchema: {nullable: true},
        default: [${_relatedProperties}]
      })
      __relatedAttributes?: object[];
      `
        : ``

      code += `
      @model()
      class ${relatedType} extends Entity {
        ${_properties}

        ${_arrayOfRelatedProperties}
      }
      `
    }
  });

  return code;
};

const setByElementInArrayType = (
  element: FormElementInterface
): string => {
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  let code = ``;

  const propertyType = value.isMultiple || type === 'array' ?
    'array' :
    (
      stringTypes.includes(value.type || type) ? 'String' :
        (
          numberTypes.includes(value.type || type) ? 'number' :
            (booleanTypes.includes(value.type || type) ? 'boolean' : 'any')
        )
    )

  code += `
  @property({
      type: '${propertyType}',
      ${value.isMultiple ? "itemType: 'any'," : 'jsonSchema: {nullable: true},'}
  })
  ${value.name}?: ${value.isMultiple ? 'any[]' : propertyType};
  `;

  if (type === 'autocomplete') {
    code += `
    @property({
        type: 'any',
        jsonSchema: {nullable: true},
    })
    ${value.name.slice(0, -2)}?: any;
    `;
  }

  return code;
}

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

  const propertyType = value.isMultiple || type === 'array' ?
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
  } else if (type === 'array') {
    const relatedType = TextTransformation.setIdToClassName(value.id);

    code += `
      @property({
          type: '${propertyType}',
          itemType: ${relatedType},
      })
      ${value.id}?: ${relatedType}[];
      `;
  } else {
    code += `
      @property({
          type: '${propertyType}',
          ${value.isMultiple ? "itemType: 'any'," : 'jsonSchema: {nullable: true},'}
      })
      ${value.name}?: ${value.isMultiple ? 'any[]' : propertyType};
      `;
  }

  return code;
}


export {
  setModelProperties,
  setArrayTypeModels,
};