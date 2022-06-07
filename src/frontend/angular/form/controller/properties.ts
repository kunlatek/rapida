import { FormInputTypeEnum } from "../../../../enums/form";
import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

const setFormControllerProperties = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let code = `
  ${object.form.id}Id: string = '';
  ${object.form?.id}Form: FormGroup;
  ${object.form?.id}ToEdit: any;
  isAddModule: boolean = true;
  isLoading: boolean = false;
  `;

  object.form?.elements.map((element) => {
    code += setByFormElement(object, element);
  });

  return code;
};

const setByFormElement = (
  object: MainInterface,
  element: FormElementInterface
) => {
  let code = ``;

  if (element.input?.type === FormInputTypeEnum.File) {
    code += `fileName: string = '';`
  }

  if (element.tabs) {
      element.tabs.forEach(tab => {
        tab.elements.forEach(tabElement => {          
          code += setByFormElement(object, tabElement);
        });
      })
  }

  if (element.array) {
    element.array.elements.forEach(arrayElement => {
      code += setByFormElement(object, arrayElement);
    });
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

  return code;
};

export { setFormControllerProperties };
