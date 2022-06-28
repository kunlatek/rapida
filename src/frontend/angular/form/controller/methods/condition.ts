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
  code += setConditionsOverEdition(object, object.form.elements);

  return code;
}

const setConditionByElements = (
  object: MainInterface,
  elements: Array<FormElementInterface>,
  array: string | undefined = undefined
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
        if (value.conditions.type === ConditionEnum.Form) {
          if (!_conditionMethods.includes(value.conditions.id)) {
            if (!array) {
              code += `this.${value.conditions.id}FormCondition = (`;
              
              value.conditions.elements.forEach((condition: any, index: number) => {              
                if (index > 0) {
                  code += `${
                    condition.logicalOperator
                      ? ` ${condition.logicalOperator} `
                      : ` && `
                  }`;
                }
                code += `(this.${object.form!.id}Form.get("${
                  condition.key
                }")?.value ${
                  condition.comparisonOperator
                    ? ` ${condition.comparisonOperator} `
                    : ` === `
                } "${condition.value}")`;
              });
              code += `);`;
            }
          }
        }
  
        if (value.conditions.type === ConditionEnum.Code) {
          if (!_conditionMethods.includes(value.conditions.id)) {
            code += `this.${value.conditions.id}CodeCondition = (`;
  
            value.conditions.elements.forEach((condition: any, index: number) => {
              if (!array) {              
                if (index > 0) {
                  code += `${
                    condition.logicalOperator
                      ? ` ${condition.logicalOperator} `
                      : ` && `
                  }`;
                }
                code += `(this.${condition.key} ${
                  condition.comparisonOperator
                    ? ` ${condition.comparisonOperator} `
                    : ` === `
                } "${condition.value}");`;
              }
              code += `)`;
              
              _conditionMethods.push(value.conditions.id);
            });
          }
        }
      }
    }
  
    if (element.tabs) {
      element.tabs.forEach((tab) => {
        code += setConditionByElements(object, tab.elements);
      });
    }
  
    if (element.array) {
      code += setConditionByElements(object, element.array.elements, element.array?.id);
    }
  });

  return code;
};

const setConditionsOverEdition = (
  object: MainInterface,
  elements: Array<FormElementInterface>,
  array: string | undefined = undefined
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
        if (value.conditions.type === ConditionEnum.Form) {
          if (!_conditionMethods.includes(value.conditions.id)) {
            if (!array) {
              code += `this.${value.conditions.id}FormCondition = (`;
              
              value.conditions.elements.forEach((condition: any, index: number) => {              
                if (index > 0) {
                  code += `${
                    condition.logicalOperator
                      ? ` ${condition.logicalOperator} `
                      : ` && `
                  }`;
                }
                code += `(this.${object.form!.id}Form.get("${
                  condition.key
                }")?.value ${
                  condition.comparisonOperator
                    ? ` ${condition.comparisonOperator} `
                    : ` === `
                } "${condition.value}")`;
              });
              code += `);`;
            }
          }
        }
  
        if (value.conditions.type === ConditionEnum.Code) {
          if (!_conditionMethods.includes(value.conditions.id)) {
            code += `this.${value.conditions.id}CodeCondition = (`;
  
            value.conditions.elements.forEach((condition: any, index: number) => {
              if (!array) {              
                if (index > 0) {
                  code += `${
                    condition.logicalOperator
                      ? ` ${condition.logicalOperator} `
                      : ` && `
                  }`;
                }
                code += `(this.${condition.key} ${
                  condition.comparisonOperator
                    ? ` ${condition.comparisonOperator} `
                    : ` === `
                } "${condition.value}");`;
              }
              code += `)`;
              
              _conditionMethods.push(value.conditions.id);
            });
          }
        }
      }
    }
  
    if (element.tabs) {
      element.tabs.forEach((tab) => {
        code += setConditionByElements(object, tab.elements);
      });
    }
  
    if (element.array) {
      code += setConditionByElements(object, element.array.elements, element.array.id);
    }
  });

  return code;
};

const setConditionsInArray = (
  object: MainInterface,
  elements: Array<FormElementInterface>,
  array: string | undefined = undefined
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
        if (value.conditions.type === ConditionEnum.Form) {
          if (!_conditionMethods.includes(value.conditions.id)) {
            if (array) {
              code += `this.${value.conditions.id}FormCondition[index] = (`;
  
              value.conditions.elements.forEach((condition: any, index: number) => {
                if (index > 0) {
                  code += `${
                    condition.logicalOperator
                      ? ` ${condition.logicalOperator} `
                      : ` && `
                  }`;
                }
                code += `(this.${object.form!.id}Form.get("${
                  array
                }")?.value[index]?.${condition.key} ${
                  condition.comparisonOperator
                    ? ` ${condition.comparisonOperator} `
                    : ` === `
                } "${condition.value}")`;
              });
  
              code += `);`;
  
              _conditionMethods.push(value.conditions.id);
            }
          }
        }
  
      }
    }
  
    if (element.tabs) {
      element.tabs.forEach((tab) => {
        code += setConditionsInArray(object, tab.elements);
      });
    }
  
    if (element.array) {
      code += setConditionsInArray(object, element.array.elements, element.array?.id);
    }
  });

  return code;
};

export {
  setCondition,
  setConditionsInArray
}