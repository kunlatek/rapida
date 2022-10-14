import { MainInterface } from "../../../../../interfaces/main";
import { setCondition } from "./condition";
import { setProperty } from "./property";

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
  isLoading: boolean = true;
  
  permissionsToCheck = JSON.parse(sessionStorage.getItem("permission")!)[0].modulePermissions;
  updateOnePermission: any;
  createOnePermission: any;
  @Input() _moduleRelated!: string;
  `;

  code += setCondition(object);
  code += setProperty(object);

  return code;
};

export {
  setFormControllerProperties
};
