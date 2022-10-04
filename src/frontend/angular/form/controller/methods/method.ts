import {
  ArrayInterface,
  FormElementInterface
} from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { setArrayMethod } from "./array";
import { setAutocompleteMethod } from "./autocomplete";
import { setInputMethod } from "./input";
import { setSelectMethod } from "./select";

const setMethod = (object: MainInterface): string => {
  let code = ``;

  if (!object.form) {
    return code;
  }

  code += setFormMethodsByElements(object, object.form.elements);

  return code;
};

const setFormMethodsByElements = (
  object: MainInterface,
  elements: Array<FormElementInterface>,
  array: ArrayInterface | undefined = undefined
): string => {
  let code = "";

  if (!object.form) {
    return code;
  }

  const objectId = object.form.id;

  elements.forEach((element) => {
    if (element.input) {
      code += setInputMethod(object, element, array);
    }

    if (element.select) {
      code += setSelectMethod(object, element, array);
    }

    if (element.autocomplete) {
      code += setAutocompleteMethod(object, element, array);
    }

    if (element.array) {
      code += setArrayMethod(object, element.array);
    }

    if (element.tabs) {
      element.tabs.forEach((form) => {
        code += setFormMethodsByElements(object, form.elements);
      });
    }
  });

  return code;
};

export {
  setMethod,
  setFormMethodsByElements,
};
