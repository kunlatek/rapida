import { ArrayInterface, FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";

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
      const autocompleteNamePascal: string = TextTransformation.pascalfy(element.autocomplete.name);
      if (element.autocomplete.isMultiple) {
        code += `
        this.set${autocompleteNamePascal}ToEdit();
        `;
        // code += `
        // if (this.${objectId}ToEdit.data.${TextTransformation.singularize(
        //   element.autocomplete.optionsApi.endpoint
        // )}) {
        //   this.chosen${TextTransformation.pascalfy(
        //   element.autocomplete.name
        // )}View${array ? `[${TextTransformation.singularize(array.id)}Index]` : ``
        //   } = [];
        //   this.chosen${TextTransformation.pascalfy(
        //     element.autocomplete.name
        //   )}Value${array ? `[${TextTransformation.singularize(array.id)}Index]` : ``
        //   } = [];
        //   this.${objectId}ToEdit.data
        //   .${TextTransformation.singularize(
        //     element.autocomplete.optionsApi.endpoint
        //   )}
        //   .forEach((element: any) => {
        //     this.chosen${TextTransformation.pascalfy(
        //     element.autocomplete.name
        //   )}View${array ? `[${TextTransformation.singularize(array.id)}Index]` : ``
        //   }.push(element.${element.autocomplete.optionsApi.labelField[0]});
        //     this.chosen${TextTransformation.pascalfy(
        //     element.autocomplete.name
        //   )}Value${array ? `[${TextTransformation.singularize(array.id)}Index]` : ``
        //   }.push(element.${element.autocomplete.optionsApi.valueField});
        //   });
        // }
        // `;
      }
    }
  });

  return code;
};

export {
  setAutocompleteToEdit
};
