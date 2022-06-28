import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";

let _hasArray: boolean = false;
let _hasValidator: boolean = false;
let _hasAutocompleteMultiple: boolean = false;
let _hasAutocomplete: boolean = false;
let _hasCondition: boolean = false;

const setFormControllerImports = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  object.form?.elements.map((element) => {
    verifyFormElement(element);
  });

  let code = `
  import { Component, ${_hasAutocomplete ? `ElementRef, ViewChild,` : ``} ${
    _hasCondition ? `OnChanges,` : ``
  }} from "@angular/core";
  import { FormBuilder, FormGroupDirective, FormGroup, ${
    _hasArray ? "FormArray," : ""
  } ${_hasValidator ? "Validators," : ""} } from "@angular/forms";
  import { ActivatedRoute, Router } from "@angular/router";
  import { MatSnackBar } from "@angular/material/snack-bar";
  ${
    _hasAutocomplete
      ? `import { COMMA, ENTER } from "@angular/cdk/keycodes";
    import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
    import { MyPerformance } from "src/app/utils/performance";`
      : ``
  }
  ${
    _hasAutocompleteMultiple
      ? `import {MatChipInputEvent} from '@angular/material/chips';`
      : ``
  }
  import { MyErrorHandler } from "../../utils/error-handler";
  import { ${TextTransformation.pascalfy(
    object.form.id
  )}Service } from "./${TextTransformation.kebabfy(object.form.id)}.service";
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
  }
};

export { setFormControllerImports };
