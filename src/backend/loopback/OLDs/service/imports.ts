import { MainInterface } from "../../../../interfaces/main";

const setServiceImports = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const modelName: string = object.form.id.replace("Form", "");

  let code = `
  import {BindingScope, injectable, service} from '@loopback/core';
  import { StorageService } from './storage.service';
  `;

  return code;
};

export { setServiceImports };
