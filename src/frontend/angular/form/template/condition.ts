import { ConditionEnum } from "../../../../enums/form";
import { FormElementInterface } from "../../../../interfaces/form";

const setConditions = (
  element: FormElementInterface,
  array: string | undefined = undefined,
  arrayCurrentIndexAsParam: string | undefined = undefined
): string => {
  const formElements = [
    "input",
    "autocomplete",
    "button",
    "checkbox",
    "radio",
    "select",
    "slide",
    "array",
  ];
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];
  let code = ``;

  if (formElements.includes(type)) {
    if (value.conditions) {
      if (value.conditions.type === ConditionEnum.Form) {
        if (array) {
          code += `*ngIf="${value.name ? value.name : value.id}FormCondition[${arrayCurrentIndexAsParam}]"`;
        }

        if (!array) {          
          code += `*ngIf="${value.name ? value.name : value.id}FormCondition"`;
        }
      }

      if (value.conditions.type === ConditionEnum.Code) {
        code += `*ngIf="${value.name ? value.name : value.id}CodeCondition"`;
      }
    }
  }

  return code;
};

export {
  setConditions
}