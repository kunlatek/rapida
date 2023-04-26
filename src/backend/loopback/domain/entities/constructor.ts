import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { getAllElements } from "../../main";

const setConstructor = (object: MainInterface): string => {
  let code = `
    this._id = app._id;
    this._createdBy = app._createdBy;
    this._ownerId = app._ownerId;
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
  const value = Object.values(element)[0];

  let code = ``;

  code += `this.${value.name} = entity.${value.name};`;

  return code;
};

export { setConstructor };
