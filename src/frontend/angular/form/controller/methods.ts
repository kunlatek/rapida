import { ConditionEnum, FormInputTypeEnum } from "../../../../enums/form";
import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { setFormBuilderByFormElement } from "./constructor-args";

export interface ArrayFeaturesInterface {
  parentArray?: string;
  layer: number;
  arrayNumber: number;
  indexIdentifier: string;
  name: string;
}

let _arrayLayer: Array<ArrayFeaturesInterface> = [];
let _arraysInAFlow: Array<ArrayFeaturesInterface> = [];
let _hasCondition: boolean = false;
let _hasConditionInArray: boolean = false;
let _conditionMethods: Array<string>;

const setFormControllerMethods = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let _methods = ``;
  let _valueTreatmentBeforeSubmit = ``;
  let _conditionsMethods = ``;
  let _conditionsMethodsInArray = ``;
  let _fileSubmit = ``;

  _conditionMethods = [];
  _arraysInAFlow = [];
  setArrayLayer(object.form.elements);

  object.form.elements.forEach((element) => {
    verifyFormElement(element);
    _conditionsMethods += setConditions(object, element);
    _conditionsMethodsInArray += setConditionsInArray(object, element);
    _methods += setFormControllerMethodsOverFormElement(object, element);
    _fileSubmit += setFileSubmit(object, element);
    _valueTreatmentBeforeSubmit += setValueBeforeSubmit(object, element);
  });

  const code = `
  ${
    _hasCondition
      ? `setCondition = (index: number | undefined = undefined, checked: boolean = true) => {
        ${_conditionsMethods}
        ${
          _hasConditionInArray
          ? `if (typeof index === "number") { ${_conditionsMethodsInArray} }`
          : ""
        }
      }`
      : ``
  };
  ${_methods}
  ${object.form.id}Submit = async (
    ${object.form?.id}Directive: FormGroupDirective
  ) => {
      this.isLoading = true;
      ${_valueTreatmentBeforeSubmit}
      try {
        ${_fileSubmit}
        if(this.isAddModule) {
            await this._${object.form.id}Service.save(
              this.${object.form.id}Form.value
            );
        }

        if(!this.isAddModule) {
            await this._${object.form.id}Service.update(
              this.${object.form.id}Form.value,
              this.${object.form.id}Id
            );
        }
        this.redirectTo("main/${TextTransformation.kebabfy(
          object.form.id.split("Form")[0]
        )}");
        
        this.isLoading = false;
      } catch (error: any) {
        if (error.error.logMessage === 'jwt expired') {
          await this.refreshToken();
          this.${object.form.id}Submit(${object.form?.id}Directive);
        } else {
          const message = this._errorHandler.apiErrorMessage(error.error.message);
          this.isLoading = false;
          this.sendErrorMessage(message);
        }
      };
      
      this.${object.form?.id}Form.reset();
      ${object.form?.id}Directive.resetForm();
  };
  refreshToken = async () => {
      try {
        const res: any = await this._${object.form.id}Service.refreshToken();
        if (res) {
          sessionStorage.setItem('token', res?.data.authToken);
          sessionStorage.setItem('refreshToken', res?.data.authRefreshToken);
        }
      } catch (error: any) {
        const message = this._errorHandler.apiErrorMessage(error.error.message);
        this.isLoading = false;
        this.sendErrorMessage(message);
        sessionStorage.clear();
        this._router.navigate(['/']);
      };
  };
  redirectTo = (uri:string) => {
      this._router.navigateByUrl('/main', {skipLocationChange: true})
      .then(() => {
        this._router.navigate([uri]);
      });
  };
  checkOptionsCreation = async(functions: Array<Function>, index: number) => {
    const newIndex = index + 1;

    if (newIndex <= functions.length) {
      await functions[index].call(null);
      this.checkOptionsCreation(functions, newIndex);
    } else {
      this.isLoading = false;
    }
  };
  sendErrorMessage = (errorMessage: string) => {
    this._snackbar.open(errorMessage, undefined, {
      duration: 4 * 1000,
    });
  };
  `;

  return code;
};

const setArrayLayer = (
  elements: Array<FormElementInterface>,
  index: number = 0,
  parentArray: string | undefined = undefined
) => {
  const iterationsIds = ["i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];
  
  let hasArray = false;
  let arraysInThisLayer: Array<{
    id: string;
    elements: Array<FormElementInterface>;
  }> = [];

  elements.forEach(element => {
    if (element.array) {
      _arrayLayer.push(
        {
          layer: index,
          arrayNumber: _arrayLayer.length,
          indexIdentifier: iterationsIds[index],
          name: element.array.id,
          parentArray: parentArray
        }
      );

      arraysInThisLayer.push(
        {
          id: element.array.id,
          elements: element.array.elements
        }
      )

      hasArray = true;
    }

    if (element.tabs) {
      element.tabs.forEach((tab) => {
        setArrayLayer(tab.elements);
      });
    }
  });

  if (hasArray) {
    const newIndex = index + 1;
    
    arraysInThisLayer.forEach(element => {
      setArrayLayer(
        element.elements,
        newIndex,
        element.id
      );
    });
  }
};

const verifyFormElement = (element: FormElementInterface, isArray: boolean = false): void => {
  const formElements = [
    "input",
    "autocomplete",
    "button",
    "checkbox",
    "radio",
    "select",
    "slide",
  ];
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  if (element.tabs) {
    element.tabs.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        verifyFormElement(tabElement);
      });
    });
  }

  if (element.array) {
    element.array.elements.forEach((arrayElement) => {
      verifyFormElement(arrayElement, true);
    });
  }

  if (formElements.includes(type)) {
    if (value.conditions) {
      _hasCondition = true;

      if (isArray) {
        _hasConditionInArray = true;
      }
    }
  }
};

const setFormControllerMethodsOverFormElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  let code = ``;
  
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
    
    element.array.elements.forEach((arrayElement) => {
      formBuilderElements += setFormBuilderByFormElement(object, arrayElement);
    });
    
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

    element.array.elements.forEach((arrayElement) => {
      code += setFormControllerMethodsOverFormElement(object, arrayElement);
    });
  }

  if (element.tabs) {
    element.tabs.forEach((form) => {
      form.elements.forEach((formElement) => {
        code += setFormControllerMethodsOverFormElement(object, formElement);
      });
    });
  }

  return code;
};

const setArrayControls = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();
  
  arrayReversed.forEach((array, index) => {
    code += `"${array.name}"` + ((arrayReversed.length > (index + 1)) ? `, ${array.indexIdentifier},` : "");
  });

  return code;
};

const setArrayControlsToAdd = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();

  arrayReversed.forEach((array, index) => {
    code += `"${array.name}"` + ((arrayReversed.length > (index + 1)) ? `, ${array.indexIdentifier},` : "");
  });

  return code;
};

const setArrayIndexes = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  const arrayReversed = _arraysInAFlow.reverse();
  
  arrayReversed.forEach((array, index) => {
    code += array.indexIdentifier + ": any" + ((arrayReversed.length > (index + 1)) ? ", " : "");
  });

  return code;
}

const setArrayIndexesToAdd = (arrayId: string): string => {
  let code = ``;

  _arraysInAFlow = [];
  setArraysInAFlow(arrayId);
  
  _arraysInAFlow?.forEach((element: any, index: number) => {
    if (_arraysInAFlow.length > 1) {
      if (index > 0) {
        code += element.indexIdentifier + ": any,";
      }
    }    
  });

  return code;
}

const setArraysInAFlow = (arrayId: string) => { 
  _arrayLayer?.forEach(array => {
    if (array.name === arrayId) {
      if (_arraysInAFlow.indexOf(array) === -1) {
        _arraysInAFlow.push({
          indexIdentifier: array.indexIdentifier,
          arrayNumber: array.arrayNumber,
          layer: array.layer,
          name: array.name,
          parentArray: array.parentArray ? array.parentArray : undefined
        });
      }
      
      if (array.parentArray) {
        setArraysInAFlow(array.parentArray);
      }
    }
  });
}

const setValueBeforeSubmit = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  let code = ``;

  if (element.input) {
    if (element.input.type === FormInputTypeEnum.Date) {
      code += `this.${object.form!.id}Form.get("${
        element.input.name
      }")?.setValue(this.${object.form!.id}Form.get("${
        element.input.name
      }")?.value.toISOString().split('T')[0]);`;
    }
  }

  return code;
};

const setFileSubmit = (
  object: MainInterface,
  element: FormElementInterface
) => {
  let code = ``;
  if (element.input?.type === FormInputTypeEnum.File) {
    code += `
    const formData = new FormData();
    formData.append('myFile', this.${object.form?.id}Form.get('${element.input.name}')?.value);
    `;
  }
  return code;
};

const setConditions = (
  object: MainInterface,
  element: FormElementInterface,
  array: string | undefined = undefined
): string => {
  const formElements = [
    "input",
    "autocomplete",
    "button",
    "checkbox",
    "radio",
    "select",
    "slide",
    "array",
  ];
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];
  let code = ``;
  
  if (formElements.includes(type)) {
    if (value.conditions) {
      if (value.conditions.type === ConditionEnum.Form) {
        if (!_conditionMethods.includes(value.conditions.id)) {
          if (!array) {
            code += `this.${value.conditions.id}FormCondition = (`;
            
            value.conditions.elements.forEach((condition: any, index: number) => {              
              if (index > 0) {
                code += `${
                  condition.logicalOperator
                    ? ` ${condition.logicalOperator} `
                    : ` && `
                }`;
              }
              code += `(this.${object.form!.id}Form.get("${
                condition.key
              }")?.value ${
                condition.comparisonOperator
                  ? ` ${condition.comparisonOperator} `
                  : ` === `
              } "${condition.value}")`;
            });
            code += `);`;
          }
        }
      }

      if (value.conditions.type === ConditionEnum.Code) {
        if (!_conditionMethods.includes(value.conditions.id)) {
          code += `this.${value.conditions.id}CodeCondition = (`;

          value.conditions.elements.forEach((condition: any, index: number) => {
            if (!array) {              
              if (index > 0) {
                code += `${
                  condition.logicalOperator
                    ? ` ${condition.logicalOperator} `
                    : ` && `
                }`;
              }
              code += `(this.${condition.key} ${
                condition.comparisonOperator
                  ? ` ${condition.comparisonOperator} `
                  : ` === `
              } "${condition.value}");`;
            }
            code += `)`;
            
            _conditionMethods.push(value.conditions.id);
          });
        }
      }
    }
  }

  if (element.tabs) {
    element.tabs.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        code += setConditions(object, tabElement);
      });
    });
  }

  if (element.array) {
    element.array.elements.forEach((arrayElement) => {
      code += setConditions(object, arrayElement, element.array?.id);
    });
  }

  return code;
};

const setConditionsInArray = (
  object: MainInterface,
  element: FormElementInterface,
  array: string | undefined = undefined
): string => {
  const formElements = [
    "input",
    "autocomplete",
    "button",
    "checkbox",
    "radio",
    "select",
    "slide",
    "array",
  ];
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];
  let code = ``;
  if (formElements.includes(type)) {
    if (value.conditions) {
      if (value.conditions.type === ConditionEnum.Form) {
        if (!_conditionMethods.includes(value.conditions.id)) {
          if (array) {
            code += `this.${value.conditions.id}FormCondition[index] = (`;

            value.conditions.elements.forEach((condition: any, index: number) => {
              if (index > 0) {
                code += `${
                  condition.logicalOperator
                    ? ` ${condition.logicalOperator} `
                    : ` && `
                }`;
              }
              code += `(this.${object.form!.id}Form.get("${
                array
              }")?.value[index]?.${condition.key} ${
                condition.comparisonOperator
                  ? ` ${condition.comparisonOperator} `
                  : ` === `
              } "${condition.value}")`;
            });

            code += `);`;

            _conditionMethods.push(value.conditions.id);
          }
        }
      }

    }
  }

  if (element.tabs) {
    element.tabs.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        code += setConditionsInArray(object, tabElement);
      });
    });
  }

  if (element.array) {
    element.array.elements.forEach((arrayElement) => {
      code += setConditionsInArray(object, arrayElement, element.array?.id);
    });
  }

  return code;
};

export { setFormControllerMethods, setFormControllerMethodsOverFormElement };
