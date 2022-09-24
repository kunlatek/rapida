import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";

const setFormSelectOptions = (
  object: MainInterface
): string => {
  let code = ``;

  if (!object.form) {
    return code;
  }

  code += setFormSelectOptionsByElements(object, object.form.elements);

  return code;
};

const setFormSelectOptionsByElements = (
  object: MainInterface,
  formElements: Array<FormElementInterface>
): string => {
  let code = ``;

  formElements.forEach(element => {
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
        code += setFormSelectOptionsByElements(object, tabs.elements);
      });
    }

    if (element.array) {
      code += setFormSelectOptionsByElements(object, element.array.elements);
    }
  });

  return code;
};

export {
  setFormSelectOptions
};
