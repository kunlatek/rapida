import {
  ArrayInterface,
  FormElementInterface
} from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setArrayLayer } from "../../../core/array";
import { ArrayFeaturesInterface } from "./interfaces";
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

  setArrayLayer(object.form!.elements);

  _arrayLayer = JSON.parse(
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
      setAllParents(parentArray);

      _allParents.forEach((parent: string, index: number) => {
        getParents += `this.${parent}.at(${TextTransformation.singularize(parent)}Index).`;
        getParentsIndexes += `${TextTransformation.singularize(parent)}Index: number${(index < (_allParents.length - 1)) ? ", " : ""}`;
        getParentsControl += `"${parent}", ${TextTransformation.singularize(parent)}Index${(index < (_allParents.length - 1)) ? ", " : ""}`;
      });
    }
  }

  if (element.autocomplete.isMultiple) {
    code += `
    add${TextTransformation.pascalfy(
      element.autocomplete.name
    )}(${(getParentsIndexes && (getParentsIndexes !== "")) ? getParentsIndexes : ""}${(parentArray && array) ? `, ${TextTransformation.singularize(array.id)}Index: number` : ``}${(getParentsIndexes && (getParentsIndexes !== "")) ? ", " : ""}event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
      
      if (value) {
        this.chosen${TextTransformation.pascalfy(
      element.autocomplete.name
    )}View.push(value);
      }
      event.chipInput!.clear();
      this.${object.form?.id}Form.
      ${array
        ? `get([${getParentsControl}${(getParentsControl && (getParentsControl !== "")) ? `,` : ``}${(parentArray && array) ? `"${array.id}", ${TextTransformation.singularize(array.id)}Index, ` : ``}"${element.autocomplete.name}"])?.setValue(null);`
        : `get("${element.autocomplete.name}")?.setValue(null);`
      }
    };

    remove${TextTransformation.pascalfy(
        element.autocomplete.name
      )}(${(getParentsIndexes && (getParentsIndexes !== "")) ? getParentsIndexes : ""}${(parentArray && array) ? `, ${TextTransformation.singularize(array.id)}Index: number` : ``}${(getParentsControl && (getParentsControl !== "")) ? ", " : ""}element: string): void {
      const index = this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}View.indexOf(element);
  
      if (index >= 0) {
        this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}View.splice(index, 1);
        this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}Value.splice(index, 1);
      
        this.${object.form?.id}Form.
        ${array
        ? `get([${getParentsControl}${(getParentsControl && (getParentsControl !== "")) ? `,` : ``}${(parentArray && array) ? `"${array.id}", ${TextTransformation.singularize(array.id)}Index, ` : ``}"${element.autocomplete.name}"])?.setValue(this.chosen${TextTransformation.pascalfy(
          element.autocomplete.name
        )}Value);`
        : `get("${element.autocomplete.name}")?.setValue(this.chosen${TextTransformation.pascalfy(
          element.autocomplete.name
        )}Value);`
      }
      }
    };
    
    selected${TextTransformation.pascalfy(
        element.autocomplete.name
      )}(${(getParentsIndexes && (getParentsIndexes !== "")) ? getParentsIndexes : ""}${(parentArray && array) ? `, ${TextTransformation.singularize(array.id)}Index: number` : ``}${(getParentsControl && (getParentsControl !== "")) ? ", " : ""}event: MatAutocompleteSelectedEvent): void {
      this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}View.push(event.option.viewValue);
      this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}Value.push(event.option.value);
      this.${element.autocomplete.name}Input.nativeElement.value = "";
      
      this.${object.form?.id}Form.
      ${array
        ? `get([${getParentsControl}${(getParentsControl && (getParentsControl !== "")) ? `,` : ``}${(parentArray && array) ? `"${array.id}", ${TextTransformation.singularize(array.id)}Index, ` : ``}"${element.autocomplete.name}"])?.setValue(this.chosen${TextTransformation.pascalfy(
          element.autocomplete.name
        )}Value);`
        : `get("${element.autocomplete.name}")?.setValue(this.chosen${TextTransformation.pascalfy(
          element.autocomplete.name
        )}Value);`
      }
    };
    `;
  }

  /**
   * Display selected option to autocomplete
   */
  code += `
  displayFnTo${TextTransformation.pascalfy(
    element.autocomplete.name
  )} = (value?: any) => {
      const treatedValue = value._id ? `;
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

  /**
   * Show options according to what is writen in input
   */
  code += `
  setFiltered${TextTransformation.pascalfy(
    element.autocomplete.name
  )} = async (${(getParentsIndexes && (getParentsIndexes !== "")) ? getParentsIndexes : ""}${(parentArray && array) ? `, ${TextTransformation.singularize(array.id)}Index: number` : ``}) => {
    try {
      ${(array && (getParentsIndexes && (getParentsIndexes !== "")))
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
      ? `get([${getParentsControl}${(getParentsControl && (getParentsControl !== "")) ? `, ` : ``}${(parentArray && array) ? `"${array.id}", ${TextTransformation.singularize(array.id)}Index, ` : ``}"${element.autocomplete.name}"])?.value`
      : `value.${element.autocomplete.name}`
    }
      .length > 0) {
        const filter = \`?filter={"or":[\${paramsToFilter.map((element: string) => {
          if(element !== "undefined") {
            return \`{"\${element}":{"like": "\${
              this.${object.form?.id}Form.
              ${array
      ? `get([${getParentsControl}${(getParentsControl && (getParentsControl !== "")) ? `,` : ``}${(parentArray && array) ? `"${array.id}", ${TextTransformation.singularize(array.id)}Index, ` : ``}"${element.autocomplete.name}"])?.value`
      : `value.${element.autocomplete.name}`
    }
            }", "options": "i"}}\`
          }
          return "";
        })}]}\`;
        
        this._${object.form?.id}Service.${element.autocomplete.name
    }SelectObjectGetAll(filter.replace("},]", "}]"))
        .then((result: any) => {
          this.filtered${TextTransformation.pascalfy(
      element.autocomplete.name
    )} = result.data.result;
          ${(array && (getParentsIndexes && (getParentsIndexes !== "")))
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
    )}(${(getParentsIndexes && (getParentsIndexes !== "")) ? getParentsIndexes?.replace(/: number/g, "") : ""}${(parentArray && array) ? `, ${TextTransformation.singularize(array.id)}Index` : ``});
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
  )} = MyPerformance.debounce((${(getParentsIndexes && (getParentsIndexes !== "")) ? getParentsIndexes : ""}${(parentArray && array) ? `, ${TextTransformation.singularize(array.id)}Index: number` : ``}) => this.setFiltered${TextTransformation.pascalfy(
    element.autocomplete.name
  )}(${(getParentsIndexes && (getParentsIndexes !== "")) ? getParentsIndexes?.replace(/: number/g, "") : ""}${(parentArray && array) ? `, ${TextTransformation.singularize(array.id)}Index` : ``}));
  `;

  return code;
};

const setAllParents = (lastParent: string) => {
  _allParents.push(lastParent);

  _arrayLayer.forEach((element: ArrayFeaturesInterface) => {
    if ((element.name === lastParent) && element.parentArray) {
      _allParents.push(element.parentArray);
      setAllParents(element.parentArray);
    }
  });
};

export { setAutocompleteMethod };
