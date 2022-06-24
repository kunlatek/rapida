import * as fs from "fs";
import * as chp from "child_process";
import { MainInterface } from "../../../../interfaces/main";
import {
  FormElementInterface,
} from "../../../../interfaces/form";
import {
  ConditionEnum,
  FormButtonTypeEnum,
  FormInputTypeEnum,
} from "../../../../enums/form";
import { TextTransformation } from "../../../../utils/text.transformation";

export interface ArrayFeaturesInterface {
  parentArray?: string;
  layer: number;
  arrayNumber: number;
  indexIdentifier: string;
  name: string;
}

let _arrayLayer: Array<ArrayFeaturesInterface> = [];
let _arraysInAFlow: Array<ArrayFeaturesInterface> = [];

/**
 * SET CODE
 * @param object
 * @returns
 */
const setFormTemplate = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let _specificStructure: string = ``;
  _arrayLayer = [];
  setArrayLayer(object.form.elements);

  object.form.elements.forEach((element) => {
    _specificStructure += setSpecificStructureOverFormElement(object, element);
  });

  const hasFormTitle = object.form.title
    ? `<mat-card-title>${object.form.title}</mat-card-title>`
    : "";

  const hasFormSubtitle = object.form.subtitle
    ? `<mat-card-subtitle>${object.form.subtitle}</mat-card-subtitle>`
    : "";

  let code = `
  <mat-card>
    <mat-card-header>
      ${hasFormTitle}
      ${hasFormSubtitle}
    </mat-card-header>

    <mat-card-content>
      <div *ngIf="isLoading" class="loading">
        <mat-progress-bar color="primary" mode="buffer">
        </mat-progress-bar>
      </div>
      <form id="${object.form.id}" 
      [formGroup]="${object.form.id}Form" 
      #${object.form.id}Directive="ngForm" 
      (ngSubmit)="${object.form.id}Submit(${object.form.id}Directive)" 
      *ngIf="!isLoading">
      ${_specificStructure}
      </form>
    </mat-card-content>
  </mat-card>
  `;

  setFormTemplateArchitectureAndWriteToFile(object, code);
  return code;
};

const setArrayLayer = (
  elements: Array<FormElementInterface>,
  index: number = 0,
  parentArray: string | undefined = undefined
) => {
  const iterationsIds = ["i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];
  const newIndex = index + 1;

  let hasArray = false;
  let arraysInThisLayer: Array<{
    id: string;
    elements: Array<FormElementInterface>;
  }> = [];

  elements.forEach(element => {
    if (element.array) {
      _arrayLayer.push(
        {
          layer: index,
          arrayNumber: _arrayLayer.length,
          indexIdentifier: iterationsIds[index],
          name: element.array.id,
          parentArray: parentArray
        }
      );

      arraysInThisLayer.push(
        {
          id: element.array.id,
          elements: element.array.elements
        }
      )

      hasArray = true;
    }

    if (element.tabs) {
      element.tabs.forEach((tab) => {
        setArrayLayer(tab.elements);
      });
    }
  });

  if (hasArray) {
    arraysInThisLayer.forEach(element => {
      setArrayLayer(
        element.elements,
        newIndex,
        element.id
      );
    });
  }
};

const setSpecificStructureOverFormElement = (
  object: MainInterface,
  element: FormElementInterface,
  array: string | undefined = undefined
): string => {
  let code = ``;
  let conditions = setConditions(element, array);

  if (element.input) {
    const placeholder = element.input.placeholder
      ? `placeholder="${element.input.placeholder}"`
      : "";
    const required = element.input.isRequired ? "required" : "";
    const mask = element.input.mask ? `mask="${element.input.mask}"` : "";

    if (element.input.type === FormInputTypeEnum.File) {
      code += `
      <mat-form-field  ${conditions}>
        <input type="file" class="file-input" (change)="onFileSelected($event)" #fileUpload multiple>
        <div class="file-upload">
            {{fileName || "Escolha arquivo para enviar"}}
        
            <button mat-mini-fab color="primary" class="upload-btn"
                (click)="fileUpload.click()">
                <mat-icon>attach_file</mat-icon>
            </button>
        </div>
      </mat-form-field>
      `;
    } else if (element.input.isMultipleLines) {
      code += `
      <mat-form-field class="full-width" ${conditions}>
        <mat-label>${element.input.label}</mat-label>
          <textarea matInput formControlName="${element.input.name}" ${placeholder} ${required}>
        </textarea>
      </mat-form-field>
      `;
    } else if (element.input.type === FormInputTypeEnum.Date) {
      code += `
      <mat-form-field ${conditions}>
        <input matInput type="${element.input.type}" formControlName="${element.input.name}" ${placeholder} ${required} ${mask} [matDatepicker]="${element.input.name}Picker" [disabled]="true">
        <mat-datepicker-toggle matSuffix [for]="${element.input.name}Picker"></mat-datepicker-toggle>
        <mat-datepicker #${element.input.name}Picker [disabled]="false"></mat-datepicker>
      </mat-form-field>
      `;
    } else {
      code += `
      <mat-form-field ${conditions}>
        <mat-label>${element.input.label}</mat-label>
        <input matInput type="${element.input.type}" formControlName="${element.input.name}" ${placeholder} ${required} ${mask} autocomplete="new-password">
      </mat-form-field>
      `;
    }
  }

  if (element.autocomplete) {
    const placeholder = element.autocomplete.placeholder
      ? `placeholder="${element.autocomplete.placeholder}"`
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
            ${placeholder} 
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
            )}()" 
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
              ${placeholder} 
              aria-label="${element.autocomplete.label}" 
              formControlName="${element.autocomplete.name}" 
              matInput 
              [matAutocomplete]="auto${TextTransformation.pascalfy(
                element.autocomplete.name
              )}" 
              (keyup)="callSetFiltered${TextTransformation.pascalfy(
                element.autocomplete.name
              )}()" 
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
  }

  if (element.button) {
    let color = "";
    const dialogAction = "";
    const label =
      element.button.type === FormButtonTypeEnum.Submit
        ? `{{isAddModule ? "Criar" : "Editar"}}`
        : element.button.label;
    const icon =
      element.button.type === FormButtonTypeEnum.Submit
        ? `{{isAddModule ? "save" : "edit"}}`
        : element.button.icon;
    const disabled = FormButtonTypeEnum.Submit
      ? `[disabled]="!${object.form?.id}Form.valid || isLoading"`
      : "";

    if (element.button.type === FormButtonTypeEnum.Button) {
      color = "";
    }
    if (element.button.type === FormButtonTypeEnum.Submit) {
      color = `color="primary" ${dialogAction}`;
    }
    if (element.button.type === FormButtonTypeEnum.Delete) {
      color = `color="warn" ${dialogAction}`;
    }
    if (element.button.type === FormButtonTypeEnum.Reset) {
      color = `color="accent"`;
    }

    if (element.button.type === FormButtonTypeEnum.Submit) {
      code += `<mat-card-actions>`;
    }
    code += `
    <button mat-raised-button 
    ${color} ${disabled}>
      <mat-icon>${icon}</mat-icon>
      ${label}
    </button>
    `;
    if (element.button.type === FormButtonTypeEnum.Submit) {
      code += `</mat-card-actions>`;
    }
  }

  if (element.checkbox) {
    // TO-DO: REQUIRED
    code += `
    <mat-form-field ${conditions}>
      <section class="${element.checkbox.name}-section" *ngFor="let ${element.checkbox.name}Item of ${element.checkbox.name}CheckboxObject">
        <mat-checkbox [value]="${element.checkbox.name}Item.value" 
        formControlName="${element.checkbox.name}">
          {{${element.checkbox.name}Item.label}}
        </mat-checkbox>
      </section>
    </mat-form-field>
    `;
  }

  if (element.radio) {
    // TO-DO: REQUIRED
    code += `
    <mat-form-field ${conditions}>
      <label id="${element.radio.name}-radio-group-label">{{${element.radio.label}}}</label>
      <mat-radio-group
        aria-labelledby="${element.radio.name}-radio-group-label"
        class="${element.radio.name}-radio-group"
        formControleName="${element.radio.name}">
        <mat-radio-button class="${element.radio.name}-radio-button" *ngFor="let ${element.radio.name}Item of ${element.radio.name}RadioObject" [value]="${element.radio.name}Item.value">
          {{${element.radio.name}Item.label}}
        </mat-radio-button>
      </mat-radio-group>
    </mat-form-field>
    `;
  }

  if (element.select) {
    const multiple = element.select.isMultiple ? "multiple" : "";
    const required = element.select.isRequired ? "required" : "";
    const setCondition = element.select.isTriggerToCondition ? `(selectionChange)="setCondition(i)"` : "";
    
    code += `
    <mat-form-field ${conditions}>
      <mat-label>${element.select.label}</mat-label>
      <mat-select formControlName="${element.select.name}" ${required} ${multiple} ${setCondition}>
        <mat-option *ngFor="let ${element.select.name}Item of ${element.select.name}SelectObject" [value]="${element.select.name}Item.value">
          {{${element.select.name}Item.label}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    `;
  }

  if (element.slide) {
    const setCondition = element.slide.isTriggerToCondition ? `(selectionChange)="setCondition(i, checked)"` : "";
    code += `
    <mat-slide-toggle formControlName="${element.slide.name}" ${conditions} ${setCondition}>
      ${element.slide.label}
    </mat-slide-toggle>
    `;
  }

  if (element.tabs) {
    code += `<mat-tab-group>`;
    element.tabs.forEach((tab) => {
      code += `<mat-tab label="${tab.title}" id="${tab.id}">`;
      tab.elements.forEach((tabElement) => {
        code += setSpecificStructureOverFormElement(object, tabElement);
      });
      code += `</mat-tab>`;
    });
    code += `</mat-tab-group>`;
  }

  if (element.array) {
    const arrayClassName = TextTransformation.pascalfy(element.array.id);
    const add = `add${arrayClassName}`;
    const remove = `remove${arrayClassName}`;

    let arrayStructure = ``;
    let arrayIndexes = setArrayIndexes(element.array.id);
    let arrayIndexesToAdd = setArrayIndexesToAdd(element.array.id);
    let arrayCurrentIndex;
    let arrayFlowIdentifier = setArrayFlowIdentifier(element.array.id) ? setArrayFlowIdentifier(element.array.id) : `this.${object.form?.id}Form`;
    _arrayLayer?.forEach(array => {
      if (array.name === element.array?.id) {
        arrayCurrentIndex = array.indexIdentifier;
      }
    });

    element.array.elements.forEach((arrayElement) => {
      arrayStructure += setSpecificStructureOverFormElement(
        object,
        arrayElement,
        element.array?.id
      );
    });
    code += `
    <div ${conditions}>
      <ng-container formArrayName="${element.array?.id}">
        <mat-list *ngFor="let _${element.array?.id} of get${
          TextTransformation.pascalfy(element.array?.id)
        }(${arrayFlowIdentifier}); index as ${arrayCurrentIndex}">
          <ng-container [formGroupName]="${arrayCurrentIndex}">
            <mat-list-item>
              ${element.array?.title} {{1 + ${arrayCurrentIndex}}}
            </mat-list-item>
            <div>
              ${arrayStructure}
            </div>
            <div>
              <button mat-button type="button" color="warn" (click)="${remove}(${arrayIndexes})">
                Remover ${element.array?.title.toLowerCase()}
              </button>
            </div>
          </ng-container>
          <mat-divider></mat-divider>
        </mat-list>
      </ng-container>
    </div>
    <div style="margin: 10px 0;" ${conditions}>
      <button mat-raised-button type="button" (click)="${add}(${arrayIndexesToAdd})">
        Adicionar ${element.array?.title.toLowerCase()}
      </button>
      <mat-divider></mat-divider>
    </div>
    `;
  }

  return code;
};

const setArrayFlowIdentifier = (arrayId: string): string | undefined => {
  let code: string | undefined = undefined;
  
  _arrayLayer?.forEach(array => {
    if (array.name === arrayId) {
      if (array.parentArray) {
        return code = `_${array.parentArray}`;
      }
    }

  });

  return code;
}

const setArrayIndexes = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();

  arrayReversed.forEach((array, index) => {
    code += array.indexIdentifier + ((arrayReversed.length > (index + 1)) ? ", " : "");
  });

  return code;
}

const setArrayIndexesToAdd = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();
  
  arrayReversed.forEach((array, index) => {
    if ((arrayReversed.length - 1) > index) {
      code += array.indexIdentifier + ((arrayReversed.length > (index + 2)) ? ", " : "");
    }    
  });

  return code;
}

const setArraysInAFlow = (arrayId: string) => { 
  _arrayLayer?.forEach(array => {
    if (array.name === arrayId) {
      if (_arraysInAFlow.indexOf(array) === -1) {
        _arraysInAFlow.push({
          indexIdentifier: array.indexIdentifier,
          arrayNumber: array.arrayNumber,
          layer: array.layer,
          name: array.name,
          parentArray: array.parentArray ? array.parentArray : undefined
        });
      }
      
      if (array.parentArray) {
        setArraysInAFlow(array.parentArray);
      }
    }
  });
}

const setConditions = (
  element: FormElementInterface,
  array: string | undefined = undefined
): string => {
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
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];
  let code = ``;

  if (formElements.includes(type)) {
    if (value.conditions) {
      if (value.conditions.type === ConditionEnum.Form) {
        if (array) {
          code += `*ngIf="${value.conditions.id}FormCondition[i]"`;
        }

        if (!array) {          
          code += `*ngIf="${value.conditions.id}FormCondition"`;
        }
      }

      if (value.conditions.type === ConditionEnum.Code) {
        code += `*ngIf="${value.conditions.id}CodeCondition"`;
      }
    }
  }

  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setFormTemplateArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  if (!object.form) {
    return "";
  }

  const filePath = `${
    object.projectPath
  }/src/app/components/${TextTransformation.kebabfy(
    object.form.id
  )}/${TextTransformation.kebabfy(object.form.id)}.component.html`;

  try {
    fs.writeFileSync(filePath, code);
    console.info(
      `File ${TextTransformation.kebabfy(object.form.id)} already exists.`
    );
    console.info(`File successfully written in ${filePath}.`);
  } catch (error) {
    console.info(
      `File ${TextTransformation.kebabfy(object.form.id)} doesn't exist.`
    );

    try {
      chp.execSync(
        `ng g c components/${TextTransformation.kebabfy(
          object.form.id
        )} --skip-import`,
        { cwd: object.projectPath }
      );
    } catch (error) {
      console.warn(error);
    }

    fs.writeFileSync(filePath, code);

    console.info(`File successfully created in ${filePath}.`);
  }
};

export { setFormTemplate };
