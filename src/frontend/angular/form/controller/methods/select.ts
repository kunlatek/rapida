import { ArrayInterface, FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";

const setSelectMethod = (
  object: MainInterface,
  element: FormElementInterface,
  array: ArrayInterface | undefined = undefined
): string => {
  if (!object.form || !element.select) {
    return "";
  }
  const objectId: string = object.form.id;
  const selectName: string = element.select.name;
  const selectNamePascal: string = TextTransformation.pascalfy(element.select.name);

  let code = "";

  if (element.select?.optionsApi) {
    code += `
      set${selectNamePascal}SelectObject = async () => {
        try {
          // const array: any = await lastValueFrom(this._${objectId}Service.${selectName}SelectObjectGetAll());
          const array: any = await this._${objectId}Service.${selectName}SelectObjectGetAll();
          if (array.data?.result) {
            array.data?.result.map((object: any) => {
              this.${selectName}SelectObject.push({
                label: object.${element.select?.optionsApi?.labelField ?? 'name'},
                value: object.${element.select?.optionsApi?.valueField ?? '_id'},
              });
            });
          }
        } catch (error: any) {
          const message = this._errorHandler.apiErrorMessage(
            error.message
          );
          this.sendErrorMessage(message);
        };
      };
      `;
  }

  return code;
};

export {
  setSelectMethod
};
