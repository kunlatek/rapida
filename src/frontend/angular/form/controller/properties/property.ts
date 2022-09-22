import { ArrayFeaturesInterface } from "../../../../../interfaces/array";
import { ArrayInterface, FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";
import { setArrayLayer } from "../../../core/array";
import { setFormBuilderProperty } from "./form-builder";
require("dotenv").config();

let _arrayLayer: Array<ArrayFeaturesInterface> = JSON.parse(
  process.env.ARRAY_LAYER!
);
let _allParents: Array<string> = [];

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

  setArrayLayer(object.form!.elements);

  _arrayLayer = JSON.parse(
    process.env.ARRAY_LAYER!
  );

  let parentArray: string | undefined;
  let getParents: string = ``;
  let getParentsIndexes: string = ``;
  let getParentsControl: string = ``;

  if (array) {
    _arrayLayer?.forEach((arrayLayer: ArrayFeaturesInterface) => {
      if (arrayLayer.name === array.id) {
        parentArray = arrayLayer.parentArray;
      }
    });

    if (parentArray) {
      setAllParents(parentArray);

      _allParents.forEach((parent: string, index: number) => {
        getParents += `this.${parent}.at(${TextTransformation.singularize(parent)}Index).`;
        getParentsIndexes += `${TextTransformation.singularize(parent)}Index: number${(index < (_allParents.length - 1)) ? ", " : ""}`;
        getParentsControl += `"${parent}", ${TextTransformation.singularize(parent)}Index${(index < (_allParents.length - 1)) ? ", " : ""}`;
      });
    }
  }

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
      ${(array && (getParentsIndexes && (getParentsIndexes !== "")))
          ? `loading${TextTransformation.pascalfy(element.autocomplete.name)}: Array<boolean> = [false];`
          : `loading${TextTransformation.pascalfy(element.autocomplete.name)}: boolean = false;`
        }
      `;

      if (element.autocomplete.isMultiple) {
        const layerCount = _arrayLayer.find((_) => _.name === array?.id);
        let layerCodeType = ``;
        let layerCodeValue = ``;
        if (layerCount) {
          for (let index = 0; index < (layerCount.layer + 1); index++) {
            layerCodeType += `[]`;
            layerCodeValue += `[`;
          }
          layerCodeValue += `[]`;
          for (let index = 0; index < (layerCount.layer + 1); index++) {
            layerCodeValue += `]`;
          }
        }
        code += `
        ${element.autocomplete.name}SeparatorKeysCodes: number[] = [ENTER, COMMA];
        chosen${TextTransformation.pascalfy(element.autocomplete.name)}View: ${(array)
            ? `string[]${layerCodeType} = ${layerCodeValue}`
            : `string[] = []`};
        chosen${TextTransformation.pascalfy(element.autocomplete.name)}Value: ${(array)
            ? `string[]${layerCodeType} = ${layerCodeValue}`
            : `string[] = []`};
      
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

const setAllParents = (lastParent: string) => {
  _allParents.push(lastParent);

  _arrayLayer.forEach((element: ArrayFeaturesInterface) => {
    if ((element.name === lastParent) && element.parentArray) {
      _allParents.push(element.parentArray);
      setAllParents(element.parentArray);
    }
  });
};

export {
  setProperty
};
