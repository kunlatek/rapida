import { FormInputTypeEnum } from "../../../../../enums/form";
import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
require('dotenv').config();

const setFormBuilderProperty = (
  object: MainInterface
): string => {
  let code = ``;

  if (!object.form) {
    return code;
  }

  code += `${object.form.id}Builder = { ${setFormBuilderByElements(object.form.elements)} };`;

  code += setFormArrayBuilderByElementsProperty(object.form.elements);

  return code;
};

const setFormArrayBuilderByElementsProperty = (
  formElements: Array<FormElementInterface>
): string => {
  let code = ``;
  for (let index = 0; index < formElements.length; index++) {
    const element = formElements[index];

    if (element.array) {
      // code += `${element.array.id}Builder = { 
      //   ${setFormBuilderByElements(element.array.elements)}
      // };`;

      code += setFormArrayBuilderByElementsProperty(element.array.elements);
    }

    if (element.tabs) {
      element.tabs.forEach((tab) => {
        code += setFormArrayBuilderByElementsProperty(tab.elements);
      });
    }
  }

  return code;
};

const setFormBuilderByElements = (
  formElements: Array<FormElementInterface>,
  inArray: undefined | string = undefined
) => {
  let code = ``;

  formElements.forEach(element => {
    if (element.input) {
      code += `
      ${element.input.name}: new FormControl(
        ${element.input.type === FormInputTypeEnum.File
          ? `[],`
          : `{
            ${element.input.value ? `value: '${element.input.value}'` : `value: null`}
            ${element.input.isDisabled ? `, disabled: true` : `, disabled: false`}
          },`
        }
        [
      `;
      // VALIDATORS
      if (element.input.validators) {
        element.input.validators.forEach((validator) => {
          code += `Validators.${validator},`;
        });
      }
      if (element.input.type === FormInputTypeEnum.Email) {
        code += `Validators.email,`;
      }
      if (element.input.isRequired) {
        code += `Validators.required,`;
      }
      code += `
        ]
      ),
      `;
    }

    if (element.select) {
      code += `
      ${element.select.name}: new FormControl(
        ${(element.select.isMultiple) ? `[]` : `null`},
        [
      `;
      // VALIDATORS
      if (element.select.validators) {
        element.select.validators.forEach((validator) => {
          code += `Validators.${validator},`;
        });
      }
      if (element.select.type === FormInputTypeEnum.Email) {
        code += `Validators.email,`;
      }
      if (element.select.isRequired) {
        code += `Validators.required,`;
      }
      code += `
        ]
      ),
      `;
    }

    if (element.autocomplete) {
      code += `
      ${element.autocomplete.name}: new FormControl(
        ${(element.autocomplete.isMultiple) ? `[]` : `{value: null}`},
        [
      `;
      // VALIDATORS
      if (element.autocomplete.validators) {
        element.autocomplete.validators.forEach((validator) => {
          code += `Validators.${validator},`;
        });
      }
      if (element.autocomplete.type === FormInputTypeEnum.Email) {
        code += `Validators.email,`;
      }
      if (element.autocomplete.isRequired) {
        code += `Validators.required,`;
      }
      code += `
        ]
      ),
      `;
    }

    if (element.checkbox) {
      code += `
      ${element.checkbox.name}: new FormControl(
        {
          value: null, 
          ${element.checkbox.isDisabled ? "disabled: true, " : ""}
        },
        [
      `;
      // VALIDATORS
      if (element.checkbox.validators) {
        element.checkbox.validators.forEach((validator) => {
          code += `Validators.${validator},`;
        });
      }

      if (element.checkbox.isRequired) {
        code += `Validators.required,`;
      }
      code += `
        ]
      ),
      `;
    }

    if (element.radio) {
      code += `
      ${element.radio.name}: new FormControl(
        {
          value: null, 
          ${element.radio.isDisabled ? "disabled: true, " : ""}
        },
        [
      `;
      // VALIDATORS
      if (element.radio.validators) {
        element.radio.validators.forEach((validator) => {
          code += `Validators.${validator},`;
        });
      }

      if (element.radio.isRequired) {
        code += `Validators.required,`;
      }
      code += `
        ]
      ),
      `;
    }

    if (element.slide) {
      code += `
        ${element.slide.name}: new FormControl(
          false,
          []
        ),
        `;
    }

    if (element.array) {
      code += `
      ${element.array.id}: new FormArray([]),
      `;
    }

    if (element.tabs) {
      element.tabs.forEach((form) => {
        code += setFormBuilderByElements(form.elements);
      });
    }
  });

  return code;
};

export {
  setFormBuilderProperty,
  setFormArrayBuilderByElementsProperty,
  setFormBuilderByElements,
};
