import {
  ArrayInterface,
  FormElementInterface
} from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setFormBuilderByElements } from "../properties/form-builder";
import { ArrayFeaturesInterface } from "./interfaces";
import { setFormMethodsByElements } from "./method";
require("dotenv").config();

let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
  process.env.ARRAY_LAYER!
);
let _arraysInAFlow: Array<ArrayFeaturesInterface> = JSON.parse(
  process.env.ARRAYS_IN_A_FLOW!
);

const setArray = (object: MainInterface) => {
  const code = ``;

  if (!object.form) {
    return code;
  }

  _arrayLayer = JSON.parse(
    process.env.ARRAY_LAYER!
  );

  _arraysInAFlow = JSON.parse(
    process.env.ARRAYS_IN_A_FLOW!
  );

  setArrayLayer(object.form.elements);

  return code;
};

const setArrayLayer = (
  elements: Array<FormElementInterface>,
  index = 0,
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
  const arraysInThisLayer: Array<{
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
      element.tabs.forEach((tab) => {
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

const setArrayNames = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();

  arrayReversed.forEach((array, index) => {
    code +=
      `"${array.name}"` +
      (arrayReversed.length > index + 1 ? `, ` : "");
  });

  return code;
};

const setArrayControls = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();

  arrayReversed.forEach((array, index) => {
    code +=
      `"${array.name}"` +
      (arrayReversed.length > index + 1 ? `, ${array.indexIdentifier},` : "");
  });

  return code;
};

const setArrayControlsToAdd = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();

  arrayReversed.forEach((array, index) => {
    code +=
      `"${array.name}"` +
      (arrayReversed.length > index + 1 ? `, ${array.indexIdentifier},` : "");
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
};

const setArrayIndexesToAdd = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();
  arrayReversed.forEach((element: any, index: number) => {
    if (_arraysInAFlow.length > 1) {
      if (index < (_arraysInAFlow.length - 1)) {
        code += element.indexIdentifier + ": any,";
      }
    }
  });

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

const setArrayMethod = (
  object: MainInterface,
  array: ArrayInterface
): string => {
  let code = ``;

  if (!array) {
    return code;
  }

  const add = `add${TextTransformation.pascalfy(array.id)}`;
  const remove = `remove${TextTransformation.pascalfy(array.id)}`;
  const initArray = `init${TextTransformation.pascalfy(array.id)}`;
  const iterations = setArrayIndexes(array.id);
  const iterationsToAdd = setArrayIndexesToAdd(array.id);
  const controls = setArrayControls(array.id);
  const controlsToAdd = setArrayControlsToAdd(array.id);
  let arrayCurrentIndex;

  _arrayLayer?.forEach((arrayLayer: any) => {
    if (arrayLayer.name === array.id) {
      arrayCurrentIndex = arrayLayer.indexIdentifier;
    }
  });

  code += `
  ${initArray}() {
    return this._formBuilder.group({${setFormBuilderByElements(array.elements)}})
  };
  
  ${add}(${iterationsToAdd}) {
    const control = <FormArray>this.${object.form?.id
    }Form.get([${controlsToAdd}]) as FormArray;
    control.push(this.${initArray}());
  };

  get${TextTransformation.pascalfy(array.id)}(form: any) {
    return form.controls.${array.id}.controls;
  };

  ${remove}(${iterations}) {
    const control = <FormArray>this.${object.form?.id
    }Form.get([${controls}]) as FormArray;
    control.removeAt(${arrayCurrentIndex});
  };
  `;

  code += setFormMethodsByElements(object, array.elements, array);

  return code;
};

export {
  setArray,
  setArrayNames,
  setArrayControls,
  setArrayControlsToAdd,
  setArrayIndexes,
  setArrayIndexesToAdd,
  setArrayMethod,
  setArrayLayer,
  setArraysInAFlow,
};
