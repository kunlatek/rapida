import { FormInputTypeEnum } from "../../../../../enums/form";
import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { setArrayLayer } from "../../template/array";
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

const setFormBuilderProperty = (
  object: MainInterface
): string => {
  let code = ``;

  if (!object.form) {
    return code;
  }

  _arrayLayer = [];

  setArrayLayer(object.form.elements);

  _arrayLayer = JSON.parse(
    process.env.ARRAY_LAYER!
  );
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
    if (!inArray) {
      if (element.input) {
        code += `
        ${element.input.name}:[
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
          code += element.input.validators.forEach((validator) => {
            return `Validators.${validator},`;
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
        ],
        `;
      }

      if (element.select) {
        code += `
        ${element.select.name}:[
          ${(element.select.isMultiple) ? `[]` : `null`},
          [
        `;
        // VALIDATORS
        if (element.select.validators) {
          code += element.select.validators.forEach((validator) => {
            return `Validators.${validator},`;
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
        ],
        `;
      }

      if (element.autocomplete) {
        code += `
        ${element.autocomplete.name}:[
          ${(element.autocomplete.isMultiple) ? `[]` : `null`},
          [
        `;
        // VALIDATORS
        if (element.autocomplete.validators) {
          code += element.autocomplete.validators.forEach((validator) => {
            return `Validators.${validator},`;
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
        ],
        `;
      }

      if (element.checkbox) {
        code += `
        ${element.checkbox.name}:[
          {
            value: null, 
            ${element.checkbox.isDisabled ? "disabled: true, " : ""}
          },
          [
        `;
        // VALIDATORS
        if (element.checkbox.validators) {
          code += element.checkbox.validators.forEach((validator) => {
            return `Validators.${validator},`;
          });
        }

        if (element.checkbox.isRequired) {
          code += `Validators.required,`;
        }
        code += `
          ]
        ],
        `;
      }

      if (element.radio) {
        code += `
        ${element.radio.name}:[
          {
            value: null, 
            ${element.radio.isDisabled ? "disabled: true, " : ""}
          },
          [
        `;
        // VALIDATORS
        if (element.radio.validators) {
          code += element.radio.validators.forEach((validator) => {
            return `Validators.${validator},`;
          });
        }

        if (element.radio.isRequired) {
          code += `Validators.required,`;
        }
        code += `
          ]
        ],
        `;
      }

      if (element.slide) {
        code += `
        ${element.slide.name}:[
          false,
          []
        ],
        `;
      }
    }

    if (element.array) {
      let inArrayLayer: any;
      for (let i = 0; i < _arrayLayer.length; i++) {
        const e = _arrayLayer[i];

        if ((e.name === inArray)) {
          inArrayLayer = e;
        }
      }

      if (!inArray && !inArrayLayer) {
        code += `
        ${element.array.id}: this._formBuilder.array([]),
        `;
      }

      code += setFormBuilderByElements(element.array.elements, element.array.id);
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
