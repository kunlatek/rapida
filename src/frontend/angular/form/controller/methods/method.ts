import { FormInputTypeEnum } from "../../../../../enums/form";
import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setArrayMethod } from "./array";
import { setAutocompleteMethod } from "./autocomplete";

const setMethod = (
  object: MainInterface
): string => {
  let code = ``;
  
  if (!object.form) {
    return code;
  }
  
  code += setFormMethodsByElements(object, object.form.elements);
  
  return code;
};


const setFormMethodsByElements = (
  object: MainInterface,
  elements: Array<FormElementInterface>
): string => {
  let code = ``;
  elements.forEach(element => {    
    if (element.input?.type === FormInputTypeEnum.File) {
      code += `
      onFileSelected(event: any) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.fileName = file.name;
          const formData = new FormData();
      
          this.fileFormForm.get('${element.input.name}')?.setValue(file);
        }
      }
      `;
    }
    
    if (element.select?.optionsApi) {
      code += `
      set${TextTransformation.pascalfy(
        element.select?.name
      )}SelectObject = async () => {
        try {
          const array: any = await this._${object.form?.id}Service.${
        element.select.name
      }SelectObjectGetAll();
          if (array.data?.result) {
            array.data?.result.map((object: any) => {
              this.${element.select?.name}SelectObject.push({
                label: object.name,
                value: object._id,
              });
            });
          }
        } catch (error: any) {
          const message = this._errorHandler.apiErrorMessage(
            error.error.message
          );
          this.sendErrorMessage(message);
        };
      };
      `;
    }
  
    if (element.autocomplete) {
      code += setAutocompleteMethod(object, element);
    }
  
    if (element.array) {
      code += setArrayMethod(object, element.array);
    }
  
    if (element.tabs) {
      element.tabs.forEach((form) => {
        code += setFormMethodsByElements(object, form.elements);
      });
    }
  });
  
  return code;
};

const setFileSubmit = (
  object: MainInterface
) => {
  let code = ``;

  object.form?.elements.forEach(element => {
    if (element.input?.type === FormInputTypeEnum.File) {
      code += `
      const formData = new FormData();
      formData.append('myFile', this.${object.form?.id}Form.get('${element.input.name}')?.value);
      `;
    }
  });

  return code;
};

const setValueBeforeSubmit = (
  object: MainInterface,
  elements: Array<FormElementInterface>
): string => {
  let code = ``;

  elements.forEach(element => {
    if (element.input) {
      if (element.input.type === FormInputTypeEnum.Date) {
        code += `this.${object.form!.id}Form.get("${
          element.input.name
        }")?.setValue(this.${object.form!.id}Form.get("${
          element.input.name
        }")?.value.toISOString().split('T')[0]);`;
      }
    }
  });

  return code;
};

export {
  setMethod,
  setFormMethodsByElements,
  setFileSubmit,
  setValueBeforeSubmit
}