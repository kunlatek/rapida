import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setFormBuilder } from "./form-builder";
import { setFormSelectOptions } from "./form-select-options";

let _hasCondition = false;

const setFormControllerConstructorArguments = (
  object: MainInterface
): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let _formBuilderElements: string = setFormBuilder(object);
  let _optionsCreation: string = setFormSelectOptions(object);
  let _patchArrayValues = setJsonToPatchValue(object, object.form.elements);

  object.form.elements.forEach((element: any) => {
    verifyFormElement(element);
  })

  const code = `
  try {
    this._activatedRoute.params.subscribe(async (routeParams) => {
        this.${object.form.id}Id = routeParams["id"];
        this.isAddModule = !this.${object.form.id}Id;
    
        if (this.${object.form.id}Id) {
          this.${object.form.id}ToEdit = await this._${object.form.id}Service.find(this.${object.form.id}Id);
          this.${object.form.id}Form.patchValue(this.${object.form.id}ToEdit.data);
          ${_patchArrayValues}
        
          ${_hasCondition ? "this.setConditionOverEdition();" : ""}
        }
        this.checkOptionsCreation(
          [
            ${_optionsCreation}
          ],
          0
        );
    });
  } catch(error: any) {
    const message = this._errorHandler.apiErrorMessage(error.error.message);
    this.sendErrorMessage(message);
  };


  this.${object.form.id}Form = this._formBuilder.group({
    ${_formBuilderElements}
  });
  `;

  return code;
}

const verifyFormElement = (element: FormElementInterface): void => {
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

  if (formElements.includes(type)) {
    if (value.conditions) {
      _hasCondition = true;
    }
  }

  if (element.tabs) {
    element.tabs.forEach(tab => {
      tab.elements.forEach(tabElement => {
        verifyFormElement(tabElement);
      });
    });
  }

  if (element.array) {
    element.array.elements.forEach(arrayElement => {
      verifyFormElement(arrayElement);
    });
  }
}

const setJsonToPatchValue = (object: MainInterface, formElements: any, array: string | undefined = undefined): string => {
  let code = ``;

  formElements.forEach((element: any) => {
    if (element.tabs) { 
      element.tabs.forEach((tabElement: any) => {        
        code += setJsonToPatchValue(object, tabElement.elements);
      });
    }

    if (element.array) {
      code += `
      (${array ? `${array}Form` : `this.${object.form?.id}Form`}.get("${element.array.id}") as FormArray).clear();
      ${array ? `_${array}` : `this.${object.form?.id}ToEdit.data`}.${element.array.id}.forEach((_${element.array.id}: any) => {
        const ${element.array.id}Form = this.init${TextTransformation.pascalfy(element.array.id)}();
        ${element.array.id}Form.patchValue(_${element.array.id});
        (${array ? `${array}Form` : `this.${object.form?.id}Form`}.get("${element.array.id}") as FormArray).push(${element.array.id}Form);
      `;
        code += setJsonToPatchValue(object, element.array.elements, element.array.id);  
      code += `
      });
      `;
    }
  });
  
  return code;
};

export {
  setFormControllerConstructorArguments
}