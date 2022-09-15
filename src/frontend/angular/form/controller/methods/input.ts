import { FormInputTypeEnum } from "../../../../../enums/form";
import {
  ArrayInterface,
  FormElementInterface
} from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setArrayControls, setArrayControlsToAdd, setArrayIndexes } from "./array";

const setInputMethod = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
): string => {
  let code = ``;
  if (!element.input) {
    return code;
  }

  const iterations = array ? setArrayIndexes(array.id) : undefined;
  const controls = array ? setArrayControlsToAdd(array.id) : undefined;

  if (element.input.type === FormInputTypeEnum.File) {
    code += `
    async on${TextTransformation.capitalization(
      element.input.name
    )}FileSelected(event: any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const bufferFiles = await fileListToBase64([file]);

        let files = this.${object.form?.id}Form.value.${element.input.name} || [];
    
        files.push({
          name: file.name,
          fileName: file.name,
          base64: bufferFiles[0]
        });
        this.${object.form?.id}Form.get("${element.input.name}")?.setValue(files);
      }
    }
    delete${TextTransformation.capitalization(
      element.input.name
    )}File(index: number) {
      let files = this.${object.form?.id}Form.value.${element.input.name};
      files.splice(index, 1);
      this.${object.form?.id}Form.get("${element.input.name}")?.setValue(files);
    }
    `;
  }

  if (element.input.apiRequest) {
    code += `
    set${TextTransformation.pascalfy(
      element.input.name
    )}InputRequestToFind = async (${iterations ? iterations : ""}) => {
      try {
        const array: any = await this._${object.form?.id}Service.${element.input.name
      }InputRequestToFind(this.${object.form?.id}Form.
          ${array
        ? `get([${controls}, ${iterations?.replace(/: any/g, "")}, "${element.input.name}"])?.value);`
        : `value.${element.input.name});`
      }
        if (array.data) {
          ${fillFieldsOverApiRequest(object, element, array)}
        }
      } catch (error: any) {
        const message = this._errorHandler.apiErrorMessage(
          error.message
        );
        this.sendErrorMessage(message);
      };
    };

    callSet${TextTransformation.pascalfy(
        element.input.name
      )}InputRequestToFind = MyPerformance.debounce((${iterations ? iterations : ""
      }) => this.set${TextTransformation.pascalfy(
        element.input.name
      )}InputRequestToFind(${iterations ? iterations?.replace(/: any/g, "") : ""
      }));
    `;
  }

  return code;
};

const fillFieldsOverApiRequest = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
) => {
  let code = ``;
  const controls = array ? setArrayControls(array.id) : undefined;
  const iterations = array ? setArrayIndexes(array.id) : undefined;

  if (element.input) {
    element.input.apiRequest?.formFieldsFilledByApiResponse.forEach((e) => {
      code += `this.${object.form?.id}Form.
      ${array
          ? `get([${controls}, ${iterations?.replace(/: any/g, "")}, "${e.formFieldName}"])?.`
          : `get("${e.formFieldName}")?.`
        }
      setValue(array.data.${e.propertyFromApiToFillFormField});`;
    });
  }

  return code;
};

export { setInputMethod };
