import { ConditionEnum } from "../../../../enums/form";
import { ArrayFeaturesInterface } from "../../../../interfaces/array";
import { ArrayInterface, FormElementInterface } from "../../../../interfaces/form";
import { TextTransformation } from "../../../../utils/text.transformation";
require("dotenv").config();

let _allParents: Array<string> = [];

const setConditions = (
  element: FormElementInterface,
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
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];
  const arrayIdSingular = array?.id;

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

  if (formElements.includes(type)) {
    if (value.conditions) {
      if (value.conditions.type === ConditionEnum.Form) {
        if (array) {
          code += `*ngIf="${value.name ? value.name : value.id}FormCondition[${getParentsIndexes && getParentsIndexes !== ""
            ? `${getParentsIndexes.replace(/: number/g, "][").replace(/, /g, "")}`
            : ""
            }${arrayIdSingular}Index]"`;
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
  setConditions
};

