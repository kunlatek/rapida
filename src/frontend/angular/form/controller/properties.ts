import { ConditionEnum, FormInputTypeEnum } from "../../../../enums/form";
import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";


let conditionProperties: Array<string>;

const setFormControllerProperties = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  conditionProperties = [];

  let code = `
  ${object.form.id}Id: string = '';
  ${object.form?.id}Form: FormGroup;
  ${object.form?.id}ToEdit: any;
  isAddModule: boolean = true;
  isLoading: boolean = false;
  `;

  object.form?.elements.forEach((element) => {
    code += setByFormElement(object, element);
    code += setConditions(object, element);
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

const setConditions = (
  object: MainInterface,
  element: FormElementInterface,
  isArray: boolean = false
): string => {
  const formElements = [
    "input",
    "autocomplete",
    "button",
    "checkbox",
    "radio",
    "select",
    "slide",
    "array",
  ];
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];
  let code = ``;

  if (formElements.includes(type)) {
    if (value.conditions) {
      // Check to not repeat property
      if (!conditionProperties.includes(value.conditions.id)) {
        if (value.conditions.type === ConditionEnum.Form) {
          if (!isArray) {            
            code += `${value.conditions.id}FormCondition: boolean = false;`;
          }

          if (isArray) {
            code += `${value.conditions.id}FormCondition: [boolean] = [false];`;
          }
        }
  
        if (value.conditions.type === ConditionEnum.Code) {
          code += `${value.conditions.id}CodeCondition: boolean = false;`;
        }
      }

      conditionProperties.push(value.conditions.id);
    }
  }

  if (element.tabs) {
    element.tabs.forEach(tab => {
      tab.elements.forEach(tabElement => {
        code += setConditions(object, tabElement);
      });
    });
  }

  if (element.array) {
    element.array.elements.forEach(arrayElement => {
      code += setConditions(object, arrayElement, true);
    });
  }
  
  return code;
};

export { setFormControllerProperties };
