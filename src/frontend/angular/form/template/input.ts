import { FormInputTypeEnum } from "../../../../enums/form";
import { ArrayFeaturesInterface } from "../../../../interfaces/array";
import { ArrayInterface, FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { setArrayLayer } from "../../core/array";
require("dotenv").config();

let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
  process.env.ARRAY_LAYER!
);
let _allParents: Array<string> = [];

const setInput = (
  object: MainInterface,
  element: FormElementInterface,
  conditions: string,
  array: ArrayInterface | undefined = undefined
) => {
  let code = ``;

  if (!element.input) {
    return code;
  }

  setArrayLayer(object.form!.elements);

  _arrayLayer = JSON.parse(process.env.ARRAY_LAYER!);

  let parentArray: string | undefined;
  let getParents: string = ``;
  let getParentsIndexes: string = ``;
  let getParentsControl: string = ``;

  if (array) {
    _arrayLayer?.forEach((arrayLayer: ArrayFeaturesInterface) => {
      if (arrayLayer.name === array.id) {
        parentArray = arrayLayer.parentArray;
      }
    });

    if (parentArray) {
      setAllParents(parentArray);

      _allParents.forEach((parent: string, index: number) => {
        getParents += `this.${parent}.at(${TextTransformation.singularize(
          parent
        )}Index).`;
        getParentsIndexes += `${TextTransformation.singularize(
          parent
        )}Index: number${index < _allParents.length - 1 ? ", " : ""}`;
        getParentsControl += `"${parent}", ${TextTransformation.singularize(
          parent
        )}Index${index < _allParents.length - 1 ? ", " : ""}`;
      });
    }
  }

  const callMethod = element.input.apiRequest
    ? `(focusout)="callSet${TextTransformation.pascalfy(
      element.input.name
    )}InputRequestToFind(${getParentsIndexes && getParentsIndexes !== ""
      ? `${getParentsIndexes?.replace(/: number/g, "")}, `
      : ``
    }
        ${array ? `${TextTransformation.singularize(array.id)}Index` : ""})"`
    : "";
  const placeholder = element.input.placeholder
    ? `placeholder="${element.input.placeholder}"`
    : "";

  const tooltip = element.input.tooltip
    ? `matTooltip="${element.input.tooltip}"`
    : "";
  const required = element.input.isRequired ? "required" : "";
  const mask = element.input.mask ? `mask="${element.input.mask}"` : "";

  if (element.input.type === FormInputTypeEnum.File) {
    code += `
        <input type="file" class="file-input" (change)="on${TextTransformation.capitalization(
      element.input.name
    )}FileSelected(${array ? `_${TextTransformation.singularize(array.id)}, ` : ""}$event)" ${tooltip}
        #${element.input.name}Upload 
        onclick="this.value = null" 
        multiple>
        <div class="file-upload">
            <button type="button" mat-raised-button color="primary" 
            (click)="${element.input.name}Upload.click()">
                <mat-icon>attach_file</mat-icon>
                Enviar arquivo
            </button>
        </div>
        <mat-list>
          <mat-list-item *ngFor="let file of ${array
        ? `_${TextTransformation.singularize(array.id)}.get('${element.input.name}')?.value; `
        : `${object.form?.id}Form.value.${element.input.name}; `}index as i;">
            <a href="{{file.url}}" target="_blank">{{file.name}}</a>
            <button mat-icon-button type="button"
            (click)="delete${TextTransformation.capitalization(
          element.input.name
        )}File(${array ? `_${TextTransformation.singularize(array.id)}.get('${element.input.name}'), ` : ``}i)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-list-item>
        </mat-list>
      `;
  } else if (element.input.isMultipleLines) {
    code += `
      <mat-form-field class="full-width" ${conditions}>
        <mat-label>${element.input.label}</mat-label>
          <textarea matInput formControlName="${element.input.name}" ${placeholder} ${tooltip} ${required}>
        </textarea>
      </mat-form-field>
      `;
  } else if (element.input.type === FormInputTypeEnum.Date) {
    code += `
      <mat-form-field ${conditions}>
        <input matInput formControlName="${element.input.name}" ${placeholder ? placeholder : `placeholder="${element.input.label}"`
      } ${tooltip} ${required} ${mask} ${callMethod} [matDatepicker]="${element.input.name
      }Picker" [disabled]="true">
        <mat-datepicker-toggle matSuffix [for]="${element.input.name
      }Picker"></mat-datepicker-toggle>
        <mat-datepicker #${element.input.name
      }Picker [disabled]="false"></mat-datepicker>
      </mat-form-field>
      `;
  } else {
    code += `
      <mat-form-field ${conditions}>
        <mat-label>${element.input.label}</mat-label>
        <input matInput type="${element.input.type}" formControlName="${element.input.name}" ${placeholder} ${tooltip} ${required} ${mask} ${callMethod} autocomplete="new-password">
      </mat-form-field>
      `;
  }

  return code;
};

const setAllParents = (lastParent: string) => {
  _allParents.push(lastParent);

  _arrayLayer.forEach((element: ArrayFeaturesInterface) => {
    if (element.name === lastParent && element.parentArray) {
      _allParents.push(element.parentArray);
      setAllParents(element.parentArray);
    }
  });
};

export { setInput };
