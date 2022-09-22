import { ArrayFeaturesInterface } from "../../../../../interfaces/array";
import { ArrayInterface, FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setArray } from "../../../core/array";
import { setArraysToEdit } from "./array";
import {
  setCondition,
  setConditionOverEdition,
  setConditionsInArray
} from "./condition";
import { setFileSubmit, setMethod, setValueBeforeSubmit } from "./method";

let _hasCondition: boolean = false;
let _hasConditionInArray: boolean = false;
let _arrays: Array<ArrayInterface> = [];
let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
  process.env.ARRAY_LAYER!
);
let _arraysInAFlow: Array<ArrayFeaturesInterface> = JSON.parse(
  process.env.ARRAYS_IN_A_FLOW!
);
let _arraysToEdit: string = ``;

const setFormControllerMethods = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  _arrays = [];

  setArray(object);

  _arrayLayer = JSON.parse(
    process.env.ARRAY_LAYER!
  );

  _arraysInAFlow = JSON.parse(
    process.env.ARRAYS_IN_A_FLOW!
  );

  let _conditionsMethods = setCondition(object, object.form.elements);
  let _conditionsMethodsOverEdition = setConditionOverEdition(
    object,
    object.form.elements
  );
  let _methods = setMethod(object);
  let _fileSubmit = setFileSubmit(object);
  let _valueTreatmentBeforeSubmit = setValueBeforeSubmit(
    object,
    object.form.elements
  );

  object.form.elements.forEach((element) => {
    verifyFormElement(element);
  });

  _arraysToEdit = setArraysToEdit(_arrays);

  const code = `
  ${(_arrays.length > 0)
      ? `private _createAllArray(data: any, indexArray: any = null) {
          const arr: any = [];
          Object.keys(data).forEach((item) => {
            if (Array.isArray(data[item]) && data[item].length) {
              arr.push(...data[item]);
              if (data[item].length > 1) {
                this.addNewFormArrayItem(item, data[item].length - 1, indexArray);
              }
            }
          });
          this._createAllFormGroupInArray(arr);
        }

        private _createAllFormGroupInArray(arr: any) {
          arr.forEach((element: any, index: number) => {
            this._createAllArray(element, index);
          });
        }
        
        private addNewFormArrayItem(functionName: string, howManyTimes: number, indexArr: number) {
          for (let index = 0; index < howManyTimes; index++) {
            switch (functionName) {
              ${_arraysToEdit}
              default:
                break;
            }
          }
        }`
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
        if (error.logMessage === 'jwt expired') {
          await this.refreshToken();
          this.${object.form.id}Submit(${object.form?.id}Directive);
        } else {
          const message = this._errorHandler.apiErrorMessage(error.message);
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
        const message = this._errorHandler.apiErrorMessage(error.message);
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

const verifyFormElement = (
  element: FormElementInterface,
  isArray: boolean = false
): void => {
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
    _arrays.push(element.array);
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

export { setFormControllerMethods };
