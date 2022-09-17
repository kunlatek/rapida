import { ArrayInterface, FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setFormBuilderProperty } from "./form-builder";

const setProperty = (
  object: MainInterface
): string => {
  let code = ``;

  if (!object.form) {
    return code;
  }

  code += setFormPropertiesByElements(object, object.form.elements);
  code += setFormBuilderProperty(object);

  return code;
};

const setFormPropertiesByElements = (
  object: MainInterface,
  elements: Array<FormElementInterface>,
  array: ArrayInterface | undefined = undefined
) => {
  let code = ``;

  elements.forEach(element => {

    if (element.tabs) {
      element.tabs.forEach(tab => {
        code += setFormPropertiesByElements(object, tab.elements);
      });
    }

    if (element.array) {
      code += setFormPropertiesByElements(object, element.array.elements, element.array);
    }

    if (element.select) {
      if (element.select.optionsObject) {
        code += `${element.select.name}SelectObject = ${JSON.stringify(element.select.optionsObject)};`;
      }

      if (element.select.optionsApi) {
        code += `${element.select.name}SelectObject: Array<any> = [];`;
      }
    }

    if (element.autocomplete) {
      code += `
      filtered${TextTransformation.pascalfy(element.autocomplete.name)}: Array<any> = [];
      ${array
          ? `loading${TextTransformation.pascalfy(element.autocomplete.name)}: Array<boolean> = [false];`
          : `loading${TextTransformation.pascalfy(element.autocomplete.name)}: boolean = false;`
        }
      `;

      if (element.autocomplete.isMultiple) {
        code += `
        ${element.autocomplete.name}SeparatorKeysCodes: number[] = [ENTER, COMMA];
        chosen${TextTransformation.pascalfy(element.autocomplete.name)}View: string[] = [];
        chosen${TextTransformation.pascalfy(element.autocomplete.name)}Value: string[] = [];
      
        @ViewChild('${element.autocomplete.name}Input') ${element.autocomplete.name}Input!: ElementRef<HTMLInputElement>;
        `;
      }
    }

    if (element.checkbox) {
      if (element.checkbox.optionsObject) {
        code += `${element.checkbox.name}CheckboxObject = ${JSON.stringify(element.checkbox.optionsObject)};`;
      }

      if (element.checkbox.optionsApi) {
        code += `${element.checkbox.name}CheckboxObject: Array<CheckboxObjectInterface> = [];`;
      }
    }
  });

  return code;
};

export {
  setProperty
};
