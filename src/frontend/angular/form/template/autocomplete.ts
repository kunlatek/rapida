import { ArrayFeaturesInterface } from "../../../../interfaces/array";
import {
  ArrayInterface,
  FormElementInterface
} from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
require("dotenv").config();

let _allParents: Array<string> = [];

const setAutocomplete = (
  object: MainInterface,
  element: FormElementInterface,
  conditions: string,
  array: ArrayInterface | undefined = undefined
) => {
  if (!element.autocomplete) {
    return "";
  }
  const name = element.autocomplete.name;
  const label = element.autocomplete.label;
  const labelField = element.autocomplete.optionsApi.labelField;
  const valueField = element.autocomplete.optionsApi.valueField;
  const namePascal = TextTransformation.pascalfy(name);
  const arrayId = array?.id ? array.id : "";
  const arrayIdSingular = array?.id
    ? TextTransformation.singularize(arrayId)
    : "";
  let code = "";
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

      _allParents.reverse().forEach((parent: string, index: number) => {
        const singularParent: string = TextTransformation.singularize(parent);

        getParentsIndexes += `${singularParent}Index: number${index < _allParents.length - 1 ? ", " : ""}`;
        getParentsControl += `"${parent}", ${singularParent}Index${index < _allParents.length - 1 ? ", " : ""}`;
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
  let setCondition = "";
  if (element.autocomplete.isTriggerToCondition) {
    setCondition += `(focusout)="`;

    if (array) {
      setCondition += `setConditionIn${namePascal}(${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? ", " : ""
        }${array
          ? `${arrayIdSingular}Index, `
          : ``
        })`;
    }

    if (!array) {
      setCondition += `setCondition()`;
    }
    setCondition += `"`;
  }
  if (element.autocomplete.isMultiple) {
    code += `
      <mat-form-field class="full-width" ${conditions}>
        <mat-label>${label}</mat-label>
        <mat-chip-list #${name}ChipList aria-label="Seleção de ${label.toLowerCase()}">
          <mat-chip 
            *ngFor="let ${name}Item of get${namePascal}(${getParentsIndexes && getParentsIndexes !== ""
        ? getParentsIndexes?.replace(/: number/g, "")
        : ""
      }${getParentsIndexes && getParentsIndexes !== "" && array ? `, ` : ``}${array ? `${TextTransformation.singularize(array.id)}Index` : ``
      })"
            (removed)="remove${namePascal}(
              ${getParentsIndexes && getParentsIndexes !== ""
        ? `${getParentsIndexes?.replace(/: number/g, "")}, `
        : ``
      }
        ${array ? `${TextTransformation.singularize(array.id)}Index, ` : ""}${name}Item)">
            {{${name}Item}}
            <button matChipRemove>
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip>
          <input 
            ${placeholder} ${tooltip} 
            type="${element.autocomplete.type}" 
            formControlName="${name}" 
            ${setCondition} 
            matInput 
            [matAutocomplete]="auto${namePascal}" 
            [matChipInputFor]="${name}ChipList" 
            [matChipInputSeparatorKeyCodes]="${name}SeparatorKeysCodes"
            (matChipInputTokenEnd)="add${namePascal}(${getParentsIndexes && getParentsIndexes !== ""
        ? getParentsIndexes?.replace(/: number/g, "")
        : ""
      }${getParentsIndexes && getParentsIndexes !== "" && array ? `, ` : ``}${array ? `${TextTransformation.singularize(array.id)}Index, ` : ``
      }$event)"
            (keyup)="callSetFiltered${namePascal}($event${getParentsIndexes && getParentsIndexes !== ""
        ? `, ${getParentsIndexes?.replace(/: number/g, "")}`
        : ""
      }${array ? `, ${TextTransformation.singularize(array.id)}Index` : ``
      })" 
            #${name}Input 
            ${required}
          >
        </mat-chip-list>
        <mat-autocomplete 
          #auto${namePascal}="matAutocomplete" 
          (optionSelected)="selected${namePascal}(${getParentsIndexes && getParentsIndexes !== ""
        ? `${getParentsIndexes?.replace(/: number/g, "")}, `
        : ""
      }${array ? `${TextTransformation.singularize(array.id)}Index, ` : ``
      }$event)"
        >
        <mat-option disabled *ngIf="
          ${array && getParentsIndexes && getParentsIndexes !== ""
        ? `loading${namePascal}[${getParentsIndexes?.split(": number")[0]}]`
        : `loading${namePascal}`
      }
          ">
            <mat-spinner diameter="35"></mat-spinner>
          </mat-option>
        <ng-container *ngIf="
          ${array && getParentsIndexes && getParentsIndexes !== ""
        ? `!loading${namePascal}[${getParentsIndexes?.split(": number")[0]}];`
        : `!loading${namePascal};`
      }
          ">
          <mat-option *ngFor="let ${name}Item of filtered${namePascal}" [value]="${name}Item.${valueField}">`;

    if (!Array.isArray(labelField)) {
      code += `{{${name}Item.${labelField}}}`;
    }

    if (Array.isArray(labelField)) {
      const labelFieldLength =
        labelField.length;
      labelField.forEach(
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
  if (!element.autocomplete.isMultiple) {
    code += `
      <mat-form-field ${conditions}>
        <mat-label>${label}</mat-label>
        <input 
              type="${element.autocomplete.type}" 
              ${placeholder} ${tooltip} 
              aria-label="${label}" 
              formControlName="${name}" 
              matInput 
              ${setCondition} 
              [matAutocomplete]="auto${namePascal}" 
              (keyup)="callSetFiltered${namePascal}($event${getParentsIndexes && getParentsIndexes !== ""
        ? `, ${getParentsIndexes?.replace(/: number/g, "")}`
        : ""
      }${array ? `, ${TextTransformation.singularize(array.id)}Index` : ``
      })" 
              ${required}
        >
        <mat-autocomplete 
          #auto${namePascal}="matAutocomplete" 
          [displayWith]="displayFnTo${namePascal}.bind(this)"
        >
          <mat-option disabled *ngIf="
          ${array && getParentsIndexes && getParentsIndexes !== ""
        ? `loading${namePascal}[${getParentsIndexes?.split(": number")[0]}]`
        : `loading${namePascal}`
      }
          ">
            <mat-spinner diameter="35"></mat-spinner>
          </mat-option>
          <ng-container *ngIf="
          ${array && getParentsIndexes && getParentsIndexes !== ""
        ? `!loading${namePascal}[${getParentsIndexes?.split(": number")[0]}];`
        : `!loading${namePascal};`
      }
          ">
          <mat-option *ngFor="let ${name}Item of filtered${namePascal}" [value]="${name}Item.${valueField}">`;

    if (!Array.isArray(labelField)) {
      code += `{{${name}Item.${labelField}}}`;
    }

    if (Array.isArray(labelField)) {
      const labelFieldLength =
        labelField.length;
      labelField.forEach(
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

export { setAutocomplete };
