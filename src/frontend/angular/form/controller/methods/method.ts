import { FormInputTypeEnum } from "../../../../../enums/form";
import { ArrayInterface, FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setArrayIndexes, setArrayMethod } from "./array";
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
  elements: Array<FormElementInterface>,
  array: ArrayInterface | undefined = undefined,
): string => {
  const iterations = array ? setArrayIndexes(array.id) : undefined;

  let code = ``;
  elements.forEach(element => {
    if (element.input?.type === FormInputTypeEnum.File) {
      code += `
      on${TextTransformation.capitalization(element.input.name)}FileSelected(event: any) {
        if (event.target.files.length > 0) {
          let files = this.${object.form?.id}Form.value.${element.input.name} || [];
          const file = event.target.files[0];
          files.push(file);
          this.${object.form?.id}Form.get("${element.input.name}")?.setValue(files);
        }
      }
      delete${TextTransformation.capitalization(element.input.name)}File(index: number) {
        let files = this.${object.form?.id}Form.value.image;
        files.splice(index, 1);
        this.${object.form?.id}Form.get("${element.input.name}")?.setValue(files);
      }
      `;
    }

    if (element.input?.apiRequest) {
      code += `
      set${TextTransformation.pascalfy(
        element.input.name
      )}InputRequestToFind = async (param: string) => {
        try {
          const array: any = await this._${object.form?.id}Service.${element.input.name
        }InputRequestToFind(param);
          if (array.data?.result) {
            console.log(array.data.result);
          }
        } catch (error: any) {
          const message = this._errorHandler.apiErrorMessage(
            error.error.message
          );
          this.sendErrorMessage(message);
        };
      };

      callSet${TextTransformation.pascalfy(
        element.input.name
      )}InputRequestToFind = MyPerformance.debounce((${
        iterations ? iterations : ""
      }) => this.set${TextTransformation.pascalfy(
        element.input.name
      )}InputRequestToFind(${iterations ? iterations?.replace(": any", "") : ""}));
      `;
    }

    if (element.select?.optionsApi) {
      code += `
      set${TextTransformation.pascalfy(
        element.select?.name
      )}SelectObject = async () => {
        try {
          const array: any = await this._${object.form?.id}Service.${element.select.name
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
      code += setAutocompleteMethod(object, element, array);
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
      formData.append("myFile", this.${object.form?.id}Form.get("${element.input.name}")?.value);
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
      // if (element.input.type === FormInputTypeEnum.Date) {
      //   code += `this.${object.form!.id}Form.get("${
      //     element.input.name
      //   }")?.value
      //   ? this.${object.form!.id}Form.get("${
      //     element.input.name
      //   }")?.setValue(this.${object.form!.id}Form.get("${
      //     element.input.name
      //   }")?.value.toISOString().split("T")[0])
      //   : this.${object.form!.id}Form.get("${
      //     element.input.name
      //   }");`;
      // }
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