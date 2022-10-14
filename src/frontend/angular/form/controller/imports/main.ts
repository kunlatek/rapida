import { FormInputTypeEnum } from "../../../../../enums/form";
import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";

let _hasArray: boolean = false;
let _hasValidator: boolean = false;
let _hasAutocompleteMultiple: boolean = false;
let _hasAutocomplete: boolean = false;
let _hasCondition: boolean = false;
let _hasInputApiRequest: boolean = false;
let _hasFile: boolean = false;

const setFormControllerImports = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }
  const objectIdKebab: string = TextTransformation.kebabfy(object.form.id);
  const objectIdPascal: string = TextTransformation.pascalfy(object.form.id);

  _hasArray = false;
  _hasValidator = false;
  _hasAutocompleteMultiple = false;
  _hasAutocomplete = false;
  _hasCondition = false;
  _hasInputApiRequest = false;
  _hasFile = false;

  object.form.elements.map((element) => {
    verifyFormElement(element);
  });

  let code = `
  import { Component, Input, OnChanges,
  ${_hasAutocompleteMultiple ? `ElementRef, ViewChild,` : ``
    }} from "@angular/core";
  import { FormBuilder, FormGroupDirective, FormGroup, FormControl, 
  ${_hasArray ? "FormArray," : ""} 
  ${_hasValidator ? "Validators," : ""} } from "@angular/forms";
  import { ActivatedRoute, Router } from "@angular/router";
  import { MatSnackBar } from "@angular/material/snack-bar";
  import { lastValueFrom } from 'rxjs';
  ${_hasAutocomplete || _hasInputApiRequest
      ? `import { MyPerformance } from "src/app/utils/performance";`
      : ``
    }
  ${_hasAutocompleteMultiple
      ? `import { COMMA, ENTER } from "@angular/cdk/keycodes";
      import {MatChipInputEvent} from '@angular/material/chips';
      import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';`
      : ``
    }
  import { MyErrorHandler } from "../../utils/error-handler";
  import { ${objectIdPascal}Service } from "./${objectIdKebab}.service";
  `;

  return code;
};

const verifyFormElement = (element: FormElementInterface): void => {
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
    _hasArray = true;
    element.array.elements.forEach((arrayElement) => {
      verifyFormElement(arrayElement);
    });
  }

  if (element.input) {
    if (element.input.type === FormInputTypeEnum.File) {
      _hasFile = true;
    }
  }

  if (element.autocomplete) {
    _hasAutocomplete = true;

    if (value.isMultiple) {
      _hasAutocompleteMultiple = true;
    }
  }

  if (formElements.includes(type)) {
    if (value.conditions) {
      _hasCondition = true;
    }
    if (value.isRequired) {
      _hasValidator = true;
    }
    if (value.validators) {
      if (value.validators.length > 0) {
        _hasValidator = true;
      }
    }
    if (value.apiRequest) {
      _hasInputApiRequest = true;
    }
  }
};

export { setFormControllerImports };
