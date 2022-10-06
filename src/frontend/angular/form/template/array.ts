import { ArrayFeaturesInterface } from "../../../../interfaces/array";
import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { setArraysInAFlow } from "../../core/array";
import { setSpecificStructureOverFormElement } from "./main";
require("dotenv").config();

let _allParents: Array<string> = [];

const setArrayFlowIdentifier = (arrayId: string): string | undefined => {
  let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
    process.env.ARRAY_LAYER!
  );
  let code: string | undefined = undefined;

  _arrayLayer?.forEach((array) => {
    if (array.name === arrayId) {
      if (array.parentArray) {
        return (code = `_${array.parentArray}`);
      }
    }
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
      array.indexIdentifier + (arrayReversed.length > index + 1 ? ", " : "");
  });

  return code;
};

const setArrayIndexesToAdd = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();

  arrayReversed.forEach((array, index) => {
    if (arrayReversed.length - 1 > index) {
      code +=
        array.indexIdentifier + (arrayReversed.length > index + 2 ? ", " : "");
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

const setArrayTemplate = (
  object: MainInterface,
  element: FormElementInterface,
  conditions: string,
  parentsIndexes: any[],
) => {
  if (!element.array) {
    return;
  }

  const add = `get${TextTransformation.singularize(
    TextTransformation.pascalfy(element.array.id)
  )}`;
  const remove = `remove${TextTransformation.singularize(
    TextTransformation.pascalfy(element.array.id)
  )}`;

  let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
    process.env.ARRAY_LAYER!
  );
  let code = ``;
  let arrayStructure = ``;
  let arrayCurrentIndex: any;
  let parentArray: string | undefined;
  let getParents: string = ``;
  let getParentsIndexes: string = ``;

  _arrayLayer?.forEach((arrayLayer: ArrayFeaturesInterface) => {
    if (arrayLayer.name === element.array?.id) {
      parentArray = arrayLayer.parentArray;
    }
  });

  if (parentArray) {
    _allParents = [];
    setAllParents(parentArray);

    _allParents.forEach((parent: string, index: number) => {
      const singularParent: string = TextTransformation.singularize(parent);

      getParents += `this.${parent}.at(${singularParent}Index).`;
      getParentsIndexes += `${singularParent}Index: number${index < _allParents.length - 1 ? ", " : ""}`;
    });
  }

  _arrayLayer?.forEach((array) => {
    if (array.name === element.array?.id) {
      arrayCurrentIndex = array.indexIdentifier;
    }
  });

  for (let arrayElementIndex = 0; arrayElementIndex < element.array.elements.length; arrayElementIndex++) {
    const arrayElement = element.array.elements[arrayElementIndex];
    arrayStructure += setSpecificStructureOverFormElement(
      object,
      arrayElement,
      element.array,
      arrayCurrentIndex,
      [...parentsIndexes, `${TextTransformation.singularize(element.array.id)}Index`, (arrayElement.array && arrayElement.array.id)],
    );
  };

  const parentsIndexesArrayCode = `
    [
      ${parentsIndexes
      .filter(el => el && el.length > 1)
      .map((el, index) => {
        if (index % 2 === 0) {
          return `'${el}'`;
        } else {
          return `${el}`;
        }
      })
    }
    ]
  `;

  code += `
    <div ${conditions}>
      <ng-container formArrayName="${element.array?.id}">
        <mat-list *ngFor="let _${TextTransformation.singularize(element.array?.id)} of getMultidimensionalArrayValue(${parentsIndexesArrayCode})
        .controls; index as ${TextTransformation.singularize(element.array?.id)}Index">
          <ng-container [formGroupName]="${TextTransformation.singularize(element.array?.id)}Index">
            <mat-list-item>
              ${element.array?.title} {{1 + ${TextTransformation.singularize(element.array?.id)}Index}}
            </mat-list-item>
            <div>
              ${arrayStructure}
            </div>
            <div>
              <button mat-button type="button" color="warn" (click)="deleteFromMultidimensionalArray(${parentsIndexesArrayCode}, ${TextTransformation.singularize(element.array.id)}Index)
              ">
                Remover ${element.array?.title.toLowerCase()}
              </button>
            </div>
          </ng-container>
          <mat-divider></mat-divider>
        </mat-list>
      </ng-container>
    </div>
    <div style="margin: 10px 0;" ${conditions}>
      <button mat-raised-button type="button" (click)="addInMultidimensionalArray(${parentsIndexesArrayCode},${add}())
      ">
        Adicionar ${element.array?.title.toLowerCase()}
      </button>
      <mat-divider></mat-divider>
    </div>
    `;

  return code;
};

export {
  setArrayTemplate,
  setArrayFlowIdentifier,
  setArrayIndexes,
  setArrayIndexesToAdd,
};
