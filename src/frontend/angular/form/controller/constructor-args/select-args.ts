import { ArrayFeaturesInterface } from "../../../../../interfaces/array";
import { ArrayInterface, FormElementInterface } from "../../../../../interfaces/form";
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

const setSelectToEdit = (
  object: MainInterface,
  formElements: FormElementInterface[],
  array: ArrayInterface | undefined = undefined
): string => {
  const objectId = object.form?.id;

  let code = ``;

  let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
    process.env.ARRAY_LAYER!
  );

  formElements.forEach((element: any) => {
    if (element.tabs) {
      element.tabs.forEach((tabElement: any) => {
        code += setSelectToEdit(object, tabElement.elements);
      });
    }

    if (element.array) {
      code += setSelectToEdit(object, element.array.elements, element.array.id);
    }

    if (element.select) {
      const selectName: string = element.select.name;
      const selectValueField: string = element.select.optionsApi?.valueField;

      if (element.select.optionsApi) {
        if (array) {
          code += `
          this.${objectId}ToEdit.data.${_arrayLayer[0].name}?.map((${_arrayLayer[0].name}Element: any) => {`;
          _arrayLayer.forEach((arrayLayerElement: any, index: number) => {
            const arrayLayerName = arrayLayerElement.name;
            if (index > 0) {
              code += `
              ${_arrayLayer[index - 1].name}Element.${arrayLayerName}?.map((${arrayLayerName}Element: any) => {`;
            }

            if (index + 1 === _arrayLayer.length) {
              code += `
                    ${arrayLayerName}Element.${selectName}?.map((${selectName}Element: any) => {
                      ${arrayLayerName}Element.${selectName}.push(${selectName}Element.${selectValueField});
                    })
                  `;
            }
          });

          _arrayLayer.forEach((arrayLayerElement: any, index: number) => {
            if (index > 0) {
              code += `})`;
            }
          });

          code += `})`;
        }
        code += `
        this.${objectId}ToEdit.data.${selectName} = 
        this.${objectId}ToEdit.data.${selectName}.map((element: any) => {
          return element.${selectValueField}
        });
        `;
      }
    }
  });

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
  setSelectToEdit
};
