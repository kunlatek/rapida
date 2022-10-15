import {
  ArrayInterface,
  FormElementInterface
} from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setArray } from "../../../core/array";
import { setArrayOfAutocompleteMultipleElements, setArrayOfElementsToCreateArray, setArraysToEdit } from "./array";
import {
  setCondition,
  setConditionOverEdition,
  setConditionsInArray
} from "./condition";
import { setMethod } from "./method";

let _hasCondition: boolean = false;
let _hasConditionInArray: boolean = false;
let _arrays: Array<ArrayInterface> = [];

let _arraysToEdit: string = ``;
let _treatmentBeforeSubmitting = ``;

const setFormControllerMethods = (object: MainInterface): string => {
  if (!object.form) {
    return "";
  }
  const objectId = object.form.id;
  _treatmentBeforeSubmitting = "";
  _arrays = [];

  setArray(object);

  let _conditionsMethods = setCondition(object, object.form.elements);
  let _conditionsMethodsOverEdition = setConditionOverEdition(
    object,
    object.form.elements
  );
  let _methods = setMethod(object);

  object.form.elements.forEach((element) => {
    verifyFormElement(object, element);
  });

  _arraysToEdit = setArraysToEdit(_arrays);

  const code = `
  ${_arrays.length > 0
      ?
      `
      ngOnChanges() {
        const modulePermissionToCheck: any =
        this.permissionsToCheck.find((item: any) => {
          return item.module.name === this._moduleRelated
        })
        this.updateOnePermission = 
        modulePermissionToCheck
        .permissionActions.filter((item: any) => {
          return item.name === "updateOne"
        }).length > 0;
        this.createOnePermission = 
        modulePermissionToCheck
        .permissionActions.filter((item: any) => {
          return item.name === "createOne"
        }).length > 0;
      }
      private _createAllArray(data: any) {
        
        const araryOfElementsToCreateArray: any[] = [
          ${setArrayOfElementsToCreateArray(_arrays)}
        ];
        
        ${setArrayOfAutocompleteMultipleElements(object.form.elements)}

        const addNewFormArrayItem = (
          functionName: string,
          array: any[],
          arrayOfFields: any[],
        ) => {
          
          araryOfMultipleAutocompleFields
            .filter(el => el.element === functionName)
            .forEach(el => {
              this._setAutocompleteAttrToEdit(
                arrayOfFields,
                el.view,
                el.value,
                array, el.attrs[0], el.attrs[1],
              )
            })

          if (
            araryOfElementsToCreateArray
              .map((el) => el.element)
              .includes(functionName)
          ) {
            for (
              let elementIndex = 0;
              elementIndex < array.length;
              elementIndex++
            ) {
              const getFormGroup = araryOfElementsToCreateArray.find(
                (el) => el.element === functionName
              ).getFormGroup;
              (this.${objectId}Form.get([...arrayOfFields]) as FormArray).push(getFormGroup());

              const childData: any = array[elementIndex];
              Object.keys(childData).forEach((item) => {
                if (Array.isArray(childData[item]) && childData[item].length) {
                  addNewFormArrayItem(item, childData[item], [...arrayOfFields, elementIndex, item]/*, elementIndex*/);
                }
              });
            }
          }
        };

        Object.keys(data).forEach((item) => {
          
          if (araryOfElementsToCreateArray.map(el => el.element).includes(item)) {
            while ((this.${objectId}Form.get([item]) as FormArray).length !== 0) {
              (this.${objectId}Form.get([item]) as FormArray).removeAt(0)
            }
          }

          if (Array.isArray(data[item]) && data[item].length) {
            addNewFormArrayItem(item, data[item], [item]);
          }
          
        });
      }

      public getMultidimensionalArrayValue(arrayOfFields: any[]) {
        return this.${objectId}Form.get(arrayOfFields) as FormArray;
      }

      public addInMultidimensionalArray(arrayOfFields: any[], getFormGroupFunction: any) {
        (this.${objectId}Form.get([...arrayOfFields]) as FormArray).push(getFormGroupFunction);
      }

      public deleteFromMultidimensionalArray(arrayOfFields: any[], index: number) {
        (this.${objectId}Form.get([...arrayOfFields]) as FormArray).removeAt(index);
      }

      private _setAutocompleteAttrToEdit(
        arrayOfFields: any[],
        arrayView: any[],
        arrayValue: any[],
        objectValuesArray: any,
        viewAttr: string[],
        valueAttr: string,
      ) {
        const arrayOfIndexes = arrayOfFields.filter((field, fieldIndex) => fieldIndex % 2 !== 0)

        const setValue = (
          _arrayView: any[],
          _arrayValue: any[],
          _index: number,
          count: number,
        ) => {
          if (count < arrayOfIndexes.length) setValue(_arrayView[_index], _arrayValue[_index], arrayOfIndexes[count++], count++)
          else {
            (objectValuesArray || []).forEach((el: any) => {
              _arrayView.push(viewAttr.reduce((prev, current, index) => prev += ((index > 0 ? ' - ' : '') + el[current]), ''));
              _arrayValue.push(el[valueAttr]);
            });
          }
        }

        setValue(
          arrayView,
          arrayValue,
          arrayOfIndexes[0],
          0,
        )
      }
    `
      : ``
    }

  ${_hasCondition
      ? `setCondition = () => {
        ${_conditionsMethods}        
      };
      
      setConditionOverEdition = () => {
        ${_conditionsMethodsOverEdition}
      };`
      : ``
    }

  ${_hasConditionInArray
      ? setConditionsInArray(object, object.form.elements)
      : ""
    }

  ${_methods}
  
  ${objectId}Submit = async (
    ${objectId}Directive: FormGroupDirective
  ) => {
      this.isLoading = true;

      try {
        if(this.isAddModule) {
            await lastValueFrom(this._${objectId}Service.save(
              this.${objectId}Form.value
            ));
        }

        if(!this.isAddModule) {
          ${_treatmentBeforeSubmitting}
            await lastValueFrom(this._${objectId}Service.update(
              this.${objectId}Form.value,
              this.${objectId}Id
            ));
        }
        this.redirectTo
        ("main/${TextTransformation.kebabfy(objectId.split("Form")[0])}");
        
        this.isLoading = false;
      } catch (error: any) {
        if (error.logMessage === 'jwt expired') {
          await this.refreshToken();
          this.${objectId}Submit(${objectId}Directive);
        } else {
          const message = this._errorHandler.apiErrorMessage(error.message);
          this.isLoading = false;
          this.sendErrorMessage(message);
        }
      };
      
      this.${objectId}Form.reset();
      ${objectId}Directive.resetForm();
  };
  
  refreshToken = async () => {
      try {
        const res: any = await await lastValueFrom(this._${objectId}Service.refreshToken());
        if (res) {
          sessionStorage.setItem('token', res?.data.authToken);
          sessionStorage.setItem('refreshToken', res?.data.authRefreshToken);
        }
      } catch (error: any) {
        const message = this._errorHandler.apiErrorMessage(error.message);
        this.isLoading = false;
        this.sendErrorMessage(message);
        sessionStorage.clear();
        this._router.navigate(['/']);
      };
  };
  
  redirectTo = async (uri:string) => {
    try {
      await this._router.navigateByUrl('/main', { skipLocationChange: true });
      this._router.navigate([uri]);
    } catch (error: any) {
      const message = this._errorHandler.apiErrorMessage(error.message);
      this.sendErrorMessage(message);
    }
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
  return code.replace(/\[\, /g, "[");
};

const verifyFormElement = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
): void => {
  if (!object.form) {
    return;
  }
  const objectId = object.form.id;
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
        verifyFormElement(object, tabElement);
      });
    });
  }

  if (element.array) {
    _arrays.push(element.array);
    element.array.elements.forEach((arrayElement) => {
      verifyFormElement(object, arrayElement, element.array);
    });
  }

  if (element.autocomplete) {
    if (!array) {
      _treatmentBeforeSubmitting += `this.${objectId}Form.get("${element.autocomplete.name}")?.setValue(this.${objectId}Form.get("${element.autocomplete.name}")?.value.${element.autocomplete.optionsApi.valueField});`;
    }
  }

  if (formElements.includes(type)) {
    if (value.conditions) {
      _hasCondition = true;

      if (array) {
        _hasConditionInArray = true;
      }
    }
  }
};

export { setFormControllerMethods };
