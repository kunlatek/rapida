import { FormInputTypeEnum } from "../../../../../enums/form";
import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setFormBuilderByElements } from "../constructor-args/form-builder";
import { setArrayControls, setArrayControlsToAdd, setArrayIndexes, setArrayIndexesToAdd } from "./array";

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
  elements: Array<FormElementInterface>
): string => {
  let code = ``;
  elements.forEach(element => {    
    if (element.input?.type === FormInputTypeEnum.File) {
      code += `
      onFileSelected(event: any) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.fileName = file.name;
          const formData = new FormData();
      
          this.fileFormForm.get('${element.input.name}')?.setValue(file);
        }
      }
      `;
    }
    
    if (element.select?.optionsApi) {
      code += `
      set${TextTransformation.pascalfy(
        element.select?.name
      )}SelectObject = async () => {
        try {
          const array: any = await this._${object.form?.id}Service.${
        element.select.name
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
    }
  
    if (element.array) {
      const add = `add${TextTransformation.pascalfy(element.array.id)}`;
      const remove = `remove${TextTransformation.pascalfy(element.array.id)}`;
      const initArray = `init${TextTransformation.pascalfy(element.array.id)}`;
      const iterations = setArrayIndexes(element.array.id);
      const iterationsToAdd = setArrayIndexesToAdd(element.array.id);
      const controls = setArrayControls(element.array.id);
      const controlsToAdd = setArrayControlsToAdd(element.array.id);
      
      let formBuilderElements = ``;
      let arrayCurrentIndex;
      
      _arrayLayer?.forEach(array => {
        if (array.name === element.array?.id) {
          arrayCurrentIndex = array.indexIdentifier;
        }
      });
      
      formBuilderElements += setFormBuilderByElements(element.array.elements);
      
      code += `
      ${initArray}() { 
        return this._formBuilder.group({
          ${formBuilderElements}
        })
      };
      
      ${add}(${iterationsToAdd}) {
        const control = <FormArray>this.${object.form?.id}Form.get([${controlsToAdd}]);
        control.push(this.${initArray}());
      };
  
      get${TextTransformation.pascalfy(element.array.id)}(form: any) {
        return form.controls.${element.array.id}.controls;
      };
  
      ${remove}(${iterations}) {
        const control = <FormArray>this.${object.form?.id}Form.get([${controls}]);
        control.removeAt(${arrayCurrentIndex});
      };
      `;
  
      code += setFormMethodsByElements(object, element.array.elements);
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
      formData.append('myFile', this.${object.form?.id}Form.get('${element.input.name}')?.value);
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
      if (element.input.type === FormInputTypeEnum.Date) {
        code += `this.${object.form!.id}Form.get("${
          element.input.name
        }")?.setValue(this.${object.form!.id}Form.get("${
          element.input.name
        }")?.value.toISOString().split('T')[0]);`;
      }
    }
  });

  return code;
};

export {
  setMethod,
  setFileSubmit,
  setValueBeforeSubmit
}