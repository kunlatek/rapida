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
  "month",
  "range",
  "time",
  "url",
  "week",
];
const numberTypes = ["number"];

const booleanTypes = ["slide"];

const dateTypes = ["date", "datetime-local"];

const setArrayTypeSchemas = (formElements: Array<FormElementInterface>): string => {

  let code = ``;

  const elements: Array<FormElementInterface> = getAllElements(formElements);

  elements.forEach((element) => {
    let arrayTypeSchemas = ``;

    const type = Object.keys(element)[0];

    if (type === 'array') {
      const value = Object.values(element)[0];
      const relatedType = TextTransformation.setIdToClassName(value.id);

      let _properties = ``;

      const createProperties = (elements: Array<FormElementInterface>) => {
        let _propertiesToReturn = ``;

        for (let elementPropertyIndex = 0; elementPropertyIndex < elements?.length; elementPropertyIndex++) {
          const elementProperty = elements[elementPropertyIndex];

          _propertiesToReturn += setByElementInArrayType(elementProperty);

          if (elementProperty.array) {
            const _relatedTypeInMultidimensionalArray = TextTransformation.setIdToClassName(elementProperty.array.id);
            const _propertiesCreatedInMultidimensionalArray = createProperties(elementProperty.array.elements);

            arrayTypeSchemas += `
              const ${_relatedTypeInMultidimensionalArray} = new Schema({
                ${_propertiesCreatedInMultidimensionalArray}
              });
            `;
          }
        }

        return _propertiesToReturn;
      };

      const _propertiesCreated = createProperties(value.elements);
      _properties += _propertiesCreated;

      code += `
      ${arrayTypeSchemas}
      
      const ${relatedType} = new Schema({
        ${_properties}
      });
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
    'Array' :
    (
      stringTypes.includes(value.type || type) ? 'String' :
        (
          numberTypes.includes(value.type || type) ? 'Number' :
            (
              booleanTypes.includes(value.type || type) ? 'Boolean' :
                (dateTypes.includes(value.type || type) ? 'Date' : 'Object')
            )
        )
    );

  if (value.optionsApi && value.optionsApi.endpoint) {

    const className = TextTransformation.setIdToClassName(TextTransformation.pascalfy(TextTransformation.singularize(value.optionsApi.endpoint.split('-').join(' '))));

    if (value.isMultiple) {
      code += `
        ${value.name}: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: '${className}',
          }
        ],
      `;
    } else {
      code += `
        ${value.name}: {
          type: mongoose.Schema.Types.ObjectId,
          ref: '${className}',
          required: ${value.isRequired || false},
          ${!value.isRequired ? 'default: null,' : ''}
        },
      `;
    }
  } else if (type === 'array') {
    const relatedType = TextTransformation.setIdToClassName(value.id);

    code += `
      ${value.id}: [
        ${relatedType}
      ],
    `;
  } else {
    code += `
      ${value.name}: {
        type: ${propertyType},
        required: ${value.isRequired || false},
        ${!value.isRequired ? 'default: null,' : ''}
      },
    `;
  }

  return code;
};

const setModelProperties = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let code = ``;

  const elements: Array<FormElementInterface> = getAllElements(object.form.elements);

  elements.forEach((element) => {
    code += setByElement(/*object, */element);
  });

  return code;
};

const setByElement = (
  element: FormElementInterface
): string => {
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  let code = ``;

  const propertyType = value.isMultiple || type === 'array' || value.type === 'file' ?
    'Array' :
    (
      stringTypes.includes(value.type || type) ? 'String' :
        (
          numberTypes.includes(value.type || type) ? 'Number' :
            (
              booleanTypes.includes(value.type || type) ? 'Boolean' :
                (dateTypes.includes(value.type || type) ? 'Date' : 'Object')
            )
        )
    );

  if (value.optionsApi && value.optionsApi.endpoint) {
    const className = TextTransformation.setIdToClassName(TextTransformation.pascalfy(TextTransformation.singularize(value.optionsApi.endpoint.split('-').join(' '))));

    if (value.isMultiple) {
      code += `
        ${value.name}: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: '${className}',
          }
        ],
      `;
    } else {
      code += `
        ${value.name}: {
          type: mongoose.Schema.Types.ObjectId,
          ref: '${className}',
          required: ${value.isRequired || false},
          ${!value.isRequired ? 'default: null,' : ''}
        },
      `;
    }
  } else if (type === 'array') {
    const relatedType = TextTransformation.setIdToClassName(value.id);

    code += `
      ${value.id}: [
        ${relatedType}
      ],
    `;
  } else {
    code += `
      ${value.name}: {
        type: ${propertyType},
        required: ${value.isRequired || false},
        ${!value.isRequired ? 'default: null,' : ''}
      },
    `;
  }

  return code;
};


export {
  setModelProperties,
  setArrayTypeSchemas,
};
