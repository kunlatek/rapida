import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

let _hasChart: boolean = false;

const setModuleControllerImports = (object: MainInterface): string => {
  if (!object.module) {
    console.info("Only modules set here");
    return ``;
  }

  let code = `
  import { NgModule } from "@angular/core";
  import { CommonModule } from "@angular/common";  
  import { SharedModule } from "../shared/shared.module";
  import { ${TextTransformation.pascalfy(
    object.module.id
  )}RoutingModule } from "./${TextTransformation.kebabfy(
    object.module.id
  )}-routing.module";
  import { ${TextTransformation.pascalfy(
    object.module.id
  )}Component } from "./${TextTransformation.kebabfy(
    object.module.id
  )}.component";
  
  import {
    NgxMaskModule,
    IConfig
  } from "ngx-mask";
  `;
  code
  object.module.components.forEach((element) => {
    code += setModuleControllerImportsOverElement(element);
  });
  
  return code;
};

const setModuleControllerImportsOverElement = (
  element: string
): string => {
  const componentKebabfied = TextTransformation.kebabfy(element);

  if (componentKebabfied.split("-").pop() === "chart") {
    _hasChart = true;
  }

  let code = `
  import { ${TextTransformation.pascalfy(
    element
  )}Component } from "src/app/components/${TextTransformation.kebabfy(
    element
  )}/${TextTransformation.kebabfy(element)}.component";
  `;

  return code;
};

const setNgModuleDeclarations = (object: MainInterface) => {
  if (!object.module) {
    console.info("Only modules set here");
    return ``;
  }

  let code = ``;

  object.module.components.forEach((element) => {
    code += setNgModuleDeclarationsOverElement(object, element);
  });

  return code;
};

const setNgModuleDeclarationsOverElement = (
  object: MainInterface,
  element: string
): string => {
  const componentKebabfied = TextTransformation.kebabfy(element);

  if (componentKebabfied.split("-").pop() === "chart") {
    _hasChart = true;
  }

  let code = `
  ${TextTransformation.pascalfy(element)}Component,
  `;

  return code;
};

const setNgModuleImports = (object: MainInterface) => {
  if (!object.module) {
    console.info("Only modules set here");
    return ``;
  }
  let _ngModuleImports = `
  ${_hasChart ? `NgChartsModule,` : ``}
  `;

  object.module.components.forEach((element) => {
    _ngModuleImports += setNgModuleImportsOverElement(object, element);
  });

  const code = `${_ngModuleImports}
  `;

  return code;
};

const setNgModuleImportsOverElement = (
  object: MainInterface,
  element: string
): string => {
  const componentKebabfied = TextTransformation.kebabfy(element);

  if (componentKebabfied.split("-").pop() === "chart") {
    _hasChart = true;
  }

  let code = `
  `;

  return code;
};

export {
  setModuleControllerImports,
  setNgModuleImports,
  setNgModuleDeclarations,
};
