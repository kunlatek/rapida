import { ConditionEnum } from "../../../../../enums/form";
import { ArrayFeaturesInterface } from "../../../../../interfaces/array";
import {
  ArrayInterface,
  ConditionElementInterface,
  FormElementInterface
} from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
require("dotenv").config();

let _allParents: Array<string> = [];

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
              code += `this.${value.name ? value.name : value.id
                }FormCondition = (`;

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
            code += `this.${value.name ? value.name : value.id
              }CodeCondition = (`;

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
  array: ArrayInterface | undefined = undefined
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
          if (
            !_conditionMethodsOverEdition.includes(
              value.name ? value.name : value.id
            )
          ) {
            let conditionId = "";
            if (array) {
              code += `
              this.${object.form?.id}Form
              .get("${array.id}")?.value.forEach((
                _${array.id}: any, 
                index: number
              ) => {
                if(
              `;

              value.conditions.elements.forEach(
                (condition: ConditionElementInterface, index: number) => {
                  conditionId = `${value.name ? value.name : value.id
                    }FormCondition`;
                  if (index > 0) {
                    code += `${condition.logicalOperator
                      ? ` ${condition.logicalOperator} `
                      : ` && `
                      }`;
                  }
                  code += `_${array.id}.${condition.key}`;
                  code += `${condition.comparisonOperator
                    ? ` ${condition.comparisonOperator} `
                    : ` === `
                    } "${condition.value}"`;

                  _conditionMethodsOverEdition.push(
                    value.name ? value.name : value.id
                  );
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
                  conditionId = `${value.name ? value.name : value.id
                    }FormCondition`;
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

                  _conditionMethodsOverEdition.push(
                    value.name ? value.name : value.id
                  );
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
      code += setConditionOverEdition(
        object,
        element.array.elements,
        element.array
      );
    }
  });

  return code;
};

const setConditionsInArray = (
  object: MainInterface,
  elements: Array<FormElementInterface>,
  array: ArrayInterface | undefined = undefined
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

  let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
    process.env.ARRAY_LAYER!
  );
  let parentArray: string | undefined;
  let getParentsIndexes: string = ``;
  let getParentsControl: string = ``;

  if (array) {
    _arrayLayer?.forEach((arrayLayer: ArrayFeaturesInterface) => {
      if (arrayLayer.name === array.id) {
        parentArray = arrayLayer.parentArray;
      }
    });

    if (parentArray) {
      setAllParents(parentArray);

      _allParents.forEach((parent: string, index: number) => {
        getParentsIndexes += `${TextTransformation.singularize(
          parent
        )}Index: number${index < _allParents.length - 1 ? ", " : ""}`;
        getParentsControl += `"${parent}", ${TextTransformation.singularize(
          parent
        )}Index${index < _allParents.length - 1 ? ", " : ""}`;
      });
    }
  }

  let code = ``;

  elements.forEach((element) => {
    const type = Object.keys(element)[0];
    const value = Object.values(element)[0];

    if (formElements.includes(type)) {
      if (value.conditions) {
        if (value.conditions.type === ConditionEnum.Form) {
          if (!_conditionMethods.includes(value.name ? value.name : value.id)) {
            if (array) {
              const conditionMethod = `setConditionIn${TextTransformation.pascalfy(
                value.conditions.elements[0].key
              )}`;
              const stringToSplit = `setConditionIn${TextTransformation.pascalfy(
                value.conditions.elements[0].key
              )} = (${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""
                }${array
                  ? `${TextTransformation.singularize(array.id)}Index: number, `
                  : ``
                }) => { if (typeof i === "number") {`;
              const stringToSplitExists = code.includes(stringToSplit);
              const conditionMethodExists = code.includes(conditionMethod);

              let conditionMethodCode = `this.${value.name ? value.name : value.id
                }FormCondition[${getParentsIndexes && getParentsIndexes !== ""
                  ? `${getParentsIndexes?.replace(/: number/g, "")}, `
                  : ""
                }${array ? `${TextTransformation.singularize(array.id)}Index` : ``
                }] = (`;

              value.conditions.elements.forEach(
                (condition: any, index: number) => {
                  if (index > 0) {
                    conditionMethodCode += `${condition.logicalOperator
                      ? ` ${condition.logicalOperator} `
                      : ` && `
                      }`;
                  }

                  conditionMethodCode += `(this.${object.form!.id}Form.get([${getParentsControl && getParentsControl !== ""
                    ? `${getParentsControl} ,`
                    : ``
                    }${array
                      ? `"${array.id}", ${TextTransformation.singularize(
                        array.id
                      )}Index, `
                      : ``
                    }"])?.value[${getParentsIndexes && getParentsIndexes !== ""
                      ? `${getParentsIndexes.replace(/: number/g, "][")}`
                      : ""
                    }${TextTransformation.singularize(array.id)}Index]?.${condition.key
                    } ${condition.comparisonOperator
                      ? ` ${condition.comparisonOperator} `
                      : ` === `
                    } ${typeof condition.value !== "string"
                      ? condition.value
                      : `"${condition.value}"`
                    })`;
                }
              );

              if (stringToSplitExists) {
                const codeSplited = code.split(stringToSplit);
                codeSplited.splice(
                  1,
                  0,
                  `${stringToSplit} ${conditionMethodCode});`
                );
                code = codeSplited.join("");
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
        element.array
      );
    }
  });

  return code;
};

const setAllParents = (lastParent: string) => {
  let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
    process.env.ARRAY_LAYER!
  );
  _allParents.push(lastParent);

  _arrayLayer.forEach((element: ArrayFeaturesInterface) => {
    if (element.name === lastParent && element.parentArray) {
      _allParents.push(element.parentArray);
      setAllParents(element.parentArray);
    }
  });
};

export { setCondition, setConditionOverEdition, setConditionsInArray };
