import { ParamTypeEnum } from "../../../../../enums/form";
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
let getParentsIndexes: string = ``;
let getParentsControl: string = ``;

const setAutocompleteMethod = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
): string => {
  if (!element.autocomplete) {
    return ``;
  }

  let code = ``;

  let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
    process.env.ARRAY_LAYER!
  );

  parentArray = undefined;
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

        getParentsIndexes += `${singularParent}Index: number${index < _allParents.length - 1 ? ", " : ""
          }`;
        getParentsControl += `"${parent}", ${singularParent}Index${index < _allParents.length - 1 ? ", " : ""
          }`;
      });
    }
  }

  if (element.autocomplete.isMultiple) {
    code += addMultipleAutocomplete(object, element, array);
    code += removeChipFromMultipleAutocomplete(object, element, array);
    code += selectAsChipFromMultipleAutocomplete(object, element, array);
    code += setMultipleAutocompleteToEdit(object, element, array);
  }

  if (!element.autocomplete.isMultiple) {
    code += displayNoMultipleAutocomplete(object, element, array);
  }

  code += filterAutocompleteOption(object, element, array);

  return code;
};

const setMultipleAutocompleteToEdit = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
) => {
  if (!element.autocomplete) {
    return;
  }
  const autocompleteName = element.autocomplete.name;
  const autocompleteNamePascal = TextTransformation.pascalfy(autocompleteName);
  const labelField = element.autocomplete.optionsApi.labelField;
  const valueField = element.autocomplete.optionsApi.valueField;

  let code = ``;

  if (!array) {
    if (Array.isArray(labelField)) {
      code += `
        set${autocompleteNamePascal}ToEdit = () => {
          this.${object.form?.id}ToEdit?.data?.${autocompleteName}.map((element: any) => {
          this.chosen${autocompleteNamePascal}View.push(`;
      labelField.forEach((labelFieldElement: any, index: number) => {
        code += `element.${labelFieldElement}${index + 1 < labelField.length ? `,` : ``
          }`;
      });
      code += `
      );
      this.chosen${autocompleteNamePascal}Value.push(element});
          });
        }
        `;
    }

    if (!Array.isArray(labelField)) {
      code += `
        set${autocompleteNamePascal}ToEdit = () => {
          this.${object.form?.id}ToEdit?.data?.${autocompleteName}.map((element: any) => {
            this.chosen${autocompleteNamePascal}View
            .push(element.${labelField});
            
            this.chosen${autocompleteNamePascal}Value
            .push(element.${valueField});
          });
        }
        `;
    }
  }

  if (array) {
    if (Array.isArray(labelField)) {
      code += `
        set${autocompleteNamePascal}ToEdit = () => {
          
        }
        `;
    }

    if (!Array.isArray(labelField)) {
      code += `
        set${autocompleteNamePascal}ToEdit = () => {
          
        }
        `;
    }
  }

  return code;
};

const addMultipleAutocomplete = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
) => {
  if (!element.autocomplete) {
    return;
  }
  const autocompleteName = element.autocomplete.name;
  const autocompleteNamePascal = TextTransformation.pascalfy(autocompleteName);
  const arrayId = array?.id ? array.id : "";
  const arrayIdSingular = array?.id
    ? TextTransformation.singularize(arrayId)
    : "";

  let code = ``;

  code += `
    get${autocompleteNamePascal}(
      ${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""}
      ${array ? `${arrayIdSingular}Index: number, ` : ``
    }) {
      try {
        return this.chosen${autocompleteNamePascal}View${array ? `[${getParentsIndexes && getParentsIndexes !== "" ? `${getParentsIndexes.replace(/: number/g, "][")}` : ""}${arrayIdSingular}Index]` : ``};
      } catch (e) {
        ${getParentsIndexes && getParentsIndexes !== "" ?
      `${getParentsIndexes}${arrayIdSingular}Index`.split(': number').reduce((prev, current, index) => {
        const lastIndex = index > 0 ? `${getParentsIndexes}${arrayIdSingular}Index`.split(': number')[index - 1] : ``;
        const indexesCode = prev.indexesCode += (index > 0 ? `[${lastIndex}]` : '');
        const code = prev.code += `
                  if (this.chosen${autocompleteNamePascal}View${indexesCode}.length <= ${current}) this.chosen${autocompleteNamePascal}View.push(
                    ${'['.repeat(getParentsIndexes.split(': number').length - index)}${']'.repeat(getParentsIndexes.split(': number').length - index)}
                  )`;
        return { indexesCode, code, };
      }, { code: ``, indexesCode: `` }).code
      : ``
    }
        
        return this.chosen${autocompleteNamePascal}View${array ? `[${getParentsIndexes ? `${getParentsIndexes.replace(/: number/g, "][")}` : ""}${arrayIdSingular}Index]` : ``};
      }
    };

    add${autocompleteNamePascal}(${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""
    }${array ? `${arrayIdSingular}Index: number, ` : ``
    }event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
      
      if (value) {
        this.chosen${autocompleteNamePascal}View${array
      ? `[${getParentsIndexes && getParentsIndexes !== ""
        ? `${getParentsIndexes.replace(/: number/g, "][")}`
        : ""
      }${arrayIdSingular}Index]`
      : ``
    }.push(value);
      }
      event.chipInput!.clear();
      this.${object.form?.id}Form.
      ${array
      ? `get([${getParentsControl && getParentsControl !== ""
        ? `${getParentsControl}, `
        : ``
      }${array ? `"${array.id}", ${arrayIdSingular}Index, ` : ``}"${element.autocomplete.name
      }"])?.setValue(null);`
      : `get('${element.autocomplete.name}}')?.setValue(null);`
    }
    };`;

  return code;
};

const removeChipFromMultipleAutocomplete = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
) => {
  if (!element.autocomplete) {
    return;
  }
  const autocompleteName = element.autocomplete.name;
  const autocompleteNamePascal = TextTransformation.pascalfy(autocompleteName);
  const arrayId = array?.id ? array.id : "";
  const arrayIdSingular = array?.id
    ? TextTransformation.singularize(arrayId)
    : "";

  let code = ``;

  code += `
    remove${autocompleteNamePascal}(${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""
    }${array ? `${arrayIdSingular}Index: number, ` : ``}element: string): void {
      const index = this.chosen${autocompleteNamePascal}View
      ${getParentsIndexes && getParentsIndexes !== ""
      ? `[${getParentsIndexes.replace(/: number/g, "][")}]`.replace(
        "[]",
        ""
      )
      : ""
    }
      ${array ? `[${arrayIdSingular}Index]` : ``}.indexOf(element);
  
      if (index >= 0) {
        this.chosen${autocompleteNamePascal}View${getParentsIndexes && getParentsIndexes !== ""
      ? `[${getParentsIndexes.replace(/: number/g, "][")}]`.replace("[]", "")
      : ""
    }
      ${array ? `[${arrayIdSingular}Index]` : ``}.splice(index, 1);
        this.chosen${autocompleteNamePascal}Value${getParentsIndexes && getParentsIndexes !== ""
      ? `[${getParentsIndexes.replace(/: number/g, "][")}]`.replace("[]", "")
      : ""
    }
      ${array ? `[${arrayIdSingular}Index]` : ``}.splice(index, 1);

        this.${object.form?.id}Form.
        ${array
      ? `get([${getParentsControl && getParentsControl !== ""
        ? `${getParentsControl} ,`
        : ``
      }${parentArray && array
        ? `"${array.id}", ${arrayIdSingular}Index, `
        : ``
      }"${element.autocomplete.name
      }"])?.setValue(this.chosen${autocompleteNamePascal}Value[${arrayIdSingular}Index]);`
      : `get("${element.autocomplete.name}")?.setValue(this.chosen${autocompleteNamePascal}Value);`
    }
      }
    };`;

  code.replace(/[]/g, "");

  return code;
};

const selectAsChipFromMultipleAutocomplete = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
) => {
  if (!element.autocomplete) {
    return;
  }
  const autocompleteName = element.autocomplete.name;
  const autocompleteNamePascal = TextTransformation.pascalfy(autocompleteName);
  const arrayId = array?.id ? array.id : "";
  const arrayIdSingular = array?.id
    ? TextTransformation.singularize(arrayId)
    : "";

  let code = ``;

  const matrixLayers = getParentsIndexes
    .split(": number")
    .toString()
    .split(",");
  let matrixCreation: any = [];
  let layerCode = ``;

  matrixLayers.forEach((e: any, index: number) => {
    let bracketCount = matrixLayers.length - index;
    let eventOptionView = ``;
    let eventOptionValue = ``;
    let layerCodeMinusOne = ``;

    for (let index = 0; index < bracketCount; index++) {
      eventOptionValue += `[`;
    }
    eventOptionValue += `event.option.value`;
    for (let index = 0; index < bracketCount; index++) {
      eventOptionValue += `]`;
    }

    for (let index = 0; index < bracketCount; index++) {
      eventOptionView += `[`;
    }
    eventOptionView += `event.option.viewValue`;
    for (let index = 0; index < bracketCount; index++) {
      eventOptionView += `]`;
    }
    if (e !== "") {
      layerCode += `[${e}]`;
    }
    layerCodeMinusOne =
      index + 1 === matrixLayers.length
        ? `[${matrixLayers[0]}]`.replace("[]", "")
        : layerCode.replace(`[${e}]`, "").replace("[]", "");
    let matrixCode = `
        if (!this.chosen${autocompleteNamePascal}View${layerCode}${array && index + 1 === matrixLayers.length
        ? `[${arrayIdSingular}Index]`
        : ``
      }) {
          this.chosen${autocompleteNamePascal}View${layerCodeMinusOne}
          .push(${eventOptionView});
          this.chosen${autocompleteNamePascal}Value${layerCodeMinusOne}
          .push(${eventOptionValue});
        }
      `;

    matrixCreation.push(matrixCode);
  });

  code += `
    selected${autocompleteNamePascal}(${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""
    }${array ? `${arrayIdSingular}Index: number, ` : ``
    }event: MatAutocompleteSelectedEvent): void {
    `;

  if (array) {
    code += `
      if (this.chosen${autocompleteNamePascal}View[${getParentsIndexes && getParentsIndexes !== ""
        ? `${getParentsIndexes.replace(/: number/g, "][")}`
        : ""
      }${arrayIdSingular}Index]) {
        this.chosen${autocompleteNamePascal}View[${getParentsIndexes && getParentsIndexes !== ""
        ? `${getParentsIndexes.replace(/: number/g, "][")}`
        : ""
      }${arrayIdSingular}Index].push(event.option.viewValue);
      this.chosen${autocompleteNamePascal}Value[${getParentsIndexes && getParentsIndexes !== ""
        ? `${getParentsIndexes.replace(/: number/g, "][")}`
        : ""
      }${arrayIdSingular}Index].push(event.option.value);
        }`;
    if (matrixCreation.length > 0) {
      matrixCreation.forEach((m: any) => {
        code += m;
      });
      code += `


      this.${object.form?.id}Form.get([${getParentsControl && getParentsControl !== ""
          ? `${getParentsControl} ,`
          : ``
        }${array ? `"${array.id}", ${arrayIdSingular}Index, ` : ``}"${element.autocomplete.name
        }"])?.setValue(this.chosen${autocompleteNamePascal}Value
          [
            ${getParentsIndexes && getParentsIndexes !== ""
          ? `${getParentsIndexes.replace(/: number/g, "][")}`
          : ""
        }
        ${arrayIdSingular}Index
      ]);
        `;
    }
  }

  if (!array) {
    code += `
      this.chosen${autocompleteNamePascal}View.push(event.option.viewValue);
      this.chosen${autocompleteNamePascal}Value.push(event.option.value);

      this.${object.form?.id}Form.get("${element.autocomplete.name}")?.setValue(this.chosen${autocompleteNamePascal}Value);
      `;
  }
  code += `
  }
    `;

  return code;
};

const displayNoMultipleAutocomplete = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
) => {
  if (!element.autocomplete) {
    return;
  }
  const labelField = element.autocomplete.optionsApi.labelField;
  const valueField = element.autocomplete.optionsApi.valueField;
  const formFieldsFilledByApiResponse = element.autocomplete.optionsApi.formFieldsFilledByApiResponse;
  const autocompleteName = element.autocomplete.name;
  const autocompleteNamePascal = TextTransformation.pascalfy(autocompleteName);
  const labelFieldLength = labelField.length;

  let labelFieldCode = ``;
  let formFieldsFilledByApiResponseCode = ``;

  if (formFieldsFilledByApiResponse) {
    formFieldsFilledByApiResponse.map((result: any) => {
      formFieldsFilledByApiResponseCode += `const ${result.formFieldName}Value = this.filtered${autocompleteNamePascal}${array ? `[value]` : ''}[0].${result.propertyFromApiToFillFormField};
      `;
    });

    formFieldsFilledByApiResponse.map((result: any) => {
      formFieldsFilledByApiResponseCode += `
        if(${result.formFieldName}Value){
          this.${object.form?.id}Form.
          ${array
          ? `get([${getParentsControl && getParentsControl !== ""
            ? `${getParentsControl}, `
            : ``
          }${array ? `"${array.id}", value, ` : ``
          }"${result.formFieldName}"])?.setValue(${result.formFieldName}Value);`
          : `get("${result.formFieldName}").setValue(${result.formFieldName}Value);`
        }
        }
      `;
    });

  }

  if (Array.isArray(labelField)) {
    labelField.forEach((e: string, index: number) => {
      labelFieldCode += `this.filtered${autocompleteNamePascal}${array ? `[value]` : ``}[0].${e}`;
      if (labelFieldLength > index + 1) {
        labelFieldCode += ` + " - " + `;
      }
    });
  } else {
    labelFieldCode = `this.filtered${autocompleteNamePascal}${array ? `[value]` : ``}[0].${labelField}`;
  };

  let code = ``;

  code += `
    displayFnTo${autocompleteNamePascal} = (value?: any) => {
      if (this.filtered${autocompleteNamePascal}${array ? `[value]` : ``}[0]) {
        ${formFieldsFilledByApiResponseCode}      
        
        const toReturn = ${labelFieldCode}
        setTimeout(() => this.filtered${autocompleteNamePascal}${array ? `[value]` : ``} = [], 500);
        return toReturn;
      }
        
      return "";
    };
    `;

  return code;
};

const filterAutocompleteOption = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
) => {
  if (!element.autocomplete) {
    return;
  }
  const autocompleteName = element.autocomplete.name;
  const autocompleteNamePascal = TextTransformation.pascalfy(autocompleteName);
  const arrayId = array?.id ? array.id : "";
  const arrayIdSingular = array?.id
    ? TextTransformation.singularize(arrayId)
    : "";

  let code = ``;

  code += `
  setFiltered${autocompleteNamePascal} = async (${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""
    }${array ? `${arrayIdSingular}Index: number` : ``}) => {
    try {
      const paramsToFilter = [${element.autocomplete.optionsApi.paramsToFilter.map(
      (element) => {
        return `"${element}"`;
      }
    )}];
      if(this.${object.form?.id}Form.
      ${array
      ? `get([${getParentsControl && getParentsControl !== ""
        ? `${getParentsControl}, `
        : ``
      }${array ? `"${array.id}", ${arrayIdSingular}Index, ` : ``
      }"${autocompleteName}"])?.value`
      : `value.${autocompleteName}`
    }
      .length > 0) {
    
        ${array && getParentsIndexes && getParentsIndexes !== ""
      ? `this.loading${autocompleteNamePascal}[${getParentsIndexes?.split(": number")[0]
      }] = true;`
      : `this.loading${autocompleteNamePascal} = true;`
    }

        const filter =
        ${element.autocomplete.optionsApi.paramType === ParamTypeEnum.Query
      ? `\`?${element.autocomplete.optionsApi.rawQuery ? element.autocomplete.optionsApi.rawQuery : ""}filters={"$or":[\${paramsToFilter.map((element: string) => {
          if(element !== "undefined") {
            return \`{"\${element}":{"$regex": "\${
              this.${object.form?.id}Form.
              ${array
        ? `get([${getParentsControl && getParentsControl !== ""
          ? `${getParentsControl}, `
          : ``
        }${array ? `"${array.id}", ${arrayIdSingular}Index, ` : ``
        }"${autocompleteName}"])?.value`
        : `value.${autocompleteName}`
      }
            }", "$options": "i"}}\`
            
          }
          return;
        })}]}\`;`
      : `
    \`\${paramsToFilter.map((element: string) => {
      if(element !== "undefined") {
        return \`/\${this.${object.form?.id}Form.
              ${array
        ? `get([${getParentsControl && getParentsControl !== ""
          ? `${getParentsControl}, `
          : ``
        }${array ? `"${array.id}", ${arrayIdSingular}Index, ` : ``
        }"${autocompleteName}"])?.value}`
        : `value.${autocompleteName}}`
      }\`
      }
      return;
    })}\``
    }

      // const result: any = await lastValueFrom(this._${object.form?.id}Service
      const result: any = await this._${object.form?.id}Service
      .${autocompleteName}SelectObjectGetAll(filter.replace("},]", "}]"));
    
      this.filtered${autocompleteNamePascal}${array ? `[${arrayIdSingular}Index]` : ''} = result.data.result;
      ${array && getParentsIndexes && getParentsIndexes !== ""
      ? `this.loading${autocompleteNamePascal}[${getParentsIndexes?.split(": number")[0]
      }] = false;`
      : `this.loading${autocompleteNamePascal} = false;`
    }
  }
    } catch (error: any) {
      if (error.logMessage === 'jwt expired') {
              await this.refreshToken();
              this.setFiltered${autocompleteNamePascal}(${getParentsIndexes && getParentsIndexes !== ""
      ? `${getParentsIndexes?.replace(/: number/g, "")}, `
      : ""
    }${array ? `${arrayIdSingular}Index` : ``});
            } else {
                const message = this._errorHandler.apiErrorMessage(error.message);
                this.sendErrorMessage(message);
            };
    };
  };`;

  // Call to setFiltered function with debounce
  code += `
  callSetFiltered${autocompleteNamePascal} = MyPerformance.debounce((key: any, ${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""
    }${array ? `${arrayIdSingular}Index: number` : ``
    }) => {
      if (key?.code !== 'ArrowDown' && key?.code !== 'ArrowUp') {
        this.setFiltered${autocompleteNamePascal}(${getParentsIndexes && getParentsIndexes !== "" ? `${getParentsIndexes?.replace(/: number/g, "")}, ` : ""}${array ? `${arrayIdSingular}Index` : ``});
        ${element.autocomplete.isTriggerToCondition ?
      `if (key?.code === 'Enter') {
          ${(getParentsIndexes && getParentsIndexes !== "") || array ?
        `this.setConditionIn${autocompleteNamePascal}(${getParentsIndexes && getParentsIndexes !== "" ? `${getParentsIndexes?.replace(/: number/g, "")}, ` : ""}${array ? `${arrayIdSingular}Index` : ``})` :
        `this.setCondition()`
      };
        }`: ``}
      }
    });
    ${!element.autocomplete.isMultiple ?
      `autocompleteOptionValidator${autocompleteNamePascal}() {
        return (control: AbstractControl): { [key: string]: any } | null =>
            (this.filtered${autocompleteNamePascal} || []).map(el => el._id).includes(control.value) ? null : { optionInvalid: control.value };
      }`:
      `clear${autocompleteNamePascal}Input = (eventField: any) => eventField.target.value = null`}
  `;

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

const filterAutocompleteOptionOnGetData = (
  object: MainInterface,
) => {
  const elements: Array<FormElementInterface> = getAllElements(object.form!.elements);

  let code = ``;
  elements.forEach((element) => {

    if (element.autocomplete) {
      const autocompleteName = element.autocomplete.name;
      const autocompleteNamePascal = TextTransformation.pascalfy(autocompleteName);

      code += `if(this.${object.form?.id}ToEdit.data['${autocompleteName}']) this.filtered${autocompleteNamePascal} = [this.${object.form?.id}ToEdit.data['${autocompleteName}']];`;
    }
  });

  return code;
};

const getAllElements = (
  elementList: Array<FormElementInterface>,
  elementsToReturn: Array<FormElementInterface> = [],
): Array<FormElementInterface> => {

  const validTypes = [
    "checkbox",
    "radio",
    "datalist",
    "fieldset",
    "input",
    "select",
    "slide",
    "textarea",
    "text",
    "autocomplete",
    'date',

    'array',
  ];

  elementList.forEach(element => {
    const type = Object.keys(element)[0];

    if (validTypes.includes(type)) {

      elementsToReturn.push(element);

    } else if (type === "tabs") {

      element.tabs?.forEach((tab) => {
        elementsToReturn = getAllElements(tab.elements, elementsToReturn);
      });

    }

  });

  return elementsToReturn;
};

export { setAutocompleteMethod, filterAutocompleteOptionOnGetData };
