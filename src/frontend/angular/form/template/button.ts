import { FormButtonTypeEnum } from "../../../../enums/form";
import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

const setButton = (
  object: MainInterface,
  element: FormElementInterface,
  conditions: string,
) => {
  if (!element.button) {
    return;
  }
  let code = ``;
  let color = "";
  const dialogAction = "";
  const label =
    element.button.type === FormButtonTypeEnum.Submit
      ? `{{isAddModule ? "Criar" : "Editar"}}`
      : element.button.label;
  const icon =
    element.button.type === FormButtonTypeEnum.Submit
      ? `{{isAddModule ? "save" : "edit"}}`
      : element.button.icon;
  const disabled = FormButtonTypeEnum.Submit
    ? `[disabled]="!${object.form?.id}Form.valid || isLoading"`
    : "";

  if (element.button.type === FormButtonTypeEnum.Button) {
    color = "";
  }
  if (element.button.type === FormButtonTypeEnum.Submit) {
    color = `color="primary" ${dialogAction}`;
  }
  if (element.button.type === FormButtonTypeEnum.Delete) {
    color = `color="warn" ${dialogAction}`;
  }
  if (element.button.type === FormButtonTypeEnum.Reset) {
    color = `color="accent"`;
  }

  if (element.button.type === FormButtonTypeEnum.Submit) {
    code += `<mat-card-actions>`;
  }
  code += `
    <div style="clear: both"></div>
    <button mat-raised-button 
    ${color} ${disabled}>
      <mat-icon>${icon}</mat-icon>
      ${label}
    </button>

    <button 
      mat-raised-button 
      color="primary"  
      [disabled]="!${object.form?.id}Form.valid || isLoading" 
      *ngIf="!isAddModule" 
      type="button" 
      [routerLink]="['/main/${TextTransformation.kebabfy((object.form?.id || '').split("Form")[0])}']"
    >
      <mat-icon>close</mat-icon> Limpar  
    </button>
    `;
  if (element.button.type === FormButtonTypeEnum.Submit) {
    code += `</mat-card-actions>`;
  }

  return code;
};

export { setButton };
