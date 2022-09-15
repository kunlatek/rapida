import { ConditionEnum } from "../../../../../enums/form";
import { ConditionElementInterface, FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setArrayControlsToAdd, setArrayIndexes } from "./array";

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
          if (!_conditionMethods.includes(value.name ? value.name : value.id)) {
            if (!array) {
              code += `this.${value.name ? value.name : value.id}FormCondition = (`;

              value.conditions.elements.forEach(
                (condition: any, index: number) => {
                  if (index > 0) {
                    code += `${condition.logicalOperator
                      ? ` ${condition.logicalOperator} `
                      : ` && `
                      }`;
                  }
                  code += `(this.${object.form!.id}Form.get("${condition.key
                    }")?.value ${condition.comparisonOperator
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
          if (!_conditionMethods.includes(value.name ? value.name : value.id)) {
            code += `this.${value.name ? value.name : value.id}CodeCondition = (`;

            value.conditions.elements.forEach(
              (condition: any, index: number) => {
                if (!array) {
                  if (index > 0) {
                    code += `${condition.logicalOperator
                      ? ` ${condition.logicalOperator} `
                      : ` && `
                      }`;
                  }
                  code += `(this.${condition.key} ${condition.comparisonOperator
                    ? ` ${condition.comparisonOperator} `
                    : ` === `
                    } "${condition.value}");`;
                }
                code += `)`;

                _conditionMethods.push(value.name ? value.name : value.id);
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
          if (!_conditionMethodsOverEdition.includes(value.name ? value.name : value.id)) {
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

              value.conditions.elements.forEach(
                (condition: ConditionElementInterface, index: number) => {
                  conditionId = `${value.name ? value.name : value.id}FormCondition`;
                  if (index > 0) {
                    code += `${condition.logicalOperator
                      ? ` ${condition.logicalOperator} `
                      : ` && `
                      }`;
                  }
                  code += `_${array}.${condition.key}`;
                  code += `${condition.comparisonOperator
                    ? ` ${condition.comparisonOperator} `
                    : ` === `
                    } "${condition.value}"`;

                  _conditionMethodsOverEdition.push(value.name ? value.name : value.id);
                }
              );

              code += `) {
                this.${conditionId}[index] = true;
              }
              })`;
            }

            if (!array) {
              code += `              
                if(
              `;

              value.conditions.elements.forEach(
                (condition: ConditionElementInterface, index: number) => {
                  conditionId = `${value.name ? value.name : value.id}FormCondition`;
                  if (index > 0) {
                    code += `${condition.logicalOperator
                      ? ` ${condition.logicalOperator} `
                      : ` && `
                      }`;
                  }
                  code += `this.${object.form?.id}Form.get("${condition.key}")?.value`;
                  code += `${condition.comparisonOperator
                    ? ` ${condition.comparisonOperator} `
                    : ` === `
                    } "${condition.value}"`;

                  _conditionMethodsOverEdition.push(value.name ? value.name : value.id);
                }
              );

              code += `) {
                this.${conditionId} = true;
              }`;
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
          if (!_conditionMethods.includes(value.name ? value.name : value.id)) {
            if (array) {
              const controlsToAdd = setArrayControlsToAdd(array);
              const iterations = setArrayIndexes(array);
              const conditionMethod = `setConditionIn${TextTransformation.pascalfy(value.conditions.elements[0].key)}`;
              const stringToSplit = `setConditionIn${TextTransformation.pascalfy(value.conditions.elements[0].key)} = (${iterations}) => { if (typeof i === "number") {`;
              const stringToSplitExists = code.includes(stringToSplit);
              const conditionMethodExists = code.includes(conditionMethod);

              let conditionMethodCode = `this.${value.name ? value.name : value.id}FormCondition[${iterations.split(": any")[iterations.split(": any").length - 2].replace(", ", "")}] = (`;

              value.conditions.elements.forEach(
                (condition: any, index: number) => {
                  if (index > 0) {
                    conditionMethodCode += `${condition.logicalOperator
                      ? ` ${condition.logicalOperator} `
                      : ` && `
                      }`;
                  }

                  conditionMethodCode += `(this.${object.form!.id
                    }Form.get([${controlsToAdd ? controlsToAdd : `"${array}"`}])?.value[${iterations.split(": any")[iterations.split(": any").length - 2].replace(", ", "")}]?.${condition.key} ${condition.comparisonOperator
                      ? ` ${condition.comparisonOperator} `
                      : ` === `
                    } ${(typeof condition.value !== "string") ? condition.value : `"${condition.value}"`})`;
                }
              );

              if (stringToSplitExists) {
                const codeSplited = code.split(stringToSplit);
                codeSplited.splice(1, 0, `${stringToSplit} ${conditionMethodCode});`);
                code = codeSplited.join('');
              } else {
                if (!conditionMethodExists) {
                  code += `${stringToSplit} ${conditionMethodCode}); } };`;
                }
              }

              _conditionMethods.push(value.id);
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
