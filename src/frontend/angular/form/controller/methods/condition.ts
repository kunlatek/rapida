import { ConditionEnum } from "../../../../../enums/form";
import { ConditionElementInterface, FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";

let _conditionMethods: Array<string> = [];
let _conditionMethodsOverEdition: Array<string> = [];

const setCondition = (
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

  elements.forEach((element) => {
    const type = Object.keys(element)[0];
    const value = Object.values(element)[0];

    if (formElements.includes(type)) {
      if (value.conditions) {
        if (value.conditions.type === ConditionEnum.Form) {
          if (!_conditionMethods.includes(value.conditions.id)) {
            if (!array) {
              code += `this.${value.conditions.id}FormCondition = (`;

              value.conditions.elements.forEach(
                (condition: any, index: number) => {
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
                }
              );
              code += `);`;
            }
          }
        }

        if (value.conditions.type === ConditionEnum.Code) {
          if (!_conditionMethods.includes(value.conditions.id)) {
            code += `this.${value.conditions.id}CodeCondition = (`;

            value.conditions.elements.forEach(
              (condition: any, index: number) => {
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
              }
            );
          }
        }
      }
    }

    if (element.tabs) {
      element.tabs.forEach((tab) => {
        code += setCondition(object, tab.elements);
      });
    }

    if (element.array) {
      code += setCondition(object, element.array.elements, element.array?.id);
    }
  });

  return code;
};

const setConditionOverEdition = (
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

  elements.forEach((element) => {
    const type = Object.keys(element)[0];
    const value = Object.values(element)[0];
    
    if (formElements.includes(type)) {
      if (value.conditions) {
        if (value.conditions.type === ConditionEnum.Form) {
          if (!_conditionMethodsOverEdition.includes(value.conditions.id)) {
            let conditionId = "";
            if (array) {
              code += `
              this.${object.form?.id}Form
              .get("${array}")?.value.forEach((
                _${array}: any, 
                index: number
              ) => {
                if(
              `;
            }
            value.conditions.elements.forEach(
              (condition: ConditionElementInterface, index: number) => {
                conditionId = `${value.conditions.id}FormCondition`;
                if (array) {
                  if (index > 0) {
                    code += `${
                      condition.logicalOperator
                        ? ` ${condition.logicalOperator} `
                        : ` && `
                    }`;
                  }
                  code += `_${array}.${condition.key}`
                  code += `${
                    condition.comparisonOperator
                      ? ` ${condition.comparisonOperator} `
                      : ` === `
                  } "${condition.value}"`;
                }

                _conditionMethodsOverEdition.push(value.conditions.id);
              }
            );

            if (array) {
              code += `) {
                this.${conditionId}[index] = true;
              }
              })`;
            }
          }
        }
      }
    }

    if (element.tabs) {
      element.tabs.forEach((tab) => {
        code += setConditionOverEdition(object, tab.elements);
      });
    }

    if (element.array) {
      code += setConditionOverEdition(object, element.array.elements, element.array.id);
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

  elements.forEach((element) => {
    const type = Object.keys(element)[0];
    const value = Object.values(element)[0];

    if (formElements.includes(type)) {
      if (value.conditions) {
        if (value.conditions.type === ConditionEnum.Form) {
          if (!_conditionMethods.includes(value.conditions.id)) {
            if (array) {
              code += `this.${value.conditions.id}FormCondition[index] = (`;

              value.conditions.elements.forEach(
                (condition: any, index: number) => {
                  if (index > 0) {
                    code += `${
                      condition.logicalOperator
                        ? ` ${condition.logicalOperator} `
                        : ` && `
                    }`;
                  }
                  code += `(this.${
                    object.form!.id
                  }Form.get("${array}")?.value[index]?.${condition.key} ${
                    condition.comparisonOperator
                      ? ` ${condition.comparisonOperator} `
                      : ` === `
                  } "${condition.value}")`;
                }
              );

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
      code += setConditionsInArray(
        object,
        element.array.elements,
        element.array?.id
      );
    }
  });

  return code;
};

export { setCondition, setConditionOverEdition, setConditionsInArray };
