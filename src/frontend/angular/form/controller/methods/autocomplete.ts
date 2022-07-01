import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";

const setAutocompleteMethod = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  let code = ``;

  if (!element.autocomplete) {
    return code;
  }

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
      this.${object.form?.id}Form.get('${
      element.autocomplete.name
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
        this.characterFormForm.get("${
          element.autocomplete.name
        }")?.setValue(this.chosen${TextTransformation.pascalfy(
      element.autocomplete.name
    )}Value);
      }
    };
    
    selected${TextTransformation.pascalfy(
      element.autocomplete.name
    )}(event: MatAutocompleteSelectedEvent): void {
      this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}View.push(event.option.viewValue);
      this.chosen${TextTransformation.pascalfy(
        element.autocomplete.name
      )}Value.push(event.option.value);
      this.${element.autocomplete.name}Input.nativeElement.value = "";
      this.${object.form?.id}Form.get('${
      element.autocomplete.name
    }')?.setValue(this.chosen${TextTransformation.pascalfy(
      element.autocomplete.name
    )}Value);
    };
    `;
  }

  code += `
  displayFnTo${TextTransformation.pascalfy(
    element.autocomplete.name
  )} = (value?: any) => {
    const otherValue = this.${
      object.form?.id
    }ToEdit?.data?.${TextTransformation.setIdToPropertyName(
    TextTransformation.singularize(element.autocomplete.optionsApi.endpoint)
  )} ? this.${
    object.form?.id
  }ToEdit.data.${TextTransformation.setIdToPropertyName(
    TextTransformation.singularize(element.autocomplete.optionsApi.endpoint)
  )} : null;
    if (value === otherValue?.${element.autocomplete.optionsApi.valueField}) {
      return otherValue.${element.autocomplete.optionsApi.labelField};
    }
    return value
      ? this.filtered${TextTransformation.pascalfy(
        element.autocomplete.name
      )}.find((_) => _.${
    element.autocomplete.optionsApi.valueField
  } === value).${element.autocomplete.optionsApi.labelField}
      : null;
  };
  setFiltered${TextTransformation.pascalfy(
    element.autocomplete.name
  )} = async () => {
    try {
      const paramsToFilter = [${element.autocomplete.optionsApi.paramsToFilter.map(
        (element) => {
          return `"${element}"`;
        }
      )}];
      if(this.${object.form?.id}Form.value.${
    element.autocomplete.name
  }.length > 0) {
        const filter = \`?filter={"or":[\${paramsToFilter.map((element: string) => {
            if(element !== "undefined") {
                return \`{"\${element}":{"like": "\${this.${
                  object.form?.id
                }Form.value.${element.autocomplete.name}}", "options": "i"}}\`
            }
            return "";
        })}]}\`;
        
        this._${object.form?.id}Service.${
    element.autocomplete.name
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
              )}();
            } else {
                const message = this._errorHandler.apiErrorMessage(err.error.message);
                this.sendErrorMessage(message);
            };
        });
      }
    } catch (error: any) {
      const message = this._errorHandler.apiErrorMessage(
        error.error.message
      );
      this.sendErrorMessage(message);
    };
};
callSetFiltered${TextTransformation.pascalfy(
    element.autocomplete.name
  )} = MyPerformance.debounce(() => this.setFiltered${TextTransformation.pascalfy(
    element.autocomplete.name
  )}());
  `;

  return code;
};

export { setAutocompleteMethod };
