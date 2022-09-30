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
  let code = ``;

  if (!element.autocomplete) {
    return code;
  }

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

      _allParents.forEach((parent: string, index: number) => {
        getParentsIndexes += `${TextTransformation.singularize(
          parent
        )}Index: number${index < _allParents.length - 1 ? ", " : ""}`;
        getParentsControl += `"${parent}", ${TextTransformation.singularize(
          parent
        )}Index${index < _allParents.length - 1 ? ", " : ""}`;
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
  const name = element.autocomplete.name;
  const labelField = element.autocomplete.optionsApi.labelField;
  const valueField = element.autocomplete.optionsApi.valueField;

  let code = ``;

  if (!array) {
    if (Array.isArray(labelField)) {
      code += `
        set${TextTransformation.pascalfy(name)}ToEdit = () => {
          this.${object.form?.id}ToEdit?.data?.${name}.map((element: any) => {
          this.chosen${TextTransformation.pascalfy(name)}View.push(`;
      labelField.forEach((labelFieldElement: any, index: number) => {
        code += `element.${labelFieldElement}${index + 1 < labelField.length ? `,` : ``
          }`;
      });
      code += `
      );
      this.chosen${TextTransformation.pascalfy(name)}Value.push(element});
          });
        }
        `;
    }

    if (!Array.isArray(labelField)) {
      code += `
        set${TextTransformation.pascalfy(name)}ToEdit = () => {
          this.${object.form?.id}ToEdit?.data?.${name}.map((element: any) => {
            this.chosen${TextTransformation.pascalfy(name)}View
            .push(element.${labelField});
            
            this.chosen${TextTransformation.pascalfy(name)}Value
            .push(element.${valueField});
          });
        }
        `;
    }
  }

  if (array) {
    if (Array.isArray(labelField)) {
      code += `
        set${TextTransformation.pascalfy(name)}ToEdit = () => {
          
        }
        `;
    }

    if (!Array.isArray(labelField)) {
      code += `
        set${TextTransformation.pascalfy(name)}ToEdit = () => {
          
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
  let code = ``;

  if (!element.autocomplete) {
    return;
  }
  code += `
    add${TextTransformation.pascalfy(
    element.autocomplete.name
  )}(${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""
    }${array ? `${TextTransformation.singularize(array.id)}Index: number, ` : ``
    }event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
      
      if (value) {
        this.chosen${TextTransformation.pascalfy(
      element.autocomplete.name
    )}View${array
      ? `[${getParentsIndexes && getParentsIndexes !== ""
        ? `${getParentsIndexes.replace(/: number/g, "][")}`
        : ""
      }${TextTransformation.singularize(array.id)}Index]`
      : ``
    }.push(value);
      }
      event.chipInput!.clear();
      this.${object.form?.id}Form.
      ${array
      ? `get([${getParentsControl && getParentsControl !== ""
        ? `${getParentsControl}, `
        : ``
      }${array
        ? `"${array.id}", ${TextTransformation.singularize(
          array.id
        )}Index, `
        : ``
      }"${element.autocomplete.name}"])?.setValue(null);`
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
  let code = ``;

  if (!element.autocomplete) {
    return;
  }

  code += `
    remove${TextTransformation.pascalfy(
    element.autocomplete.name
  )}(${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""
    }${array ? `${TextTransformation.singularize(array.id)}Index: number, ` : ``
    }element: string): void {
      const index = this.chosen${TextTransformation.pascalfy(
      element.autocomplete.name
    )}View
      ${getParentsIndexes && getParentsIndexes !== ""
      ? `[${getParentsIndexes.replace(/: number/g, "][")}]`.replace(
        "[]",
        ""
      )
      : ""
    }
      ${array ? `[${TextTransformation.singularize(array.id)}Index]` : ``
    }.indexOf(element);
  
      if (index >= 0) {
        this.chosen${TextTransformation.pascalfy(
      element.autocomplete.name
    )}View${getParentsIndexes && getParentsIndexes !== ""
      ? `[${getParentsIndexes.replace(/: number/g, "][")}]`.replace("[]", "")
      : ""
    }
      ${array ? `[${TextTransformation.singularize(array.id)}Index]` : ``
    }.splice(index, 1);
        this.chosen${TextTransformation.pascalfy(
      element.autocomplete.name
    )}Value${getParentsIndexes && getParentsIndexes !== ""
      ? `[${getParentsIndexes.replace(/: number/g, "][")}]`.replace("[]", "")
      : ""
    }
      ${array ? `[${TextTransformation.singularize(array.id)}Index]` : ``
    }.splice(index, 1);

        this.${object.form?.id}Form.
        ${array
      ? `get([${getParentsControl && getParentsControl !== ""
        ? `${getParentsControl} ,`
        : ``
      }${parentArray && array
        ? `"${array.id}", ${TextTransformation.singularize(
          array.id
        )}Index, `
        : ``
      }"${element.autocomplete.name
      }"])?.setValue(this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}Value[${TextTransformation.singularize(array.id)}Index]);`
      : `get("${element.autocomplete.name
      }")?.setValue(this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}Value);`
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
  let code = ``;

  if (!element.autocomplete) {
    return;
  }

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
        if (!this.chosen${TextTransformation.pascalfy(
      element.autocomplete!.name
    )}View${layerCode}${array && index + 1 === matrixLayers.length
      ? `[${TextTransformation.singularize(array.id)}Index]`
      : ``
      }) {
          this.chosen${TextTransformation.pascalfy(
        element.autocomplete!.name
      )}View${layerCodeMinusOne}
          .push(${eventOptionView});
          this.chosen${TextTransformation.pascalfy(
        element.autocomplete!.name
      )}Value${layerCodeMinusOne}
          .push(${eventOptionValue});
        }
      `;

    matrixCreation.push(matrixCode);
  });

  code += `
    selected${TextTransformation.pascalfy(
    element.autocomplete.name
  )}(${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""
    }${array ? `${TextTransformation.singularize(array.id)}Index: number, ` : ``
    }event: MatAutocompleteSelectedEvent): void {
    `;

  if (array) {
    code += `
      if (this.chosen${TextTransformation.pascalfy(
      element.autocomplete.name
    )}View[${getParentsIndexes && getParentsIndexes !== ""
      ? `${getParentsIndexes.replace(/: number/g, "][")}`
      : ""
      }${TextTransformation.singularize(array.id)}Index]) {
        this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}View[${getParentsIndexes && getParentsIndexes !== ""
        ? `${getParentsIndexes.replace(/: number/g, "][")}`
        : ""
      }${TextTransformation.singularize(
        array.id
      )}Index].push(event.option.viewValue);
      this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}Value[${getParentsIndexes && getParentsIndexes !== ""
        ? `${getParentsIndexes.replace(/: number/g, "][")}`
        : ""
      }${TextTransformation.singularize(array.id)}Index].push(event.option.value);
        }`;
    if (matrixCreation.length > 0) {
      matrixCreation.forEach((m: any) => {
        code += m;
      });
      code += `


      this.${object.form?.id}Form.get([${getParentsControl && getParentsControl !== ""
          ? `${getParentsControl} ,`
          : ``
        }${array
          ? `"${array.id}", ${TextTransformation.singularize(array.id)}Index, `
          : ``
        }"${element.autocomplete.name
        }"])?.setValue(this.chosen${TextTransformation.pascalfy(
          element.autocomplete.name
        )}Value[${getParentsIndexes && getParentsIndexes !== ""
          ? `${getParentsIndexes.replace(/: number/g, "][")}`
          : ""
        }${TextTransformation.singularize(array.id)}Index]);
        `;
    }
  }

  if (!array) {
    code += `
      this.chosen${TextTransformation.pascalfy(
      element.autocomplete.name
    )}View.push(event.option.viewValue);
      this.chosen${TextTransformation.pascalfy(
      element.autocomplete.name
    )}Value.push(event.option.value);

      this.${object.form?.id}Form.get("${element.autocomplete.name
      }")?.setValue(this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}Value);
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
  const name = element.autocomplete.name;
  const labelFieldLength = labelField.length;

  let code = ``;

  code += `
    displayFnTo${TextTransformation.pascalfy(
    element.autocomplete.name
  )} = (value?: any) => {
          if (value?.${valueField}) {
            return `;
  if (Array.isArray(labelField)) {
    labelField.forEach(
      (e: string, index: number) => {
        code += `value.${e}`;
        if (labelFieldLength > index + 1) {
          code += ` + " - " + `;
        }
      }
    );
  }

  if (!Array.isArray(labelField)) {
    code += `value?.${labelField}`;
  }
  code += `} 
  if (`;

  if (Array.isArray(labelField)) {
    const labelFieldLength = labelField.length;

    labelField.forEach(
      (e: string, index: number) => {
        code += `this.filtered${TextTransformation.pascalfy(name)}.find((_) => _.${valueField} === value)?.${e}`;
        if (labelFieldLength > index + 1) {
          code += ` + " - " + `;
        }
      }
    );
  }

  if (!Array.isArray(labelField)) {
    code += `this.filtered${TextTransformation.pascalfy(
      element.autocomplete.name
    )}.find((_) => _.${element.autocomplete.optionsApi.valueField
      } === value)?.${labelField}`;
  }

  code += `){
            return `;

  if (Array.isArray(labelField)) {
    const labelFieldLength = labelField.length;
    labelField.forEach(
      (e: string, index: number) => {
        code += `this.filtered${TextTransformation.pascalfy(
          name
        )}.find((_) => _.${valueField} === value)?.${e}`;
        if (labelFieldLength > index + 1) {
          code += ` + " - " + `;
        }
      }
    );
  }

  if (!Array.isArray(labelField)) {
    code += `this.filtered${TextTransformation.pascalfy(
      element.autocomplete.name
    )}.find((_) => _.${element.autocomplete.optionsApi.valueField
      } === value)?.${labelField}`;
  }

  code += `}
        
        return "";
      };`;

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
  const name = element.autocomplete.name;
  let code = ``;

  code += `
  setFiltered${TextTransformation.pascalfy(
    name
  )} = async (${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""
    }${array ? `${TextTransformation.singularize(array.id)}Index: number` : ``
    }) => {
    try {
      ${array && getParentsIndexes && getParentsIndexes !== ""
      ? `this.loading${TextTransformation.pascalfy(name)}[${getParentsIndexes?.split(": number")[0]
      }] = true;`
      : `this.loading${TextTransformation.pascalfy(name)} = true;`
    }
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
      }${array
        ? `"${array.id}", ${TextTransformation.singularize(
          array.id
        )}Index, `
        : ``
      }"${name}"])?.value`
      : `value.${name}`
    }
      .length > 0) {
        const filter =
        ${element.autocomplete.optionsApi.paramType === ParamTypeEnum.Query
      ? `\`?filters={"$or":[\${paramsToFilter.map((element: string) => {
          if(element !== "undefined") {
            return \`{"\${element}":{"$regex": "\${
              this.${object.form?.id}Form.
              ${array
        ? `get([${getParentsControl && getParentsControl !== ""
          ? `${getParentsControl}, `
          : ``
        }${array
          ? `"${array.id}", ${TextTransformation.singularize(
            array.id
          )}Index, `
          : ``
        }"${name}"])?.value`
        : `value.${name}`
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
        }${array
          ? `"${array.id}", ${TextTransformation.singularize(
            array.id
          )}Index, `
          : ``
        }"${name}"])?.value}`
        : `value.${name}}`
      }\`
      }
      return;
    })}\``
    }
        
        this._${object.form?.id
    }Service.${name}SelectObjectGetAll(filter.replace("},]", "}]"))
        .then((result: any) => {
          this.filtered${TextTransformation.pascalfy(
      name
    )} = result.data.result;
          ${array && getParentsIndexes && getParentsIndexes !== ""
      ? `this.loading${TextTransformation.pascalfy(name)}[${getParentsIndexes?.split(": number")[0]
      }] = false;`
      : `this.loading${TextTransformation.pascalfy(name)} = false;`
    }
        })
        ${!element.autocomplete.optionsApi.externalEndpoint
      ? `.catch(async err => {
            if (err.error.logMessage === 'jwt expired') {
              await this.refreshToken();
              this.setFiltered${TextTransformation.pascalfy(name)}(${getParentsIndexes && getParentsIndexes !== ""
        ? `${getParentsIndexes?.replace(/: number/g, "")}, `
        : ""
      }${array ? `${TextTransformation.singularize(array.id)}Index` : ``
      });
            } else {
                const message = this._errorHandler.apiErrorMessage(err.error.message);
                this.sendErrorMessage(message);
            };
        });`
      : ``
    }
      }
    } catch (error: any) {
      const message = this._errorHandler.apiErrorMessage(
        error.message
      );
      this.sendErrorMessage(message);
    };
  };`;

  // Call to setFiltered function with debounce
  code += `
  callSetFiltered${TextTransformation.pascalfy(
    name
  )} = MyPerformance.debounce((${getParentsIndexes}${getParentsIndexes && getParentsIndexes !== "" ? `, ` : ""
    }${array ? `${TextTransformation.singularize(array.id)}Index: number` : ``
    }) => this.setFiltered${TextTransformation.pascalfy(name)}(${getParentsIndexes && getParentsIndexes !== ""
      ? `${getParentsIndexes?.replace(/: number/g, "")}, `
      : ""
    }${array ? `${TextTransformation.singularize(array.id)}Index` : ``}));
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

export { setAutocompleteMethod };
