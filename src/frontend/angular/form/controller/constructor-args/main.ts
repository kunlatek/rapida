import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setFormSelectOptions } from "./form-select-options";

let _hasCondition = false;

const setFormControllerConstructorArguments = (
  object: MainInterface
): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }
  let _optionsCreation: string = ``;
  let _patchArrayValues: string = ``;
  let _autocompleteToEdit: string = ``;

  _optionsCreation += setFormSelectOptions(object);
  // _autocompleteToEdit += setAutocompleteToEdit(object, object.form.elements);

  object.form.elements.forEach((element: any) => {
    verifyFormElement(element);
  });

  const code = `
  try {
    const modulePermissionToCheck: any = this.permissionsToCheck.find((item: any) => item.module.name === "${object.form.title}")
    this.updateOnePermission = modulePermissionToCheck.permissionActions.filter((item: any) => item.name === "updateOne").length > 0;
    this.createOnePermission = modulePermissionToCheck.permissionActions.filter((item: any) => item.name === "createOne").length > 0;

    this._activatedRoute.params.subscribe(async (routeParams) => {
        this.${object.form.id}Id = routeParams["id"];
        this.isAddModule = !this.${object.form.id}Id;
    
        if (this.${object.form.id}Id) {
          this.${object.form.id}ToEdit = await this._${object.form.id}Service.find(this.${object.form.id}Id);
          this._createAllArray(this.${object.form.id}ToEdit.data);
          this.${object.form.id}Form.patchValue(this.${object.form.id}ToEdit.data);

        
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
    const message = this._errorHandler.apiErrorMessage(error.message);
    this.sendErrorMessage(message);
  };


  this.${object.form.id}Form = this._formBuilder.group(this.${object.form.id}Builder);
  `;

  return code;
};

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
};

const setAutocompleteToEdit = (object: MainInterface, formElements: any, array: string | undefined = undefined): string => {
  let code = ``;
  formElements.forEach((element: any) => {
    if (element.tabs) {
      element.tabs.forEach((tabElement: any) => {
        code += setAutocompleteToEdit(object, tabElement.elements);
      });
    }

    if (element.array) {
      code += setAutocompleteToEdit(object, element.array.elements, element.array.id);
    }


    if (element.autocomplete) {
      code += `
      this.set${TextTransformation.pascalfy(element.autocomplete.name)}ToEdit();
      `;
      if (element.autocomplete.isMultiple) {
        code += `
        if (this.${object.form?.id}ToEdit.data.${TextTransformation.singularize(element.autocomplete.optionsApi.endpoint)}) {
          this.chosen${TextTransformation.pascalfy(element.autocomplete.name)}View${(array) ? `[${TextTransformation.singularize(array)}Index]` : ``} = [];
          this.chosen${TextTransformation.pascalfy(element.autocomplete.name)}Value${(array) ? `[${TextTransformation.singularize(array)}Index]` : ``} = [];
          this.${object.form?.id}ToEdit.data
          .${TextTransformation.singularize(element.autocomplete.optionsApi.endpoint)}
          .forEach((element: any) => {
            this.chosen${TextTransformation.pascalfy(element.autocomplete.name)}View${(array) ? `[${TextTransformation.singularize(array)}Index]` : ``}.push(element.${element.autocomplete.optionsApi.labelField[0]});
            this.chosen${TextTransformation.pascalfy(element.autocomplete.name)}Value${(array) ? `[${TextTransformation.singularize(array)}Index]` : ``}.push(element.${element.autocomplete.optionsApi.valueField});
          });
        }
        `;
      }
    }
  });

  return code;
};

export {
  setFormControllerConstructorArguments
};
