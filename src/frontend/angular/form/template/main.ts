import * as fs from "fs";
import * as chp from "child_process";
import { MainInterface } from "../../../../interfaces/main";
import { FormElementInterface } from "../../../../interfaces/form";
import { FormButtonTypeEnum, FormInputTypeEnum } from "../../../../enums/form";
import { TextTransformation } from "../../../../utils/text.transformation";

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

  object.form.elements.map((element) => {
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

const setSpecificStructureOverFormElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  let code = ``;

  if (element.input) {
    const placeholder = element.input.placeholder
      ? `placeholder="${element.input.placeholder}"`
      : "";
    const required = element.input.isRequired ? "required" : "";
    const mask = element.input.mask ? `mask="${element.input.mask}"` : "";

    if (element.input.type === FormInputTypeEnum.File) {
      code += `
      <mat-form-field  ${element.input.condition ? `$ngIf=${element.input.condition}` : ``}>
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
      <mat-form-field class="full-width" ${element.input.condition ? `$ngIf=${element.input.condition}` : ``}>
        <mat-label>${element.input.label}</mat-label>
          <textarea matInput formControlName="${element.input.name}" ${placeholder} ${required}>
        </textarea>
      </mat-form-field>
      `;
    } else {
      code += `
      <mat-form-field ${element.input.condition ? `$ngIf=${element.input.condition}` : ``}>
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
      <mat-form-field class="full-width" ${element.autocomplete.condition ? `$ngIf=${element.autocomplete.condition}` : ``}>
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
      <mat-form-field ${element.autocomplete.condition ? `$ngIf=${element.autocomplete.condition}` : ``}>
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
    <mat-form-field ${element.checkbox.condition ? `$ngIf=${element.checkbox.condition}` : ``}>
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
    <mat-form-field ${element.radio.condition ? `$ngIf=${element.radio.condition}` : ``}>
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

    code += `
    <mat-form-field ${element.select.condition ? `$ngIf=${element.select.condition}` : ``}>
      <mat-label>${element.select.label}</mat-label>
      <mat-select formControlName="${element.select.name}" ${required} ${multiple}>
        <mat-option *ngFor="let ${element.select.name}Item of ${element.select.name}SelectObject" [value]="${element.select.name}Item.value">
          {{${element.select.name}Item.label}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    `;
  }

  if (element.slide) {
    code += `
    <mat-form-field ${element.slide.condition ? `$ngIf=${element.slide.condition}` : ``}>
      <mat-label>${element.slide.label}</mat-label>
      <mat-slide-toggle formControlName="${element.slide.name}">
        ${element.slide.label}
      </mat-slide-toggle>
    </mat-form-field>
    `;
  }

  if (element.tabs) {
    code += `<mat-tab-group>`;
    element.tabs.forEach(tab => {
      code += `<mat-tab label="${tab.title}" id="${tab.id}">`;
      tab.elements.forEach(tabElement => {
        code += setSpecificStructureOverFormElement(object, tabElement);
      });
      code += `</mat-tab>`;
    });
    code += `</mat-tab-group>`;
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
