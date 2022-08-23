import { FormInputTypeEnum } from "../../../../enums/form";
import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

const setInput = (
  object: MainInterface,
  element: FormElementInterface,
  conditions: string,
  arrayCurrentIndexAsParam: string | undefined = undefined
) => {
  let code = ``;

  if (!element.input) {
    return code;
  }

  const callMethod = element.input.apiRequest
    ? `(focusout)="callSet${TextTransformation.pascalfy(
        element.input.name
      )}InputRequestToFind(${arrayCurrentIndexAsParam})"`
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
        )}FileSelected($event)" ${tooltip} #fileUpload multiple>
        <div class="file-upload">
            <button type="button" mat-raised-button color="primary" (click)="fileUpload.click()">
                <mat-icon>attach_file</mat-icon>
                Enviar arquivo
            </button>
        </div>
        <mat-list>
          <mat-list-item *ngFor="let file of ${object.form?.id}Form.value.${
      element.input.name
    }; index as i;">
            {{file.name}}
            <button mat-icon-button type="button" (click)="delete${TextTransformation.capitalization(
              element.input.name
            )}File(i)">
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
        <input matInput formControlName="${element.input.name}" ${
      placeholder ? placeholder : `placeholder="${element.input.label}"`
    } ${tooltip} ${required} ${mask} ${callMethod} [matDatepicker]="${
      element.input.name
    }Picker" [disabled]="true">
        <mat-datepicker-toggle matSuffix [for]="${
          element.input.name
        }Picker"></mat-datepicker-toggle>
        <mat-datepicker #${
          element.input.name
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

export { setInput };
