import { ConditionEnum } from "../../../../../enums/form";
import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";

const setCondition = (
  object: MainInterface
): string => {
  let code = ``;
  
  if (!object.form) {
    return code;
  }
  
  code += setConditionByElements(object, object.form.elements);
  
  return code;
};

const setConditionByElements = (
  object: MainInterface,
  elements: Array<FormElementInterface>,
  isArray: boolean = false
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
  let code = ``;

  elements.forEach(element => {
    const type = Object.keys(element)[0];
    const value = Object.values(element)[0];
  
    if (formElements.includes(type)) {
      if (value.conditions) {
        // Check to not repeat property
        if (!_conditionProperties.includes(value.conditions.id)) {
          if (value.conditions.type === ConditionEnum.Form) {
            if (!isArray) {            
              code += `${value.conditions.id}FormCondition: boolean = false;`;
            }
  
            if (isArray) {
              code += `${value.conditions.id}FormCondition: [boolean] = [false];`;
            }
          }
    
          if (value.conditions.type === ConditionEnum.Code) {
            code += `${value.conditions.id}CodeCondition: boolean = false;`;
          }
        }
  
        _conditionProperties.push(value.conditions.id);
      }
    }
  
    if (element.tabs) {
      element.tabs.forEach(tab => {
        code += setConditionByElements(object, tab.elements);
      });
    }
  
    if (element.array) {
      code += setConditionByElements(object, element.array.elements, true);
    }
  });
  
  return code;
};

export {
  setCondition
}