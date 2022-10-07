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
  if (!object.form) {
    return "";
  }
  const objectId = object.form.id;
  let code = "";

  formElements.forEach(element => {
    if (element.select) {
      const selectName: string = element.select.name;
      const selectNamePascal: string = TextTransformation.pascalfy(selectName);

      if (element.select.optionsApi) {
        code += `this.set${selectNamePascal}SelectObject,`;
      }
    }

    if (element.checkbox) {
      const checkboxName: string = element.checkbox.name;
      if (element.checkbox.optionsApi) {
        const checkboxLabelField: string = element.checkbox.optionsApi.labelField;
        const checkboxValueField: string = element.checkbox.optionsApi.valueField;

        code += ` 
        await lastValueFrom(this._${objectId}Service.${checkboxName}SelectObjectGetAll())
        .then(
          (array: any) => {
            const data = array.data;
            if (array.data?.result) {
              for (let index = 0; index < array.data?.result.length; index++) {
                const object = array.data.result[index];
                this.${checkboxName}SelectObject.push({
                  label: object['${checkboxLabelField}'], 
                  value: object['${checkboxValueField}']
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
  setFormSelectOptions,
};
