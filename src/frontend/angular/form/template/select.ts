import { ArrayFeaturesInterface } from "../../../../interfaces/array";
import { ArrayInterface, FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
require("dotenv").config();

let _allParents: Array<string> = [];

const setSelect = (
  object: MainInterface,
  element: FormElementInterface,
  conditions: string,
  array: ArrayInterface | undefined = undefined
) => {
  if (!element.select) {
    return;
  }

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

      _allParents.forEach((parent: string, index: number) => {
        const singularParent: string = TextTransformation.singularize(parent);

        getParentsIndexes += `${singularParent}Index: number${index < _allParents.length - 1 ? ", " : ""}`;
        getParentsControl += `"${parent}", ${singularParent}Index${index < _allParents.length - 1 ? ", " : ""}`;
      });
    }
  }
  let code = ``;
  const tooltip = element.select.tooltip
    ? `matTooltip="${element.select.tooltip}"`
    : "";
  const multiple = element.select.isMultiple ? "multiple" : "";
  const required = element.select.isRequired ? "required" : "";
  let setCondition = "";
  if (element.select.isTriggerToCondition) {
    setCondition += `(selectionChange)="`;

    if (array) {
      setCondition += `setConditionIn${TextTransformation.pascalfy(
        element.select.name
      )}(${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""
        }${array
          ? `${arrayIdSingular}Index: number, `
          : ``
        })`;
    }

    if (!array) {
      setCondition += `setCondition()`;
    }
    setCondition += `"`;
  }

  code += `
    <mat-form-field ${conditions}>
      <mat-label>${element.select.label}</mat-label>
      <mat-select formControlName="${element.select.name}" ${tooltip} ${required} ${multiple} ${setCondition}>
        <mat-option *ngFor="let ${element.select.name}Item of ${element.select.name}SelectObject" [value]="${element.select.name}Item.value">
          {{${element.select.name}Item.label}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    `;
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
  setSelect
};
