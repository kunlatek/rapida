import {
  ArrayInterface,
  FormElementInterface
} from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setArrayControls, setArrayIndexes } from "./array";

const setAutocompleteMethod = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
): string => {
  let code = ``;

  if (!element.autocomplete) {
    return code;
  }

  const iterations = array ? setArrayIndexes(array.id) : undefined;
  const controls = array ? setArrayControls(array.id) : undefined;

  if (element.autocomplete.isMultiple) {
    code += `
    add${TextTransformation.pascalfy(
      element.autocomplete.name
    )}(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
      
      if (value) {
        this.chosen${TextTransformation.pascalfy(
      element.autocomplete.name
    )}View.push(value);
      }
      event.chipInput!.clear();
      this.${object.form?.id}Form.get('${element.autocomplete.name
      }')?.setValue(null);
    };
    remove${TextTransformation.pascalfy(
        element.autocomplete.name
      )}(element: string): void {
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
        this.${object.form?.id}Form.get("${element.autocomplete.name
      }")?.setValue(this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}Value);
      }
    };
    
    selected${TextTransformation.pascalfy(
        element.autocomplete.name
      )}(event: MatAutocompleteSelectedEvent${iterations ? ", " + iterations : ""
      }): void {
      this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}View.push(event.option.viewValue);
      this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}Value.push(event.option.value);
      this.${element.autocomplete.name}Input.nativeElement.value = "";
      
      this.${object.form?.id}Form.
      ${array
        ? `get([${controls}, ${iterations
          ?.split(",")
        [iterations.split(",").length - 1].replace(/: any/g, "")}, "${element.autocomplete.name
        }"])?.setValue(this.chosen${TextTransformation.pascalfy(
          element.autocomplete.name
        )}Value);`
        : `get('${element.autocomplete.name
        }')?.setValue(this.chosen${TextTransformation.pascalfy(
          element.autocomplete.name
        )}Value);`
      }
    };
    `;
  }

  code += `
  displayFnTo${TextTransformation.pascalfy(
    element.autocomplete.name
  )} = (value?: any) => {
      const treatedValue = value ? `;
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

  code += ` : "";
    const otherValue = this.${object.form?.id
    }ToEdit?.data?.${element.autocomplete.name.substring(
      0,
      element.autocomplete.name.length - 2
    )} ? this.${object.form?.id}ToEdit.data.${element.autocomplete.name.substring(
      0,
      element.autocomplete.name.length - 2
    )} : null;
    if (value === otherValue?.${element.autocomplete.optionsApi.valueField}) {
      return `;
  if (Array.isArray(element.autocomplete.optionsApi.labelField)) {
    const labelFieldLength = element.autocomplete.optionsApi.labelField.length;
    element.autocomplete.optionsApi.labelField.forEach(
      (e: string, index: number) => {
        code += `otherValue.${e}`;
        if (labelFieldLength > index + 1) {
          code += ` + " - " + `;
        }
      }
    );
  }

  if (!Array.isArray(element.autocomplete.optionsApi.labelField)) {
    code += `otherValue.${element.autocomplete.optionsApi.labelField};`;
  }

  code += `}
    return treatedValue;
  };

  setFiltered${TextTransformation.pascalfy(
    element.autocomplete.name
  )} = async (${iterations ? iterations : ""}) => {
    try {
      const paramsToFilter = [${element.autocomplete.optionsApi.paramsToFilter.map(
    (element) => {
      return `"${element}"`;
    }
  )}];
      if(this.${object.form?.id}Form.
      ${array
      ? `get([${controls}, ${iterations
        ?.split(",")
      [iterations.split(",").length - 1].replace(/: any/g, "")}, "${element.autocomplete.name
      }"])?.value`
      : `value.${element.autocomplete.name}`
    }
      .length > 0) {
        const filter = \`?filter={"or":[\${paramsToFilter.map((element: string) => {
          if(element !== "undefined") {
            return \`{"\${element}":{"like": "\${
              this.${object.form?.id}Form.
              ${array
      ? `get([${controls}, ${iterations
        ?.split(",")
      [iterations.split(",").length - 1].replace(
        /: any/g,
        ""
      )}, "${element.autocomplete.name}"])?.value`
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
          this.isLoading = false;
        })
        .catch(async err => {
            if (err.error.logMessage === 'jwt expired') {
              await this.refreshToken();
              this.setFiltered${TextTransformation.pascalfy(
      element.autocomplete.name
    )}(${iterations ? iterations?.replace(/: any/g, "") : ""});
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
  };
  callSetFiltered${TextTransformation.pascalfy(
      element.autocomplete.name
    )} = MyPerformance.debounce((${iterations ? iterations : ""
    }) => this.setFiltered${TextTransformation.pascalfy(
      element.autocomplete.name
    )}(${iterations ? iterations?.replace(/: any/g, "") : ""}));
  `;

  return code;
};

export { setAutocompleteMethod };
