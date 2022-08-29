import { FormElementInterface } from "../../../../interfaces/form";
import { TextTransformation } from "../../../../utils/text.transformation";

const setAutocomplete = (
  element: FormElementInterface,
  conditions: string,
  arrayCurrentIndexAsParam: string | undefined = undefined
) => {
  let code = ``;

  if (!element.autocomplete) {
    return code;
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
        <mat-chip-list #${
          element.autocomplete.name
        }ChipList aria-label="Seleção de ${element.autocomplete.label.toLowerCase()}">
          <mat-chip 
            *ngFor="let ${
              element.autocomplete.name
            }Item of chosen${TextTransformation.pascalfy(
      element.autocomplete.name
    )}View" 
            (removed)="remove${TextTransformation.pascalfy(
              element.autocomplete.name
            )}(${element.autocomplete.name}Item)">
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
            [matChipInputSeparatorKeyCodes]="${
              element.autocomplete.name
            }SeparatorKeysCodes" 
            (matChipInputTokenEnd)="add${TextTransformation.pascalfy(
              element.autocomplete.name
            )}($event)" 
            (keyup)="callSetFiltered${TextTransformation.pascalfy(
              element.autocomplete.name
            )}(${arrayCurrentIndexAsParam})" 
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
          )}($event)"
        >
          <mat-option *ngFor="let ${
            element.autocomplete.name
          }Item of filtered${TextTransformation.pascalfy(
      element.autocomplete.name
    )}" [value]="${element.autocomplete.name}Item.${
      element.autocomplete.optionsApi.valueField
    }">
                {{${element.autocomplete.name}Item.${
      element.autocomplete.optionsApi.labelField
    }}}
          </mat-option>
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
              )}(${arrayCurrentIndexAsParam})" 
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
          <mat-option *ngFor="let ${
            element.autocomplete.name
          }Item of filtered${TextTransformation.pascalfy(
      element.autocomplete.name
    )}" [value]="${element.autocomplete.name}Item.${
      element.autocomplete.optionsApi.valueField
    }">
            {{${element.autocomplete.name}Item.${
      element.autocomplete.optionsApi.labelField
    }}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
      `;
  }

  return code;
};

export { setAutocomplete };
