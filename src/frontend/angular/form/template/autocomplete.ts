import {
  ArrayInterface,
  FormElementInterface
} from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { setArrayLayer } from "../../core/array";
import { ArrayFeaturesInterface } from "./main";
require("dotenv").config();

let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
  process.env.ARRAY_LAYER!
);
let _allParents: Array<string> = [];

const setAutocomplete = (
  object: MainInterface,
  element: FormElementInterface,
  conditions: string,
  array: ArrayInterface | undefined = undefined
) => {
  let code = ``;

  if (!element.autocomplete) {
    return code;
  }

  setArrayLayer(object.form!.elements);

  _arrayLayer = JSON.parse(
    process.env.ARRAY_LAYER!
  );


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
        getParents += `this.${parent}.at(${TextTransformation.singularize(parent)}Index).`;
        getParentsIndexes += `${TextTransformation.singularize(parent)}Index: number${(index < (_allParents.length - 1)) ? ", " : ""}`;
        getParentsControl += `"${parent}", ${TextTransformation.singularize(parent)}Index${(index < (_allParents.length - 1)) ? ", " : ""}`;
      });
    }
  }

  const placeholder = element.autocomplete.placeholder
    ? `placeholder="${element.autocomplete.placeholder}"`
    : "";
  const tooltip = element.autocomplete.tooltip
    ? `matTooltip="${element.autocomplete.tooltip}"`
    : "";
  const required = element.autocomplete.isRequired ? "required" : "";

  if (element.autocomplete.isMultiple) {
    code += `
      <mat-form-field class="full-width" ${conditions}>
        <mat-label>${element.autocomplete.label}</mat-label>
        <mat-chip-list #${element.autocomplete.name
      }ChipList aria-label="Seleção de ${element.autocomplete.label.toLowerCase()}">
          <mat-chip 
            *ngFor="let ${element.autocomplete.name
      }Item of chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}View" 
            (removed)="remove${TextTransformation.pascalfy(
        element.autocomplete.name
      )}(
              ${(getParentsIndexes && (getParentsIndexes !== ""))
        ? `${getParentsIndexes?.replace(/: number/g, "")}${(parentArray && array) ? `, ${TextTransformation.singularize(array.id)}Index` : ``}`
        : ""
      }${(array && getParentsIndexes && (getParentsIndexes !== "")) ? ", " : ""}${element.autocomplete.name}Item)">
            {{${element.autocomplete.name}Item}}
            <button matChipRemove>
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip>
          <input 
            ${placeholder} ${tooltip} 
            type="${element.autocomplete.type}" 
            formControlName="${element.autocomplete.name}" 
            matInput 
            [matAutocomplete]="auto${TextTransformation.pascalfy(
        element.autocomplete.name
      )}" 
            [matChipInputFor]="${element.autocomplete.name}ChipList" 
            [matChipInputSeparatorKeyCodes]="${element.autocomplete.name
      }SeparatorKeysCodes" 
            (matChipInputTokenEnd)="add${TextTransformation.pascalfy(
        element.autocomplete.name
      )}(${(getParentsIndexes && (getParentsIndexes !== "")) ? getParentsIndexes?.replace(/: number/g, "") : ""}${(parentArray && array) ? `, ${TextTransformation.singularize(array.id)}Index` : ``}${array && getParentsIndexes && (getParentsIndexes !== "") ? ", " : ""}$event)" 
            (keyup)="callSetFiltered${TextTransformation.pascalfy(
        element.autocomplete.name
      )}(${(getParentsIndexes && (getParentsIndexes !== "")) ? getParentsIndexes?.replace(/: number/g, "") : ""}${(parentArray && array) ? `, ${TextTransformation.singularize(array.id)}Index` : ``})" 
            #${element.autocomplete.name}Input 
            ${required}
          >
        </mat-chip-list>
        <mat-autocomplete 
          #auto${TextTransformation.pascalfy(
        element.autocomplete.name
      )}="matAutocomplete" 
          (optionSelected)="selected${TextTransformation.pascalfy(
        element.autocomplete.name
      )}(${(getParentsIndexes && (getParentsIndexes !== "")) ? getParentsIndexes?.replace(/: number/g, "") : ""}${(parentArray && array) ? `, ${TextTransformation.singularize(array.id)}Index` : ``}${array && getParentsIndexes && (getParentsIndexes !== "") ? ", " : ""}$event)"
        >
        <mat-option disabled *ngIf="
          ${array && getParentsIndexes && (getParentsIndexes !== "")
        ? `loading${TextTransformation.pascalfy(
          element.autocomplete.name
        )}[${getParentsIndexes?.split(": number")[0]}]`
        : `loading${TextTransformation.pascalfy(
          element.autocomplete.name
        )}`
      }
          ">
            <mat-spinner diameter="35"></mat-spinner>
          </mat-option>
        <ng-container *ngIf="
          ${array && getParentsIndexes && (getParentsIndexes !== "")
        ? `!loading${TextTransformation.pascalfy(
          element.autocomplete.name
        )}[${getParentsIndexes?.split(": number")[0]}];`
        : `!loading${TextTransformation.pascalfy(
          element.autocomplete.name
        )};`
      }
          ">
          <mat-option *ngFor="let ${element.autocomplete.name
      }Item of filtered${TextTransformation.pascalfy(
        element.autocomplete.name
      )}" [value]="${element.autocomplete.name}Item.${element.autocomplete.optionsApi.valueField
      }">`;

    if (!Array.isArray(element.autocomplete.optionsApi.labelField)) {
      code += `{{${element.autocomplete.name}Item.${element.autocomplete.optionsApi.labelField}}}`;
    }

    if (Array.isArray(element.autocomplete.optionsApi.labelField)) {
      const name = element.autocomplete.name;
      const labelFieldLength =
        element.autocomplete.optionsApi.labelField.length;
      element.autocomplete.optionsApi.labelField.forEach(
        (e: string, index: number) => {
          code += `{{${name}Item.${e}}}`;
          if (labelFieldLength > index + 1) {
            code += ` - `;
          }
        }
      );
    }

    code += `</mat-option>
          </ng-container>
        </mat-autocomplete>
      </mat-form-field>
      `;
  } else {
    code += `
      <mat-form-field ${conditions}>
        <mat-label>${element.autocomplete.label}</mat-label>
        <input 
              type="${element.autocomplete.type}" 
              ${placeholder} ${tooltip} 
              aria-label="${element.autocomplete.label}" 
              formControlName="${element.autocomplete.name}" 
              matInput 
              [matAutocomplete]="auto${TextTransformation.pascalfy(
      element.autocomplete.name
    )}" 
              (keyup)="callSetFiltered${TextTransformation.pascalfy(
      element.autocomplete.name
    )}(${(getParentsIndexes && (getParentsIndexes !== "")) ? getParentsIndexes?.replace(/: number/g, "") : ""}${(parentArray && array) ? `, ${TextTransformation.singularize(array.id)}Index` : ``})" 
              ${required}
        >
        <mat-autocomplete 
          #auto${TextTransformation.pascalfy(
      element.autocomplete.name
    )}="matAutocomplete" 
          [displayWith]="displayFnTo${TextTransformation.pascalfy(
      element.autocomplete.name
    )}.bind(this)"
        >
          <mat-option disabled *ngIf="
          ${array && getParentsIndexes && (getParentsIndexes !== "")
        ? `loading${TextTransformation.pascalfy(
          element.autocomplete.name
        )}[${getParentsIndexes?.split(": number")[0]}]`
        : `loading${TextTransformation.pascalfy(
          element.autocomplete.name
        )}`
      }
          ">
            <mat-spinner diameter="35"></mat-spinner>
          </mat-option>
          <ng-container *ngIf="
          ${array && getParentsIndexes && (getParentsIndexes !== "")
        ? `!loading${TextTransformation.pascalfy(
          element.autocomplete.name
        )}[${getParentsIndexes?.split(": number")[0]}];`
        : `!loading${TextTransformation.pascalfy(
          element.autocomplete.name
        )};`
      }
          ">
          <mat-option *ngFor="let ${element.autocomplete.name
      }Item of filtered${TextTransformation.pascalfy(
        element.autocomplete.name
      )}" [value]="${element.autocomplete.name}Item.${element.autocomplete.optionsApi.valueField
      }">`;

    if (!Array.isArray(element.autocomplete.optionsApi.labelField)) {
      code += `{{${element.autocomplete.name}Item.${element.autocomplete.optionsApi.labelField}}}`;
    }

    if (Array.isArray(element.autocomplete.optionsApi.labelField)) {
      const name = element.autocomplete.name;
      const labelFieldLength =
        element.autocomplete.optionsApi.labelField.length;
      element.autocomplete.optionsApi.labelField.forEach(
        (e: string, index: number) => {
          code += `{{${name}Item.${e}}}`;
          if (labelFieldLength > index + 1) {
            code += ` - `;
          }
        }
      );
    }

    code += `</mat-option>
          </ng-container>
        </mat-autocomplete>
      </mat-form-field>
      `;
  }

  return code;
};

const setAllParents = (lastParent: string) => {
  _allParents.push(lastParent);

  _arrayLayer.forEach((element: ArrayFeaturesInterface) => {
    if ((element.name === lastParent) && element.parentArray) {
      _allParents.push(element.parentArray);
      setAllParents(element.parentArray);
    }
  });
};

export { setAutocomplete };
