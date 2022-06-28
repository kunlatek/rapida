import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setArray } from "./array";
import { setCondition, setConditionsInArray } from "./condition";
import { setFileSubmit, setMethod, setValueBeforeSubmit } from "./method";

const setFormControllerMethods = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let _methods = ``;
  let _valueTreatmentBeforeSubmit = ``;
  let _conditionsMethods = ``;
  let _conditionsOverEdition = ``;
  let _conditionsMethodsInArray = ``;
  let _fileSubmit = ``;

  _conditionMethods = [];
  _arraysInAFlow = [];
  
  setArray(object);

  _conditionsMethods += setCondition(object);
  _conditionsMethodsInArray += setConditionsInArray(object, object.form.elements);
  _methods += setMethod(object);
  _fileSubmit += setFileSubmit(object);
  _valueTreatmentBeforeSubmit += setValueBeforeSubmit(object, object.form.elements);
  
  object.form.elements.forEach((element) => {
    verifyFormElement(element);
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
      };
      
      setConditionOverEdition = () => {

      };`
      : ``
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

export {
  setFormControllerMethods
}