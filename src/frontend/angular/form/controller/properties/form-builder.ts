import { FormInputTypeEnum } from "../../../../../enums/form";
import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";

const setFormBuilderProperty = (
  object: MainInterface
): string => {
  let code = ``;
  
  if (!object.form) {
    return code;
  }
  code += `${object.form.id}Builder = {`;
  code += setFormBuilderByElements(object.form.elements);
  code += "};";

  code += setFormArrayBuilderByElementsProperty(object.form.elements);

  return code;
}

const setFormArrayBuilderByElementsProperty = (
  formElements: Array<FormElementInterface>
): string => {
  let code = ``;
  for (let index = 0; index < formElements.length; index++) {
    const element = formElements[index];
    
    if (element.array) {
      code += `${element.array.id}Builder = { 
        ${setFormBuilderByElements(element.array.elements)}
      };`;

      code += setFormArrayBuilderByElementsProperty(element.array.elements);
    }
  
    if (element.tabs) {
      element.tabs.forEach((tab) => {
        code += setFormArrayBuilderByElementsProperty(tab.elements);
      });
    }
  }
  
  return code;
}

const setFormBuilderByElements = (
  formElements: Array<FormElementInterface>,
  isInArray: boolean = false
) => {
  let code = ``;

  formElements.forEach(element => {    
    if (element.input) {
      if (!isInArray) {        
        code += `
        ${element.input.name}:[
          {
            ${element.input.value ? `value: '${element.input.value}'` : `value: null`}
            ${element.input.isDisabled ? `, disabled: true` : `, disabled: false`}
          },
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
    }
  
    if (element.select) {
      if (!isInArray) {
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
    }
  
    if (element.autocomplete) {
      if (!isInArray) {
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
    }
  
    if (element.checkbox) {
      if (!isInArray) {
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
    }
  
    if (element.radio) {
      if (!isInArray) {
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
    }
  
    if (element.slide) {
      if (!isInArray) {
        code += `
        ${element.slide.name}:[
          false,
          []
        ],
        `;
      }
    }
  
    if (element.array) {
      code += `
      ${element.array.id}: this._formBuilder.array([]),
      `;

      code += setFormBuilderByElements(element.array.elements, true);
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
  setFormArrayBuilderByElementsProperty
};