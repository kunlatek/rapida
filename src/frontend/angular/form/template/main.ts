import * as fs from "fs";
import * as chp from "child_process";
import { MainInterface } from "../../../../interfaces/main";
import {
  FormElementInterface,
} from "../../../../interfaces/form";
import {
  FormButtonTypeEnum,
  FormInputTypeEnum,
} from "../../../../enums/form";
import { TextTransformation } from "../../../../utils/text.transformation";
import { setArrayFlowIdentifier, setArrayIndexes, setArrayIndexesToAdd, setArrayLayer } from "./array";
import { setConditions } from "./condition";
import { setAutocomplete } from "./autocomplete";
import { setInput } from "./input";
require('dotenv').config();

export interface ArrayFeaturesInterface {
  parentArray?: string;
  layer: number;
  arrayNumber: number;
  indexIdentifier: string;
  name: string;
}

let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
  process.env.ARRAY_LAYER!
);

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

  _arrayLayer = JSON.parse(
    process.env.ARRAY_LAYER!
  );

  object.form.elements.forEach((element) => {
    _specificStructure += setSpecificStructureOverFormElement(object, element);
    verifyFormElement(element);
  });

  const hasFormTitle = object.form.title
    ? `<mat-card-title>${object.form.title}</mat-card-title>`
    : "";

  const hasFormSubtitle = object.form.subtitle
    ? `<mat-card-subtitle>${object.form.subtitle}</mat-card-subtitle>`
    : "";

  let code = `
  <mat-card *ngIf="(isAddModule && updateOnePermission) || (!isAddModule && createOnePermission)">
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
  element: FormElementInterface,
  array: string | undefined = undefined,
  arrayCurrentIndexAsParam: string | undefined = undefined
): string => {
  let code = ``;
  let conditions = setConditions(element, array, arrayCurrentIndexAsParam);
  
  if (element.input) {
    code += setInput(object, element, conditions, arrayCurrentIndexAsParam);
  }

  if (element.autocomplete) {
    code += setAutocomplete(element, conditions, arrayCurrentIndexAsParam);
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
    const tooltip = element.select.tooltip
      ? `matTooltip="${element.select.tooltip}"`
      : "";
    const multiple = element.select.isMultiple ? "multiple" : "";
    const required = element.select.isRequired ? "required" : "";
    let setCondition = "";
    if (element.select.isTriggerToCondition) {
      setCondition += `(selectionChange)="`;

      if (array) {
        setCondition += `setConditionIn${TextTransformation.pascalfy(element.select.name)}(${setArrayIndexes(array)})`;
      }

      if (!array) {
        setCondition += `setCondition()"`
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
  }

  if (element.slide) {
    const setCondition = element.slide.isTriggerToCondition ? `(change)="setCondition()"` : "";
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
    let arrayCurrentIndex: any;
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
        element.array?.id,
        arrayCurrentIndex
      );
    });
    code += `
    <div ${conditions}>
      <ng-container formArrayName="${element.array?.id}">
        <mat-list *ngFor="let _${element.array?.id} of get${TextTransformation.pascalfy(element.array?.id)
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

  const filePath = `${object.projectPath
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

const verifyFormElement = (
  element: FormElementInterface,
  isArray: boolean = false
): void => {
  const formElements = [
    "input",
    "autocomplete",
    "button",
    "checkbox",
    "radio",
    "select",
    "slide",
  ];
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  if (element.tabs) {
    element.tabs.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        verifyFormElement(tabElement);
      });
    });
  }

  if (element.array) {
    element.array.elements.forEach((arrayElement) => {
      verifyFormElement(arrayElement, true);
    });
  }
};

export { setFormTemplate };
