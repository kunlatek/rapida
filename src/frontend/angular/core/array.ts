import { FormElementInterface, FormInterface } from "../../../interfaces/form";
import { MainInterface } from "../../../interfaces/main";
import { ArrayFeaturesInterface } from "../form/template/main";
require("dotenv").config();

let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
  process.env.ARRAY_LAYER!
);

let _arraysInAFlow: Array<ArrayFeaturesInterface> = JSON.parse(
  process.env.ARRAYS_IN_A_FLOW!
);

const setArray = (object: MainInterface) => {
  let code = ``;
  if (!object.form) {
    return code;
  }

  _arrayLayer = JSON.parse(process.env.ARRAY_LAYER!);

  _arraysInAFlow = JSON.parse(process.env.ARRAYS_IN_A_FLOW!);

  setArrayLayer(object.form.elements);

  return code;
};

const setArraysInAFlow = (arrayId: string) => {
  _arrayLayer?.forEach((array) => {
    if (array.name === arrayId) {
      if (_arraysInAFlow.indexOf(array) === -1) {
        _arraysInAFlow.push({
          indexIdentifier: array.indexIdentifier,
          arrayNumber: array.arrayNumber,
          layer: array.layer,
          name: array.name,
          parentArray: array.parentArray ? array.parentArray : undefined,
        });
      }

      if (array.parentArray) {
        setArraysInAFlow(array.parentArray);
      }
    }
  });
};

const setArrayLayer = (
  elements: Array<FormElementInterface>,
  index: number = 0,
  parentArray: string | undefined = undefined
) => {
  const iterationsIds = [
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
  ];

  let hasArray = false;
  let arraysInThisLayer: Array<{
    id: string;
    elements: Array<FormElementInterface>;
  }> = [];

  elements.forEach((element) => {
    if (element.array) {
      _arrayLayer.push({
        layer: index,
        arrayNumber: _arrayLayer.length,
        indexIdentifier: iterationsIds[index],
        name: element.array.id,
        parentArray: parentArray,
      });

      arraysInThisLayer.push({
        id: element.array.id,
        elements: element.array.elements,
      });

      hasArray = true;
    }

    if (element.tabs) {
      element.tabs.forEach((tab: FormInterface) => {
        setArrayLayer(tab.elements);
      });
    }
  });

  if (hasArray) {
    const newIndex = index + 1;

    arraysInThisLayer.forEach((element) => {
      setArrayLayer(element.elements, newIndex, element.id);
    });
  }

  process.env.ARRAY_LAYER = JSON.stringify(_arrayLayer);
};

export {
  setArray,
  setArrayLayer,
  setArraysInAFlow
};
