import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { getAllElements } from "../../main";
import { booleanTypes, numberTypes, stringTypes } from "../../utils/constants";

const setEntityProperties = (object: MainInterface): string => {
  let code = `
    public _id?: string;
    public _createdBy: string;
    public _ownerId: string;
  `;

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

  code += `public ${value.name}${!value.isRequired ? '?' : ''}: ${propertyType};`;

  return code;
};

export { setEntityProperties };
