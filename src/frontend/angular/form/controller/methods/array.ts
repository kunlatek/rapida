import { ArrayFeaturesInterface } from "../../../../../interfaces/array";
import { ArrayInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setArraysInAFlow } from "../../../core/array";
import { setFormBuilderByElements } from "../properties/form-builder";
import { setFormMethodsByElements } from "./method";
require("dotenv").config();

let _allParents: Array<string> = [];
let parentArray: string | undefined;
let getParentsIndexes: string = ``;
let getParentsControl: string = ``;

const setArrayNames = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();

  arrayReversed.forEach((array, index) => {
    code += `"${array.name}"` + (arrayReversed.length > index + 1 ? `, ` : "");
  });

  return code;
};

const setArrayControls = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);

  _arraysInAFlow = JSON.parse(process.env.ARRAYS_IN_A_FLOW!);

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
    code +=
      array.indexIdentifier +
      ": any" +
      (arrayReversed.length > index + 1 ? ", " : "");
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
      if (index < _arraysInAFlow.length - 1) {
        code += element.indexIdentifier + ": any,";
      }
    }
  });

  return code;
};

const setArrayMethod = (
  object: MainInterface,
  array: ArrayInterface
): string => {
  if (!array || !object.form) {
    return "";
  }
  const arrayId = array.id;
  const arrayIdSingular = TextTransformation.singularize(arrayId);
  const arrayIdPascalSingular = TextTransformation.pascalfy(arrayIdSingular);

  const get = `get${arrayIdPascalSingular}`;

  let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
    process.env.ARRAY_LAYER!
  );

  parentArray = undefined;
  getParentsIndexes = ``;
  getParentsControl = ``;

  if (array) {
    _arrayLayer?.forEach((arrayLayer: ArrayFeaturesInterface) => {
      if (arrayLayer.name === array.id) {
        parentArray = arrayLayer.parentArray;
      }
    });

    if (parentArray) {
      _allParents = [];
      setAllParents(parentArray);

      _allParents.forEach((parent: string, index: number) => {
        const singularParent: string = TextTransformation.singularize(parent);

        getParentsIndexes += `${singularParent}Index: number${index < _allParents.length - 1 ? ", " : ""
          }`;
        getParentsControl += `"${parent}", ${singularParent}Index${index < _allParents.length - 1 ? ", " : ""
          }`;
      });
    }
  }

  let code = "";

  code += `
  ${get}() {
    const new${TextTransformation.pascalfy(
    TextTransformation.singularize(array.id)
  )} = 
    new FormGroup({${setFormBuilderByElements(array.elements)}});

    return new${TextTransformation.pascalfy(
    TextTransformation.singularize(array.id)
  )}
    
    /*
    this.${array.id}${_allParents?.length > 0 && getParentsIndexes !== ""
      ? `(${getParentsIndexes.replace(/: number/g, "")})`
      : ``
    }.push(new${TextTransformation.pascalfy(
      TextTransformation.singularize(array.id)
    )});
    */
  };
 `;

  code += setFormMethodsByElements(object, array.elements, array);

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

const setArraysToEdit = (array: Array<ArrayInterface>) => {
  let code = ``;
  let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
    process.env.ARRAY_LAYER!
  );

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    code += `
    case "${element.id}":
      this.add${TextTransformation.pascalfy(
      TextTransformation.singularize(element.id)
    )}(`;
    if (
      _arrayLayer.find(
        (item: ArrayFeaturesInterface) =>
          item.name === element.id && item.layer > 0
      )
    ) {
      code += `indexArr`;
    }
    code += `
      );
      break;
    `;
  }

  return code;
};

const setArrayOfElementsToCreateArray = (array: Array<ArrayInterface>) => {
  let code = ``;

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    code += `{ element: '${element.id}', getFormGroup: () => this.get${TextTransformation.pascalfy(TextTransformation.singularize(element.id))}() },
    `;
  }

  return code;
};

export {
  setArrayNames,
  setArrayControls,
  setArrayControlsToAdd,
  setArrayIndexes,
  setArrayIndexesToAdd,
  setArrayMethod,
  setArraysToEdit,
  setArrayOfElementsToCreateArray,
};
