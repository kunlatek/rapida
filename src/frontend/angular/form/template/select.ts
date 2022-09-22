import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { setArrayIndexes } from "../controller/methods/array";

const setSelect = (
  object: MainInterface,
  element: FormElementInterface,
  conditions: string,
) => {
  if (!element.select) {
    return;
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

    if (element.array) {
      setCondition += `setConditionIn${TextTransformation.pascalfy(
        element.select.name
      )}(${setArrayIndexes(element.array.id)})`;
    }

    if (!element.array) {
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

export {
  setSelect
};
