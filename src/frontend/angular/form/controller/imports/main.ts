import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";

let _hasArray = false;
let _hasValidator = false;
let _hasAutocompleteMultiple = false;
let _hasAutocomplete = false;
let _hasCondition = false;
let _hasInputApiRequest = false;

const setFormControllerImports = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  _hasArray = false;
  _hasValidator = false;
  _hasAutocompleteMultiple = false;
  _hasAutocomplete = false;
  _hasCondition = false;
  _hasInputApiRequest = false;

  object.form.elements.map((element) => {
    verifyFormElement(element);
  });

  const code = `
  import { Component, ${_hasAutocompleteMultiple ? `ElementRef, ViewChild,` : ``} ${_hasCondition ? `OnChanges,` : ``
    }} from "@angular/core";
  import { FormBuilder, FormGroupDirective, FormGroup, ${_hasArray ? "FormArray," : ""
    } ${_hasValidator ? "Validators," : ""} } from "@angular/forms";
  import { ActivatedRoute, Router } from "@angular/router";
  import { MatSnackBar } from "@angular/material/snack-bar";
  ${(_hasAutocomplete || _hasInputApiRequest)
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
  import { ${TextTransformation.pascalfy(
      object.form.id
    )}Service } from "./${TextTransformation.kebabfy(object.form.id)}.service";
  import { fileListToBase64 } from "src/app/utils/file";
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
