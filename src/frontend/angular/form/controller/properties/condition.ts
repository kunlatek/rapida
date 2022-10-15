import { ConditionEnum } from "../../../../../enums/form";
import { ArrayFeaturesInterface } from "../../../../../interfaces/array";
import { ArrayInterface, FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
require("dotenv").config();

let _allParents: Array<string> = [];

let _conditionProperties: Array<string> = [];

const setCondition = (
  object: MainInterface
): string => {
  if (!object.form) {
    return "";
  }
  let code = ``;

  _conditionProperties = [];

  code += setConditionByElements(object, object.form.elements);

  return code;
};

const setConditionByElements = (
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
      _allParents = [];
      setAllParents(parentArray);

      _allParents.reverse().forEach((parent: string, index: number) => {
        const singularParent: string = TextTransformation.singularize(parent);

        getParentsIndexes += `${singularParent}Index: number${index < _allParents.length - 1 ? ", " : ""}`;
        getParentsControl += `"${parent}", ${singularParent}Index${index < _allParents.length - 1 ? ", " : ""}`;
      });
    }
  }
  let code = ``;

  elements.forEach(element => {
    const type = Object.keys(element)[0];
    const value = Object.values(element)[0];

    if (formElements.includes(type)) {
      if (value.conditions) {
        // Check to not repeat property
        if (!_conditionProperties.includes(value.name ? value.name : value.id)) {
          if (value.conditions.type === ConditionEnum.Form) {
            if (!array) {
              code += `${value.name ? value.name : value.id}FormCondition: boolean = false;`;
            }

            if (array) {
              const layerCount = _arrayLayer.find((_) => _.name === array?.id);
              let layerCodeType = ``;
              let layerCodeValue = ``;
              if (layerCount) {
                for (let index = 0; index < (layerCount.layer + 1); index++) {
                  layerCodeType += `[]`;
                  layerCodeValue += `[`;
                }
                layerCodeValue += `false`;
                for (let index = 0; index < (layerCount.layer + 1); index++) {
                  layerCodeValue += `]`;
                }
              }
              code += `${value.name ? value.name : value.id}FormCondition: boolean${layerCodeType} = ${layerCodeValue};`;
            }
          }

          if (value.conditions.type === ConditionEnum.Code) {
            code += `${value.name ? value.name : value.id}CodeCondition: boolean = false;`;
          }
        }

        _conditionProperties.push(value.name ? value.name : value.id);
      }
    }

    if (element.tabs) {
      element.tabs.forEach(tab => {
        code += setConditionByElements(object, tab.elements);
      });
    }

    if (element.array) {
      code += setConditionByElements(object, element.array.elements, element.array);
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

export {
  setCondition
};
