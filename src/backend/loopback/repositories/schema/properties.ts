import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { getAllElements } from "../../main";
import { booleanTypes, numberTypes, stringTypes } from "../../utils/constants";

const setRepositorySchemaProperties = (object: MainInterface, schemaName: string): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let code = ``;

  const elements: Array<FormElementInterface> = getAllElements(object.form.elements);

  elements.forEach((element) => {
    code += setByElement(element, schemaName);
  });

  return code;
};

const setByElement = (
  element: FormElementInterface,
  schemaName: string,
): string => {
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  let code = ``;

  const propertyType = value.isMultiple || type === 'array' || value.type === 'file' ?
    'string' :
    (
      stringTypes.includes(value.type || type) ? 'string' :
        (
          numberTypes.includes(value.type || type) ? 'number' :
            (
              booleanTypes.includes(value.type || type) ? 'boolean' : 'string'
            )
        )
    );

  if (value.optionsApi && value.optionsApi.endpoint) {
    // const className = TextTransformation.setIdToClassName(TextTransformation.pascalfy(TextTransformation.singularize(value.optionsApi.endpoint.split('-').join(' '))));

    // if (value.isMultiple) {
    //   code += `
    //     ${value.name}: [
    //       {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: '${className}', ${value.isUnique ? `unique: true,` : ``}
    //       }
    //     ],
    //   `;
    // } else {
    //   code += `
    //     ${value.name}: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: '${className}', ${value.isUnique ? `unique: true,` : ``}
    //       required: ${value.isRequired || false},
    //       ${!value.isRequired ? 'default: null,' : ''}
    //     },
    //   `;
    // }
  } else if (type === 'array') {
    code += `${value.id}: [{ type: 'any' }],`;
  } else {
    code += `
      ${value.name}: {
        type: '${propertyType}', // ${value.isUnique ? `validate: [unique('${schemaName}', '${value.name}'), '${value.name} is unique'],` : ``}
        required: ${value.isRequired || false},
        ${!value.isRequired ? 'default: null,' : ''}
      },
    `;
  }

  return code;
};


export {
  setRepositorySchemaProperties,
};
