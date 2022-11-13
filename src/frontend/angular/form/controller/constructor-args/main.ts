import { ArrayFeaturesInterface } from "../../../../../interfaces/array";
import {
  FormElementInterface
} from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { setAutocompleteToEdit } from "./autocomplete-args";
import { setCalculateComposedValue } from "./calculate-composed-value";
import { setFormSelectOptions, setSelectToEdit } from "./select-args";
require("dotenv").config();

let _allParents: Array<string> = [];
let _hasCondition = false;
let _hasArray = false;

const setFormControllerConstructorArguments = (
  object: MainInterface
): string => {
  if (!object.form) {
    return ``;
  }
  const objectId = object.form.id;
  const objectTitle = object.form.title;

  let _optionsCreation: string = ``;
  let _autocompleteToEdit: string = ``;
  let _selectToEdit: string = ``;
  let _calculationComposedValue: string = ``;

  _hasArray = false;
  _optionsCreation += setFormSelectOptions(object);
  _autocompleteToEdit += setAutocompleteToEdit(object, object.form.elements);
  _selectToEdit += setSelectToEdit(object, object.form.elements);
  _calculationComposedValue += setCalculateComposedValue(object, object.form.elements);
  object.form.elements.forEach((element: any) => {
    verifyFormElement(element);
  });

  const code = `
  try {
    this._activatedRoute.params.subscribe(async (routeParams) => {
        this.${objectId}Id = routeParams["id"];
        this.isAddModule = !this.${objectId}Id;
    
        if (this.${objectId}Id) {
          this.isLoading = true;
          this.${objectId}ToEdit = 
          await lastValueFrom(this._${objectId}Service.find(this.${objectId}Id));
          ${_hasArray
      ? `this._createAllArray(this.${objectId}ToEdit.data);`
      : ``
    }
          ${_autocompleteToEdit}
          ${_selectToEdit}

          this.${objectId}Form?.reset();
          this.${objectId}Form.patchValue(this.${objectId}ToEdit.data);

        
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


  this.${objectId}Form = 
  this._formBuilder.group(this.${objectId}Builder);

  this.${objectId}Form.valueChanges.subscribe(() => {
    ${_calculationComposedValue}
  })
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
    element.tabs.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        verifyFormElement(tabElement);
      });
    });
  }

  if (element.array) {
    _hasArray = true;
    element.array.elements.forEach((arrayElement) => {
      verifyFormElement(arrayElement);
    });
  }
};

const setAllParents = (lastParent: string) => {
  let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
    process.env.ARRAY_LAYER!
  );
  _allParents.push(lastParent);

  _arrayLayer.forEach((element: ArrayFeaturesInterface) => {
    if (element.name === lastParent && element.parentArray) {
      _allParents.push(element.parentArray);
      setAllParents(element.parentArray);
    }
  });
};

export {
  setFormControllerConstructorArguments
};
