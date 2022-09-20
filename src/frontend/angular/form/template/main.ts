import * as chp from "child_process";
import * as fs from "fs";
import {
  ArrayInterface,
  FormElementInterface
} from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { setArrayLayer } from "../../core/array";
import { setArrayTemplate } from "./array";
import { setAutocomplete } from "./autocomplete";
import { setButton } from "./button";
import { setConditions } from "./condition";
import { setInput } from "./input";
import { setSelect } from "./select";
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
const setFormTemplate = (object: MainInterface, mainArray: Array<MainInterface> | undefined = undefined,): string => {
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
  array: ArrayInterface | undefined = undefined,
  arrayCurrentIndexAsParam: string | undefined = undefined
): string => {
  let code = ``;
  let conditions = setConditions(element, array, arrayCurrentIndexAsParam);

  if (element.input) {
    code += setInput(object, element, conditions, arrayCurrentIndexAsParam);
  }

  if (element.autocomplete) {
    code += setAutocomplete(object, element, conditions, array);
  }

  if (element.button) {
    code += setButton(object, element, conditions);
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
    code += setSelect(object, element, conditions);
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
    code += setArrayTemplate(object, element, conditions);
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

export { setFormTemplate, setSpecificStructureOverFormElement };
