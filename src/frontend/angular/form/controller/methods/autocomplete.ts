import { ArrayFeaturesInterface } from "../../../../../interfaces/array";
import {
  ArrayInterface,
  FormElementInterface
} from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
require("dotenv").config();

let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
  process.env.ARRAY_LAYER!
);
let _allParents: Array<string> = [];

const setAutocompleteMethod = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
): string => {
  let code = ``;

  if (!element.autocomplete) {
    return code;
  }

  let parentArray: string | undefined;
  let getParentsIndexes: string = ``;
  let getParentsControl: string = ``;

  if (array) {
    _arrayLayer?.forEach((arrayLayer: ArrayFeaturesInterface) => {
      if (arrayLayer.name === array.id) {
        parentArray = arrayLayer.parentArray;
      }
    });

    if (parentArray) {
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
    code += `
    add${TextTransformation.pascalfy(
      element.autocomplete.name
    )}(${getParentsIndexes && getParentsIndexes !== ""
      ? `${getParentsIndexes}, `
      : ""
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
        }${TextTransformation.singularize(
          array.id
        )}Index]`
        : ``}.push(value);
      }
      event.chipInput!.clear();
      this.${object.form?.id}Form.
      ${array
        ? `get([${getParentsControl && getParentsControl !== "" ? `${getParentsControl}, ` : ``
        }${array
          ? `"${array.id}", ${TextTransformation.singularize(
            array.id
          )}Index, `
          : ``
        }"${element.autocomplete.name
        }"])?.setValue(null);`
        : `get('${element.autocomplete.name}}')?.setValue(null);`
      }
    };`;
    /**
     * Remove chip from multiple autocomplete
     */
    code += `
    remove${TextTransformation.pascalfy(element.autocomplete.name)}(${getParentsIndexes && getParentsIndexes !== ""
        ? `${getParentsIndexes}, `
        : ""
      }${array ? `${TextTransformation.singularize(array.id)}Index: number, ` : ``
      }element: string): void {
      const index = this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}View
      ${getParentsIndexes && getParentsIndexes !== ""
        ? (`[${getParentsIndexes.replace(/: number/g, "][")}]`).replace("[]", "")
        : ""
      }
      ${array ? `[${TextTransformation.singularize(array.id)}Index]` : ``
      }.indexOf(element);
  
      if (index >= 0) {
        this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}View${getParentsIndexes && getParentsIndexes !== ""
        ? (`[${getParentsIndexes.replace(/: number/g, "][")}]`).replace("[]", "")
        : ""
      }
      ${array ? `[${TextTransformation.singularize(array.id)}Index]` : ``
      }.splice(index, 1);
        this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}Value${getParentsIndexes && getParentsIndexes !== ""
        ? (`[${getParentsIndexes.replace(/: number/g, "][")}]`).replace("[]", "")
        : ""
      }
      ${array ? `[${TextTransformation.singularize(array.id)}Index]` : ``
      }.splice(index, 1);

        this.${object.form?.id}Form.
        ${array
        ? `get([${getParentsControl && getParentsControl !== "" ? `${getParentsControl} ,` : ``
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
    /**
     * Selected as chip in multiple autocomplete options
     */
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
      layerCodeMinusOne = ((index + 1) === matrixLayers.length) ? `[${matrixLayers[0]}]`.replace("[]", "") : layerCode.replace(`[${e}]`, "").replace("[]", "");
      let matrixCode = `
        if (!this.chosen${TextTransformation.pascalfy(
        element.autocomplete!.name
      )}View${layerCode}${array && ((index + 1) === matrixLayers.length) ? `[${TextTransformation.singularize(array.id)}Index]` : ``}) {
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
    selected${TextTransformation.pascalfy(element.autocomplete.name)}(${getParentsIndexes && getParentsIndexes !== ""
        ? `${getParentsIndexes}, `
        : ""
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
        }${TextTransformation.singularize(
          array.id
        )}Index].push(event.option.value);
        }`;
      if (matrixCreation.length > 0) {
        matrixCreation.forEach((m: any) => {
          code += m;
        });
        code += `


      this.${object.form?.id}Form.get([${getParentsControl && getParentsControl !== "" ? `${getParentsControl} ,` : ``
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
  }

  if (!element.autocomplete.isMultiple) {
    /**
   * Display selected option to autocomplete
   */
    code += `
    displayFnTo${TextTransformation.pascalfy(
      element.autocomplete.name
    )} = (value?: any) => {
        const treatedValue = value?._id ? `;
    if (Array.isArray(element.autocomplete.optionsApi.labelField)) {
      const labelFieldLength = element.autocomplete.optionsApi.labelField.length;
      element.autocomplete.optionsApi.labelField.forEach(
        (e: string, index: number) => {
          code += `value.${e}`;
          if (labelFieldLength > index + 1) {
            code += ` + " - " + `;
          }
        }
      );
    }

    if (!Array.isArray(element.autocomplete.optionsApi.labelField)) {
      code += `value?.${element.autocomplete.optionsApi.labelField}`;
    }
    code += ` : `;

    if (Array.isArray(element.autocomplete.optionsApi.labelField)) {
      const labelFieldLength = element.autocomplete.optionsApi.labelField.length;
      const name = element.autocomplete.name;
      const valueField = element.autocomplete.optionsApi.valueField;
      element.autocomplete.optionsApi.labelField.forEach(
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

    if (!Array.isArray(element.autocomplete.optionsApi.labelField)) {
      code += `this.filtered${TextTransformation.pascalfy(
        element.autocomplete.name
      )}.find((_) => _.${element.autocomplete.optionsApi.valueField
        } === value)?.${element.autocomplete.optionsApi.labelField}`;
    }

    code += `;`;

    code += `
      return treatedValue;
    };`;
  }

  /**
   * Show options according to what is writen in input
   */
  code += `
  setFiltered${TextTransformation.pascalfy(
    element.autocomplete.name
  )} = async (${getParentsIndexes && getParentsIndexes !== ""
    ? `${getParentsIndexes}, `
    : ""
    }${array ? `${TextTransformation.singularize(array.id)}Index: number` : ``
    }) => {
    try {
      ${array && getParentsIndexes && getParentsIndexes !== ""
      ? `this.loading${TextTransformation.pascalfy(
        element.autocomplete.name
      )}[${getParentsIndexes?.split(": number")[0]}] = true;`
      : `this.loading${TextTransformation.pascalfy(
        element.autocomplete.name
      )} = true;`
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
      }"${element.autocomplete.name}"])?.value`
      : `value.${element.autocomplete.name}`
    }
      .length > 0) {
        const filter = \`?filters={"$or":[\${paramsToFilter.map((element: string) => {
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
      }"${element.autocomplete.name}"])?.value`
      : `value.${element.autocomplete.name}`
    }
            }", "$options": "i"}}\`
          }
          return;
        })}]}\`;
        
        this._${object.form?.id}Service.${element.autocomplete.name
    }SelectObjectGetAll(filter.replace("},]", "}]"))
        .then((result: any) => {
          this.filtered${TextTransformation.pascalfy(
      element.autocomplete.name
    )} = result.data.result;
          ${array && getParentsIndexes && getParentsIndexes !== ""
      ? `this.loading${TextTransformation.pascalfy(
        element.autocomplete.name
      )}[${getParentsIndexes?.split(": number")[0]}] = false;`
      : `this.loading${TextTransformation.pascalfy(
        element.autocomplete.name
      )} = false;`
    }
        })
        .catch(async err => {
            if (err.error.logMessage === 'jwt expired') {
              await this.refreshToken();
              this.setFiltered${TextTransformation.pascalfy(
      element.autocomplete.name
    )}(${getParentsIndexes && getParentsIndexes !== ""
      ? `${getParentsIndexes?.replace(/: number/g, "")}, `
      : ""
    }${array ? `${TextTransformation.singularize(array.id)}Index` : ``});
            } else {
                const message = this._errorHandler.apiErrorMessage(err.error.message);
                this.sendErrorMessage(message);
            };
        });
      }
    } catch (error: any) {
      const message = this._errorHandler.apiErrorMessage(
        error.message
      );
      this.sendErrorMessage(message);
    };
  };`;

  /**
   * Call with debounce to setFiltered function
   */
  code += `
  callSetFiltered${TextTransformation.pascalfy(
    element.autocomplete.name
  )} = MyPerformance.debounce((${getParentsIndexes && getParentsIndexes !== ""
    ? `${getParentsIndexes}, `
    : ""
    }${array ? `${TextTransformation.singularize(array.id)}Index: number` : ``
    }) => this.setFiltered${TextTransformation.pascalfy(
      element.autocomplete.name
    )}(${getParentsIndexes && getParentsIndexes !== ""
      ? `${getParentsIndexes?.replace(/: number/g, "")}, `
      : ""
    }${array ? `${TextTransformation.singularize(array.id)}Index` : ``}));
  `;

  return code;
};

const setAllParents = (lastParent: string) => {
  _allParents.push(lastParent);

  _arrayLayer.forEach((element: ArrayFeaturesInterface) => {
    if (element.name === lastParent && element.parentArray) {
      _allParents.push(element.parentArray);
      setAllParents(element.parentArray);
    }
  });
};

export { setAutocompleteMethod };
