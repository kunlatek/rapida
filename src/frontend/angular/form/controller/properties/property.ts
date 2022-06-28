import { FormInputTypeEnum } from "../../../../../enums/form";
import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";

const setProperty = (
  object: MainInterface
): string => {
  let code = ``;
  
  if (!object.form) {
    return code;
  }
  
  code += setFormPropertiesByElements(object, object.form.elements);

  return code;
};

const setFormPropertiesByElements = (
  object: MainInterface,
  elements: Array<FormElementInterface>
) => {
  let code = ``;

  elements.forEach(element => {
    if (element.input?.type === FormInputTypeEnum.File) {
      code += `fileName: string = '';`
    }
  
    if (element.tabs) {
        element.tabs.forEach(tab => {
          code += setFormPropertiesByElements(object, tab.elements);
        })
    }
  
    if (element.array) {
      code += setFormPropertiesByElements(object, element.array.elements);
    }
  
    if (element.select) {
        if (element.select.optionsObject) {                        
            code += `${element.select.name}SelectObject = ${JSON.stringify(element.select.optionsObject)};`;
        }
  
        if (element.select.optionsApi) {
            code += `${element.select.name}SelectObject: Array<SelectObjectInterface> = [];`;
        }
    }
  
    if (element.autocomplete) {
        code += `
        ${element.autocomplete.name}SeparatorKeysCodes: number[] = [ENTER, COMMA];
        filtered${TextTransformation.pascalfy(element.autocomplete.name)}: Array<any> = [];
        chosen${TextTransformation.pascalfy(element.autocomplete.name)}View: string[] = [];
        chosen${TextTransformation.pascalfy(element.autocomplete.name)}Value: string[] = [];
        
        @ViewChild('${element.autocomplete.name}Input') ${element.autocomplete.name}Input!: ElementRef<HTMLInputElement>;
        `;
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
}