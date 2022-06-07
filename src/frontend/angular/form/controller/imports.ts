import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

let _hasArray: boolean = false;
let _hasValidator: boolean = false;
let _hasAutocompleteMultiple: boolean = false;
let _hasAutocomplete: boolean = false;

const setFormControllerImports = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  object.form?.elements.map((element) => {
    verifyFormElement(element);
  });

  const code = `
  import { Component, ${
    _hasAutocompleteMultiple ? `ElementRef, ViewChild,` : ``
  } } from "@angular/core";
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

const verifyFormElement = (
  element: FormElementInterface
): string => {
  let code = ``;

  if (element.input) {
    if (element.input.isRequired) {
      _hasValidator = true;
    }
    if (element.input.validators) {
      if (element.input.validators.length > 0) {
        _hasValidator = true;
      }
    }
  }

  if (element.select) {
    if (element.select.isRequired) {
      _hasValidator = true;
    }
    if (element.select.validators) {
      if (element.select.validators.length > 0) {
        _hasValidator = true;
      }
    }
  }

  if (element.autocomplete) {
    _hasAutocomplete = true;
    if (element.autocomplete.isRequired) {
      _hasValidator = true;
    }
    if (element.autocomplete.validators) {
      if (element.autocomplete.validators.length > 0) {
        _hasValidator = true;
      }
    }
    if (element.autocomplete.isMultiple) {
      _hasAutocompleteMultiple = true;
    }
  }

  if (element.tabs) {
    element.tabs.forEach(tab => {
      tab.elements.forEach(tabElement => {
        verifyFormElement(tabElement);
      });
    });
  }

  if (element.array) {
    _hasArray = true;
  }

  return code;
};

export { setFormControllerImports };
