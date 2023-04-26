import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { getAllElements } from "../../main";
import { booleanTypes, numberTypes, stringTypes } from "../../utils/constants";

const setEntityInterfaces = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const modelName: string = object.form.id.replace("Form", "");

  let code = `
  export interface I${TextTransformation.pascalfy(modelName)} {
    _id?: string
    _createdBy: string
    _ownerId: string
    ${setEntityProperties(object)}
  }
  `;

  return code;
};

const setEntityProperties = (object: MainInterface): string => {
  let code = ``;

  const elements: Array<FormElementInterface> = getAllElements(object.form!.elements);

  elements.forEach((element) => {
    code += setByElement(element);
  });

  return code;
};

const setByElement = (
  element: FormElementInterface,
): string => {
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  let code = ``;

  const propertyType = value.isMultiple || type === 'array' || value.type === 'file' ?
    'any[]' :
    (
      stringTypes.includes(value.type || type) ? 'string' :
        (
          numberTypes.includes(value.type || type) ? 'number' :
            (
              booleanTypes.includes(value.type || type) ? 'boolean' : 'any'
            )
        )
    );

  code += `${value.name}${!value.isRequired ? '?' : ''}: ${propertyType}`;

  return code;
};

export { setEntityInterfaces };
