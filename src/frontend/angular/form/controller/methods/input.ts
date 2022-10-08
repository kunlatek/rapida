import { FormInputTypeEnum } from "../../../../../enums/form";
import { ArrayFeaturesInterface } from "../../../../../interfaces/array";
import {
  ArrayInterface,
  FormElementInterface
} from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
require("dotenv").config();

let _allParents: Array<string> = [];
let parentArray: string | undefined;
let getParents: string = ``;
let getParentsIndexes: string = ``;
let getParentsControl: string = ``;

const setInputMethod = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
): string => {
  if (!element.input) {
    return "";
  }
  let code = "";

  let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
    process.env.ARRAY_LAYER!
  );
  parentArray = undefined;
  getParents = ``;
  getParentsIndexes = ``;
  getParentsControl = ``;

  if (array) {
    _arrayLayer?.forEach((arrayLayer: ArrayFeaturesInterface) => {
      if (arrayLayer.name === array.id) {
        parentArray = arrayLayer.parentArray;
      }
    });

    if (parentArray) {
      _allParents = [];
      setAllParents(parentArray);

      _allParents.reverse().forEach((parent: string, index: number) => {
        const singularParent: string = TextTransformation.singularize(parent);

        getParents += `this.${parent}.at(${singularParent}Index).`;
        getParentsIndexes += `${singularParent}Index: number${index < _allParents.length - 1 ? ", " : ""
          }`;
        getParentsControl += `"${parent}", ${singularParent}Index${index < _allParents.length - 1 ? ", " : ""
          }`;
      });
    }
  }

  if (element.input.type === FormInputTypeEnum.File) {
    code += selectFileToUpload(object, element, array);
    code += deleteFileToUpload(object, element, array);
  }

  if (element.input.apiRequest) {
    code += setInputRequestToFind(object, element, array);
  }

  return code;
};

const selectFileToUpload = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
): string => {
  if (!object.form || !element.input) {
    return "";
  }

  const objectId = object.form.id;
  const inputName = element.input.name;
  const inputNamePascal = TextTransformation.pascalfy(inputName);
  const arrayId = array?.id ? array.id : "";
  const arrayIdSingular = array?.id
    ? TextTransformation.singularize(arrayId)
    : "";

  let code = ``;

  code += `
    async on${inputNamePascal}FileSelected(${arrayIdSingular ? `${arrayIdSingular}: any ,` : ""}event: any) {
        if (event.target.files.length > 0) {
          for (let i = 0; i < event.target.files.length; i++) {
          ${array
      ? `
            const file = event.target.files[i];

            const ${objectId}Files = ${arrayIdSingular}
            .get('${inputName}')?.value || [];

            ${objectId}Files.push(file);

            ${arrayIdSingular}.patchValue({
              ${inputName}: ${objectId}Files
            });
          `
      : `
            const file = event.target.files[i];

            const ${objectId}Files = this.${objectId}Form.value.${inputName} || [];

            ${objectId}Files.push(file);
            
            this.${objectId}Form.get("${inputName}")?.setValue(${objectId}Files);
          `
    }
        }
      }
    }
    `;

  return code;
};

const deleteFileToUpload = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
): string => {
  if (!object.form || !element.input) {
    return "";
  }

  const objectId = object.form.id;
  const inputName = element.input.name;
  const inputNamePascal = TextTransformation.pascalfy(inputName);

  let code = ``;

  code += `
    delete${inputNamePascal}File(${array ? `value: any, ` : ``}index: number) {
        ${array
      ? `
      const files = value.value;
      files.splice(index, 1);
      value.setValue(files);
      `
      : `
      let files = this.${objectId}Form.value.${inputName};
      files.splice(index, 1);
      this.${objectId}Form.get("${inputName}")?.setValue(files);
      `
    }
    }
    `;

  return code;
};

const setInputRequestToFind = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
): string => {
  if (!object.form || !element.input) {
    return "";
  }

  const objectId = object.form.id;
  const inputName = element.input.name;
  const inputNamePascal = TextTransformation.pascalfy(inputName);
  const arrayId = array?.id ? array.id : "";
  const arrayIdSingular = array?.id
    ? TextTransformation.singularize(arrayId)
    : "";

  let code = ``;

  code += `
    set${inputNamePascal}InputRequestToFind = 
    async (
      ${getParentsIndexes}
      ${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""}
      ${array ? `${arrayIdSingular}Index: number` : ``}
    ) => {
      try {
        const array: any = await lastValueFrom(this._${objectId}Service
        .${inputName}InputRequestToFind(this.${objectId}Form.
        ${array
      ? `get([
        ${getParentsControl && getParentsControl !== ""
        ? `${getParentsControl}, `
        : ``
      }
      ${array ? `"${arrayId}", ${arrayIdSingular}Index, ` : ``
      }"${inputName}"])?.value));`
      : `value?.${inputName}));`
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

    callSet${inputNamePascal}InputRequestToFind = 
    MyPerformance.debounce((
      ${getParentsIndexes}
      ${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""}
      ${array ? `${arrayIdSingular}Index: number` : ``}
    )=> this.set${inputNamePascal}InputRequestToFind(
      ${getParentsIndexes && getParentsIndexes !== ""
      ? `${getParentsIndexes?.replace(/: number/g, "")}, `
      : ""
    }
      ${array ? `${arrayIdSingular}Index` : ``}
    ));
    `;

  return code;
};

const fillFieldsOverApiRequest = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
): string => {
  if (!object.form || !element.input) {
    return "";
  }

  const objectId = object.form.id;
  const inputName = element.input.name;
  const inputNamePascal = TextTransformation.pascalfy(inputName);
  const arrayId = array?.id ? array.id : "";
  const arrayIdSingular = array?.id
    ? TextTransformation.singularize(arrayId)
    : "";

  let code = ``;

  let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
    process.env.ARRAY_LAYER!
  );

  parentArray = undefined;
  getParents = ``;
  getParentsIndexes = ``;
  getParentsControl = ``;

  if (array) {
    _arrayLayer?.forEach((arrayLayer: ArrayFeaturesInterface) => {
      if (arrayLayer.name === array.id) {
        parentArray = arrayLayer.parentArray;
      }
    });

    if (parentArray) {
      _allParents = [];
      setAllParents(parentArray);

      _allParents.reverse().forEach((parent: string, index: number) => {
        const singularParent: string = TextTransformation.singularize(parent);

        getParents += `this.${parent}.at(${singularParent}Index).`;
        getParentsIndexes += `${singularParent}Index: number${index < _allParents.length - 1 ? ", " : ""
          }`;
        getParentsControl += `"${parent}", ${singularParent}Index${index < _allParents.length - 1 ? ", " : ""
          }`;
      });
    }
  }

  if (element.input) {
    element.input.apiRequest?.formFieldsFilledByApiResponse.forEach((e) => {
      code += `this.${objectId}Form.
      ${array
          ? `get([${getParentsControl && getParentsControl !== ""
            ? `${getParentsControl} ,`
            : ``
          }${array
            ? `"${array.id}", ${arrayIdSingular}Index, `
            : ``
          }"${e.formFieldName}"])?.`
          : `get("${e.formFieldName}")?.`
        }
      setValue(array.data.${e.propertyFromApiToFillFormField});`;
    });
  }

  return code;
};

const setAllParents = (lastParent: string) => {
  let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
    process.env.ARRAY_LAYER!
  );
  _allParents.push(lastParent);

  _arrayLayer.forEach((element: ArrayFeaturesInterface) => {
    if (element.name === lastParent && element.parentArray) {
      _allParents.push(element.parentArray);
      setAllParents(element.parentArray);
    }
  });
};

export { setInputMethod };
