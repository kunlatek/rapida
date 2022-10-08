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
  array: ArrayInterface | undefined = undefined
): string => {
  if (!object.form) {
    return "";
  }

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

  let code = "";

  elements.forEach((element) => {
    const type = Object.keys(element)[0];
    const value = Object.values(element)[0];

    if (formElements.includes(type)) {
      if (value.conditions) {
        if (value.conditions.type === ConditionEnum.Form) {
          if (!_conditionMethods.includes(value.name ? value.name : value.id)) {
            if (!array) {
              code += setConditionNotInArray(object, element);
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
      code += setCondition(object, element.array.elements, element.array);
    }
  });

  return code;
};

const setConditionNotInArray = (
  object: MainInterface,
  element: FormElementInterface
) => {
  if (!object.form) {
    return "";
  }

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

  let code = "";

  const type = Object.keys(element)[0];
  const value: any = Object.values(element)[0];

  code += `this.${value.name ? value.name : value.id}FormCondition = (`;

  value.conditions.elements.forEach((condition: any, index: number) => {
    if (index > 0) {
      code += `${condition.logicalOperator ? ` ${condition.logicalOperator} ` : ` && `
        }`;
    }
    code += `(this.${object.form!.id}Form.get("${condition.key}")?.value ${condition.comparisonOperator
        ? ` ${condition.comparisonOperator} `
        : ` === `
      } "${condition.value}")`;
  });

  code += `);`;

  return code;
};

const setConditionOverEdition = (
  object: MainInterface,
  elements: Array<FormElementInterface>
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
    if (element.tabs) {
      element.tabs.forEach((tab) => {
        code += setConditionOverEdition(object, tab.elements);
      });
    }

    if (element.array) {
      code += setConditionOverEditionInArray(
        object,
        element.array.elements,
        element.array
      );
    }

    if (!element.array && !element.tabs) {
      code += setConditionOverEditionInNotArray(object, elements);
    }
  });

  return code;
};

const setConditionOverEditionInArray = (
  object: MainInterface,
  elements: Array<FormElementInterface>,
  array: ArrayInterface
): string => {
  if (!object.form) {
    return "";
  }
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

  let code = ``;

  elements.forEach((element) => {
    const type = Object.keys(element)[0];
    const value = Object.values(element)[0];

    if (formElements.includes(type)) {
      if (value.conditions) {
        let parentArray: string | undefined;
        let getParentsIndexesToCondition: string = ``;
        let getParentsControlToCondition: string = ``;
        if (value.conditions.type === ConditionEnum.Form) {
          if (
            !_conditionMethodsOverEdition.includes(
              value.name ? value.name : value.id
            )
          ) {
            let conditionId = "";
            _arrayLayer?.forEach((arrayLayer: ArrayFeaturesInterface) => {
              if (arrayLayer.name === array.id) {
                parentArray = arrayLayer.parentArray;
              }
            });

            if (parentArray) {
              _allParents = [];
              setAllParents(parentArray);
              _allParents.reverse().forEach((parent: string, index: number) => {
                const singularParent: string =
                  TextTransformation.singularize(parent);
                getParentsIndexesToCondition += `${singularParent}Index: number${index < _allParents.length - 1 ? ", " : ""
                  }`;
                getParentsControlToCondition += `"${parent}", ${singularParent}Index${index < _allParents.length - 1 ? ", " : ""
                  }`;
                code += `
                this.${object.form?.id}Form.get([`;
                code += `${getParentsControlToCondition}]`
                  .replace(/, ]/g, "]")
                  .replace(/,]/g, "]")
                  .replace(`, ${singularParent}Index]`, "]");
                code += `)?.value.forEach((`;
                code += `_${parent}: any, 
                  ${singularParent}Index: number
                ) => {
                `;
              });
            }

            code += `
            this.${object.form?.id}Form
            .get([${getParentsControlToCondition}, "${array.id}"])?.value.forEach((
              _${array.id}: any, 
              ${array.id}Index: number
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
              this.${conditionId}[${getParentsIndexesToCondition
                ? `${getParentsIndexesToCondition.replace(/: number/g, "][")}`
                : ""
              }${array.id}Index] = true;
            }
            });`;

            if (parentArray) {
              _allParents.reverse().forEach((parent: string, index: number) => {
                code += `
                  });
                  `;
              });
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
      code += setConditionOverEditionInArray(
        object,
        element.array.elements,
        element.array
      );
    }
  });

  return code;
};

const setConditionOverEditionInNotArray = (
  object: MainInterface,
  elements: Array<FormElementInterface>
): string => {
  if (!object.form) {
    return "";
  }
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

  let code = "";

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

    if (element.tabs) {
      element.tabs.forEach((tab) => {
        code += setConditionOverEdition(object, tab.elements);
      });
    }

    if (element.array) {
      code += setConditionOverEditionInArray(
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
  if (!object.form) {
    return "";
  }

  const objectId = object.form.id;
  const arrayId = array?.id ? array.id : "";
  const arrayIdSingular = array?.id
    ? TextTransformation.singularize(arrayId)
    : "";

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
      _allParents = [];
      setAllParents(parentArray);
      _allParents.reverse().forEach((parent: string, index: number) => {
        const singularParent: string = TextTransformation.singularize(parent);

        getParentsIndexes += `${singularParent}Index: number${index < _allParents.length - 1 ? ", " : ""
          }`;
        getParentsControl += `"${parent}", ${singularParent}Index${index < _allParents.length - 1 ? ", " : ""
          }`;
      });
    }
  }

  let code = "";

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
                }${array ? `${arrayIdSingular}Index: number, ` : ``}) => {`;
              const stringToSplitExists = code.includes(stringToSplit);
              const conditionMethodExists = code.includes(conditionMethod);

              let conditionMethodCode = `this.${value.name ? value.name : value.id
                }FormCondition[${getParentsIndexes && getParentsIndexes !== ""
                  ? `${getParentsIndexes
                    .replace(/: number/g, "][")
                    .replace(/, /g, "")}`
                  : ""
                }${arrayIdSingular}Index] = (`;

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
                      ? `"${array.id}", ${arrayIdSingular}Index, "${condition.key}"`
                      : ``
                    }])?.value${condition.comparisonOperator
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
                  code += `${stringToSplit} ${conditionMethodCode}); };`;
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

  if (!_allParents.includes(lastParent)) {
    _allParents.push(lastParent);
  }

  _arrayLayer.forEach((element: ArrayFeaturesInterface) => {
    if (element.name === lastParent && element.parentArray) {
      if (!_allParents.includes(element.parentArray)) {
        _allParents.push(element.parentArray);
      }
      setAllParents(element.parentArray);
    }
  });
};

export { setCondition, setConditionOverEdition, setConditionsInArray };
