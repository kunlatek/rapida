import { FormInputTypeEnum } from "../../../../enums/form";
import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

const setFormControllerConstructorArguments = (
  object: MainInterface
): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let _formBuilderElements: string = ``;
  let _optionsCreation: string = ``;
  let _patchArrayValues = setJsonToPatchValue(object, object.form.elements);
  
  object.form.elements.forEach((element) => {
    _formBuilderElements += setFormBuilderByFormElement(object, element);
    _optionsCreation += setOptionsCreation(object, element);
  });

  const code = `
  try {
    this._activatedRoute.params.subscribe(async (routeParams) => {
        this.${object.form.id}Id = routeParams['id'];
        this.isAddModule = !this.${object.form.id}Id;
    
        if (this.${object.form.id}Id) {
          this.${object.form.id}ToEdit = await this._${object.form.id}Service.find(this.${object.form.id}Id);
          this.${object.form.id}Form.patchValue(this.${object.form.id}ToEdit.data);
          ${_patchArrayValues}
        }
        this.checkOptionsCreation(
          [
            ${_optionsCreation}
          ],
          0
        );
    });
  } catch(error: any) {
    const message = this._errorHandler.apiErrorMessage(error.error.message);
    this.sendErrorMessage(message);
  };


  this.${object.form.id}Form = this._formBuilder.group({
    ${_formBuilderElements}
  });
  `;

  return code;
};

const setFormBuilderByFormElement = (
  object: MainInterface,
  element: FormElementInterface
) => {
  let code = ``;

  if (element.input) {
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

  if (element.array) {
    code += `
    ${element.array.id}: this._formBuilder.array([
      this.init${TextTransformation.pascalfy(element.array.id)}(),
    ]),
    `;
  }

  if (element.tabs) {
    element.tabs.forEach((form) => {
      form.elements.forEach((formElement) => {
        code += setFormBuilderByFormElement(object, formElement);
      });
    });
  }

  return code;
};

const setOptionsCreation = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  let code = ``;

  if (element.select) {
    if (element.select.optionsApi) {
      code += `this.set${TextTransformation.pascalfy(element.select.name)}SelectObject,`;
    }
  }

  if (element.checkbox) {
    if (element.checkbox.optionsApi) {
      code += ` 
      this._${object.form?.id}Service.${element.checkbox.name}SelectObjectGetAll()
      .then(
        (array: any) => {
          const data = array.data;
          if (array.data?.result) {
            for (let index = 0; index < array.data?.result.length; index++) {
              const object = array.data.result[index];
              this.${element.checkbox.name}SelectObject.push({
                label: object['${element.checkbox.optionsApi.labelField}'], 
                value: object['${element.checkbox.optionsApi.valueField}']
              });
            }
          }
        }
      );`;
    }
  }

  if (element.tabs) {
    element.tabs.forEach(tabs => {
      tabs.elements.forEach(tabElement => {
        code += setOptionsCreation(object, tabElement);
      });
    });
  }

  if (element.array) {
    element.array.elements.forEach(arrayElement => {      
      code += setOptionsCreation(object, arrayElement);
    });
  }

  return code;
}

const setJsonToPatchValue = (object: MainInterface, formElements: any, array: string | undefined = undefined): string => {
  let code = ``;

  formElements.forEach((element: any) => {
    if (element.tabs) { 
      element.tabs.forEach((tabElement: any) => {        
        code += setJsonToPatchValue(object, tabElement.elements);
      });
    }

    if (element.array) {
      code += `
      (${array ? `${array}Form` : `this.${object.form?.id}Form`}.get("${element.array.id}") as FormArray).clear();
      ${array ? `_${array}` : `this.${object.form?.id}ToEdit.data`}.${element.array.id}.forEach((_${element.array.id}: any) => {
        const ${element.array.id}Form = this.init${TextTransformation.pascalfy(element.array.id)}();
        ${element.array.id}Form.patchValue(_${element.array.id});
        (${array ? `${array}Form` : `this.${object.form?.id}Form`}.get("${element.array.id}") as FormArray).push(${element.array.id}Form);
      `;
        code += setJsonToPatchValue(object, element.array.elements, element.array.id);  
      code += `
      })
      `;
    }
  });
  
  return code;
};

export { setFormControllerConstructorArguments, setFormBuilderByFormElement };
