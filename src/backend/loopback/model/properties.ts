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

const setArrayTypeModels = (formElements: Array<FormElementInterface>): string => {

  let code = ``;

  const elements: Array<FormElementInterface> = getAllElements(formElements);

  elements.forEach((element) => {
    let arrayTypeModels = ``;
    const type = Object.keys(element)[0];
    if (type === 'array') {
      const value = Object.values(element)[0];
      const relatedType = TextTransformation.setIdToClassName(value.id);

      let _properties = ``;
      let _relatedProperties = ``;

      const createProperties = (elements: Array<FormElementInterface>) => {
        let _propertiesToReturn = ``;
        let _relatedPropertiesToReturn = ``;

        for (let elementPropertyIndex = 0; elementPropertyIndex < elements?.length; elementPropertyIndex++) {
          const elementProperty = elements[elementPropertyIndex];

          _propertiesToReturn += setByElementInArrayType(elementProperty);

          if (elementProperty.array) {
            const _relatedTypeInMultidimensionalArray = TextTransformation.setIdToClassName(elementProperty.array.id);
            const _propertiesCreatedInMultidimensionalArray = createProperties(elementProperty.array.elements);

            // const _arrayOfRelatedPropertiesInMultidimensionalArray = _propertiesCreatedInMultidimensionalArray._relatedProperties.length ?
            //   `
            // @property({
            //   type: 'array',
            //   itemType: 'object',
            //   jsonSchema: {nullable: true},
            //   default: [${_propertiesCreatedInMultidimensionalArray._relatedProperties}]
            // })
            // __relatedAttributes?: object[];
            // `
            //   : ``;

            arrayTypeModels += `
            @model()
            class ${_relatedTypeInMultidimensionalArray} extends Entity {
              ${_propertiesCreatedInMultidimensionalArray._properties}
            }
          `;
          } else if (elementProperty.autocomplete) {
            const collection = TextTransformation.setIdToClassName(TextTransformation.pascalfy(TextTransformation.singularize(elementProperty.autocomplete?.optionsApi?.endpoint?.split('-').join(' ') || '')));
            _relatedPropertiesToReturn += `{ Collection: '${collection}', attr: '${elementProperty.autocomplete.name}' },`;
          }
        }

        return {
          _properties: _propertiesToReturn,
          _relatedProperties: _relatedPropertiesToReturn,
        };
      };

      const _propertiesCreated = createProperties(value.elements);
      _properties += _propertiesCreated._properties;
      _relatedProperties += _propertiesCreated._relatedProperties;

      // const _arrayOfRelatedProperties = _relatedProperties.length ?
      //   `
      // @property({
      //   type: 'array',
      //   itemType: 'object',
      //   jsonSchema: {nullable: true},
      //   default: [${_relatedProperties}]
      // })
      // __relatedAttributes?: object[];
      // `
      //   : ``;

      code += `
      ${arrayTypeModels}
      @model()
      class ${relatedType} extends Entity {
        ${_properties}
      }
      `;
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

  const propertyType = value.isMultiple || type === 'array' || value.type === 'file' ?
    'array' :
    (
      stringTypes.includes(value.type || type) ? 'String' :
        (
          numberTypes.includes(value.type || type) ? 'number' :
            (booleanTypes.includes(value.type || type) ? 'boolean' : 'any')
        )
    );

  if (type === 'array') {
    const relatedType = TextTransformation.setIdToClassName(value.id);

    code += `
        @property({
            type: '${propertyType}',
            itemType: 'any',
        })
        ${value.id}?: ${relatedType}[];
        `;
  } else {
    code += `
      @property({
          type: '${propertyType}',
          ${value.isMultiple || value.type === 'file' ? "itemType: 'any'," : 'jsonSchema: {nullable: true},'}
      })
      ${value.name}?: ${value.isMultiple || value.type === 'file' ? 'any[]' : propertyType};
      `;
  }

  if (type === 'autocomplete') {
    code += `
    @property({
        type: 'object',
        jsonSchema: {nullable: true},
    })
    ${value.name.slice(0, -2)}?: object;
    `;
  }

  return code;
};

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

  const propertyType = value.isMultiple || type === 'array' || value.type === 'file' ?
    'array' :
    (
      stringTypes.includes(value.type || type) ? 'String' :
        (
          numberTypes.includes(value.type || type) ? 'number' :
            (booleanTypes.includes(value.type || type) ? 'boolean' : 'any')
        )
    );

  // if (value.optionsApi && value.optionsApi.endpoint) {
  //   const className = TextTransformation.setIdToClassName(TextTransformation.pascalfy(TextTransformation.singularize(value.optionsApi.endpoint.split('-').join(' '))));
  //   const propertyName = TextTransformation.setIdToPropertyName(TextTransformation.pascalfy(TextTransformation.singularize(value.optionsApi.endpoint.split('-').join(' '))));
  //   const modelNameClass = TextTransformation.setIdToClassName(modelName);

  //   if (value.isMultiple) {
  //     code += `
  //       @property({ type: 'array', itemType: 'any'})
  //       ${value.name}?: any[];
  //       @hasMany(() => ${className}, {
  //         through: {
  //           model: () => ${modelNameClass}Has${className},
  //           ${modelNameClass === className ? `keyFrom: '${propertyName}Id', keyTo: '${propertyName}RelatedId',` : ''}
  //         }
  //       })
  //       ${propertyName}: ${className}[];
  //       `;
  //   } else {
  //     code += `
  //       @belongsTo(() => ${className})
  //       ${value.name}?: String;
  //       `;
  //   }
  // } else
  if (type === 'array') {
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
          ${value.isMultiple || value.type === 'file' ? "itemType: 'any'," : 'jsonSchema: {nullable: true},'}
      })
      ${value.name}?: ${value.isMultiple || value.type === 'file' ? 'any[]' : propertyType};
      `;
  }

  return code;
};


export {
  setModelProperties,
  setArrayTypeModels,
};
