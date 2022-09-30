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
  let code = ``;
  if (!element.input) {
    return code;
  }

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

      _allParents.forEach((parent: string, index: number) => {
        getParents += `this.${parent}.at(${TextTransformation.singularize(
          parent
        )}Index).`;
        getParentsIndexes += `${TextTransformation.singularize(
          parent
        )}Index: number${index < _allParents.length - 1 ? ", " : ""}`;
        getParentsControl += `"${parent}", ${TextTransformation.singularize(
          parent
        )}Index${index < _allParents.length - 1 ? ", " : ""}`;
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
) => {
  if (!element.input) {
    return;
  }

  let code = ``;

  code += `
    async on${TextTransformation.capitalization(
    element.input.name
  )}FileSelected(${array ? `${TextTransformation.singularize(array.id)}: any, ` : ``
    }event: any) {
        if (event.target.files.length > 0) {
          for (let i = 0; i < event.target.files.length; i++) {
          ${array
      ? `
            const file = event.target.files[i];

            const ${object.form?.id}Files = ${TextTransformation.singularize(array.id)}
            .get('${element.input.name}')?.value || [];

            ${object.form?.id}Files.push(file);

            ${TextTransformation.singularize(array.id)}.patchValue({
              ${element.input.name}: ${object.form?.id}Files
            });
          `
      : `
            const file = event.target.files[i];

            const ${object.form?.id}Files = this.${object.form?.id}Form.value.${element.input.name} || [];

            ${object.form?.id}Files.push(file);
            
            this.${object.form?.id}Form.get("${element.input.name}")?.setValue(${object.form?.id}Files);
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
) => {
  if (!element.input) {
    return;
  }

  let code = ``;

  code += `
    delete${TextTransformation.capitalization(element.input.name)}File(${array ? `value: any, ` : ``
    }index: number) {
        ${array
      ? `
      const files = value.value;
      files.splice(index, 1);
      value.setValue(files);
      `
      : `
      let files = this.${object.form?.id}Form.value.${element.input.name};
      files.splice(index, 1);
      this.${object.form?.id}Form.get("${element.input.name}")?.setValue(files);
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
) => {
  if (!element.input) {
    return;
  }

  let code = ``;

  code += `
    set${TextTransformation.pascalfy(
    element.input.name
  )}InputRequestToFind = async (${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""
    }${array ? `${TextTransformation.singularize(array.id)}Index: number` : ``
    }) => {
      try {
        const array: any = await this._${object.form?.id}Service.${element.input.name
    }InputRequestToFind(this.${object.form?.id}Form.
          ${array
      ? `get([${getParentsControl && getParentsControl !== ""
        ? `${getParentsControl}, `
        : ``
      }${array
        ? `"${array.id}", ${TextTransformation.singularize(
          array.id
        )}Index, `
        : ``
      }"${element.input.name}"])?.value);`
      : `value?.${element.input.name});`
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
    )}InputRequestToFind = MyPerformance.debounce((${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""
    }${array ? `${TextTransformation.singularize(array.id)}Index: number` : ``
    })=> this.set${TextTransformation.pascalfy(
      element.input.name
    )}InputRequestToFind(${getParentsIndexes && getParentsIndexes !== ""
      ? `${getParentsIndexes?.replace(/: number/g, "")}, `
      : ""
    }${array ? `${TextTransformation.singularize(array.id)}Index` : ``}));
    `;

  return code;
};

const fillFieldsOverApiRequest = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
) => {
  let code = ``;

  let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
    process.env.ARRAY_LAYER!
  );
  let parentArray: string | undefined;
  let getParents: string = ``;
  let getParentsIndexes: string = ``;
  let getParentsControl: string = ``;

  if (array) {
    _arrayLayer?.forEach((arrayLayer: ArrayFeaturesInterface) => {
      if (arrayLayer.name === array.id) {
        parentArray = arrayLayer.parentArray;
      }
    });

    if (parentArray) {
      _allParents = [];
      setAllParents(parentArray);

      _allParents.forEach((parent: string, index: number) => {
        getParents += `this.${parent}.at(${TextTransformation.singularize(
          parent
        )}Index).`;
        getParentsIndexes += `${TextTransformation.singularize(
          parent
        )}Index: number${index < _allParents.length - 1 ? ", " : ""}`;
        getParentsControl += `"${parent}", ${TextTransformation.singularize(
          parent
        )}Index${index < _allParents.length - 1 ? ", " : ""}`;
      });
    }
  }

  if (element.input) {
    element.input.apiRequest?.formFieldsFilledByApiResponse.forEach((e) => {
      code += `this.${object.form?.id}Form.
      ${array
          ? `get([${getParentsControl && getParentsControl !== ""
            ? `${getParentsControl} ,`
            : ``
          }${array
            ? `"${array.id}", ${TextTransformation.singularize(
              array.id
            )}Index, `
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
