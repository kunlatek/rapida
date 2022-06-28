/// <reference path="./main.ts" />

import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";

const setArray = (
  object: MainInterface
) => {
  let code = ``;
  
  if (!object.form) {
    return code;
  }
  
  setArrayLayer(object.form.elements);

  return code;
}


const setArrayLayer = (
  elements: Array<FormElementInterface>,
  index: number = 0,
  parentArray: string | undefined = undefined
) => {
  const iterationsIds = ["i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];
  
  let hasArray = false;
  let arraysInThisLayer: Array<{
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
    const newIndex = index + 1;
    
    arraysInThisLayer.forEach(element => {
      setArrayLayer(
        element.elements,
        newIndex,
        element.id
      );
    });
  }
};

const setArrayControls = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();
  
  arrayReversed.forEach((array, index) => {
    code += `"${array.name}"` + ((arrayReversed.length > (index + 1)) ? `, ${array.indexIdentifier},` : "");
  });

  return code;
};

const setArrayControlsToAdd = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();

  arrayReversed.forEach((array, index) => {
    code += `"${array.name}"` + ((arrayReversed.length > (index + 1)) ? `, ${array.indexIdentifier},` : "");
  });

  return code;
};

const setArrayIndexes = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();
  
  arrayReversed.forEach((array, index) => {
    code += array.indexIdentifier + ": any" + ((arrayReversed.length > (index + 1)) ? ", " : "");
  });

  return code;
}

const setArrayIndexesToAdd = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  
  _arraysInAFlow?.forEach((element: any, index: number) => {
    if (_arraysInAFlow.length > 1) {
      if (index > 0) {
        code += element.indexIdentifier + ": any,";
      }
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
}

export {
  setArray,
  setArrayControls,
  setArrayControlsToAdd,
  setArrayIndexes,
  setArrayIndexesToAdd
}