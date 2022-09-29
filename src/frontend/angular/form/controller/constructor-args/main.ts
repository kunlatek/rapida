import { ArrayFeaturesInterface } from "../../../../../interfaces/array";
import {
  ArrayInterface,
  FormElementInterface
} from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setFormSelectOptions } from "./form-select-options";
require("dotenv").config();

let _allParents: Array<string> = [];
let _hasCondition = false;
let _hasArray = false;

const setFormControllerConstructorArguments = (
  object: MainInterface
): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }
  _hasArray = false;
  let _optionsCreation: string = ``;
  let _patchArrayValues: string = ``;
  let _autocompleteToEdit: string = ``;
  let _selectToEdit: string = ``;

  _optionsCreation += setFormSelectOptions(object);
  _autocompleteToEdit += setAutocompleteToEdit(
    object,
    object.form.elements
  );
  _selectToEdit += setSelectToEdit(object, object.form.elements);
  object.form.elements.forEach((element: any) => {
    verifyFormElement(element);
  });

  const code = `
  try {
    const modulePermissionToCheck: any = this.permissionsToCheck.find((item: any) => item.module.name === "${object.form.title
    }")
    this.updateOnePermission = modulePermissionToCheck.permissionActions.filter((item: any) => item.name === "updateOne").length > 0;
    this.createOnePermission = modulePermissionToCheck.permissionActions.filter((item: any) => item.name === "createOne").length > 0;

    this._activatedRoute.params.subscribe(async (routeParams) => {
        this.${object.form.id}Id = routeParams["id"];
        this.isAddModule = !this.${object.form.id}Id;
    
        if (this.${object.form.id}Id) {
          this.${object.form.id}ToEdit = await this._${object.form.id
    }Service.find(this.${object.form.id}Id);
          ${_hasArray
      ? `this._createAllArray(this.${object.form.id}ToEdit.data);`
      : ``
    }
          ${_selectToEdit}

          ${_autocompleteToEdit}

          this.${object.form.id}Form.patchValue(this.${object.form.id
    }ToEdit.data);

        
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


  this.${object.form.id}Form = this._formBuilder.group(this.${object.form.id
    }Builder);
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

const setAutocompleteToEdit = (
  object: MainInterface,
  formElements: FormElementInterface[],
  array: ArrayInterface | undefined = undefined
): string => {
  let code = ``;
  formElements.forEach((element: any) => {
    if (element.tabs) {
      element.tabs.forEach((tabElement: any) => {
        code += setAutocompleteToEdit(object, tabElement.elements);
      });
    }

    if (element.array) {
      code += setAutocompleteToEdit(
        object,
        element.array.elements,
        element.array.id
      );
    }

    if (element.autocomplete) {
      code += `
      this.set${TextTransformation.pascalfy(element.autocomplete.name)}ToEdit();
      `;
      if (element.autocomplete.isMultiple) {
        code += `
        if (this.${object.form?.id}ToEdit.data.${TextTransformation.singularize(
          element.autocomplete.optionsApi.endpoint
        )}) {
          this.chosen${TextTransformation.pascalfy(
          element.autocomplete.name
        )}View${array ? `[${TextTransformation.singularize(array.id)}Index]` : ``
          } = [];
          this.chosen${TextTransformation.pascalfy(
            element.autocomplete.name
          )}Value${array ? `[${TextTransformation.singularize(array.id)}Index]` : ``
          } = [];
          this.${object.form?.id}ToEdit.data
          .${TextTransformation.singularize(
            element.autocomplete.optionsApi.endpoint
          )}
          .forEach((element: any) => {
            this.chosen${TextTransformation.pascalfy(
            element.autocomplete.name
          )}View${array ? `[${TextTransformation.singularize(array.id)}Index]` : ``
          }.push(element.${element.autocomplete.optionsApi.labelField[0]});
            this.chosen${TextTransformation.pascalfy(
            element.autocomplete.name
          )}Value${array ? `[${TextTransformation.singularize(array.id)}Index]` : ``
          }.push(element.${element.autocomplete.optionsApi.valueField});
          });
        }
        `;
      }
    }
  });

  return code;
};

const setSelectToEdit = (
  object: MainInterface,
  formElements: FormElementInterface[],
  array: ArrayInterface | undefined = undefined
): string => {
  let code = ``;

  let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
    process.env.ARRAY_LAYER!
  );
  let parentArray: string | undefined;
  let getParentsIndexes: string = ``;
  let getParentsControl: string = ``;

  if (array) {
    _arrayLayer?.forEach((arrayLayer: ArrayFeaturesInterface) => {
      if (arrayLayer.name === array.id) {
        parentArray = arrayLayer.parentArray;
      }
    });

    if (parentArray) {
      _allParents = [];
      setAllParents(parentArray);

      _allParents.forEach((parent: string, index: number) => {
        getParentsIndexes += `${TextTransformation.singularize(
          parent
        )}Index: number${index < _allParents.length - 1 ? ", " : ""}`;
        getParentsControl += `"${parent}", ${TextTransformation.singularize(
          parent
        )}Index${index < _allParents.length - 1 ? ", " : ""}`;
      });
    }
  }

  formElements.forEach((element: any) => {
    if (element.tabs) {
      element.tabs.forEach((tabElement: any) => {
        code += setSelectToEdit(object, tabElement.elements);
      });
    }

    if (element.array) {
      code += setSelectToEdit(object, element.array.elements, element.array.id);
    }

    if (element.select) {
      if (element.select.optionsApi) {
        if (array) {
          code += `this.${object.form?.id}ToEdit.data.${_arrayLayer[0].name}?.map((${_arrayLayer[0].name}Element: any) => {`;
          _arrayLayer.forEach((arrayLayerElement: any, index: number) => {
            if (index > 0) {
              code += `${_arrayLayer[index - 1].name}Element.${arrayLayerElement.name}?.map((${arrayLayerElement.name}Element: any) => {`;
            }

            if (index + 1 === _arrayLayer.length) {
              code += `
                    ${arrayLayerElement.name}Element.${element.select.name}?.map((${element.select.name}Element: any) => {
                      ${arrayLayerElement.name}Element.${element.select.name}
                      .push(${element.select.name}Element
                        .${element.select.optionsApi.valueField});
                    })
                  `;
            }
          });

          _arrayLayer.forEach((arrayLayerElement: any, index: number) => {
            if (index > 0) {
              code += `})`;
            }
          });

          code += `})`;
        }
        code += `
        this.${object.form?.id}ToEdit.data.${element.autocomplete.name} = this.${object.form?.id}ToEdit.data.${element.autocomplete.name}
        .map((element: any) => element.${element.autocomplete.optionsApi.valueField});
        `;
      }
    }
  });

  return code;
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

export { setFormControllerConstructorArguments };
