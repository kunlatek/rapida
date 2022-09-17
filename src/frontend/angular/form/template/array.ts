import { FormElementInterface } from "../../../../interfaces/form";
import { ArrayFeaturesInterface } from "./main";
require("dotenv").config();

let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
  process.env.ARRAY_LAYER!
);
let _arraysInAFlow: Array<ArrayFeaturesInterface> = JSON.parse(
  process.env.ARRAYS_IN_A_FLOW!
);

const setArrayLayer = (
  elements: Array<FormElementInterface>,
  index = 0,
  parentArray: string | undefined = undefined
) => {
  const iterationsIds = ["i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];
  const newIndex = index + 1;

  _arrayLayer = JSON.parse(
    process.env.ARRAY_LAYER!
  );

  _arraysInAFlow = JSON.parse(
    process.env.ARRAYS_IN_A_FLOW!
  );

  let hasArray = false;
  const arraysInThisLayer: Array<{
    id: string;
    elements: Array<FormElementInterface>;
  }> = [];

  elements.forEach(element => {
    if (element.array) {
      _arrayLayer.push(
        {
          layer: index,
          arrayNumber: _arrayLayer.length,
          indexIdentifier: iterationsIds[index],
          name: element.array.id,
          parentArray: parentArray
        }
      );

      arraysInThisLayer.push(
        {
          id: element.array.id,
          elements: element.array.elements
        }
      )

      hasArray = true;
    }

    if (element.tabs) {
      element.tabs.forEach((tab) => {
        setArrayLayer(tab.elements);
      });
    }
  });

  if (hasArray) {
    arraysInThisLayer.forEach(element => {
      setArrayLayer(
        element.elements,
        newIndex,
        element.id
      );
    });
  }
};

const setArrayFlowIdentifier = (arrayId: string): string | undefined => {
  let code: string | undefined = undefined;
  
  _arrayLayer?.forEach(array => {
    if (array.name === arrayId) {
      if (array.parentArray) {
        return code = `_${array.parentArray}`;
      }
    }

  });

  return code;
}

const setArrayIndexes = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();

  arrayReversed.forEach((array, index) => {
    code += array.indexIdentifier + ((arrayReversed.length > (index + 1)) ? ", " : "");
  });

  return code;
}

const setArrayIndexesToAdd = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();
  
  arrayReversed.forEach((array, index) => {
    if ((arrayReversed.length - 1) > index) {
      code += array.indexIdentifier + ((arrayReversed.length > (index + 2)) ? ", " : "");
    }    
  });

  return code;
}

const setArraysInAFlow = (arrayId: string) => {
  _arrayLayer?.forEach(array => {
    if (array.name === arrayId) {
      if (_arraysInAFlow.indexOf(array) === -1) {
        _arraysInAFlow.push({
          indexIdentifier: array.indexIdentifier,
          arrayNumber: array.arrayNumber,
          layer: array.layer,
          name: array.name,
          parentArray: array.parentArray ? array.parentArray : undefined
        });
      }
      
      if (array.parentArray) {
        setArraysInAFlow(array.parentArray);
      }
    }
  });

  process.env.ARRAYS_IN_A_FLOW = JSON.stringify(_arraysInAFlow);
}

export {
  setArrayLayer,
  setArrayFlowIdentifier,
  setArrayIndexes,
  setArrayIndexesToAdd
}