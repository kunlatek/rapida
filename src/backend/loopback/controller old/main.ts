import * as fs from "fs";

import { ComponentCodeTypeEnum } from "../../../enums/architecture";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";
import { setControllerConstructorParams } from "./constructor-params";
import { setControllerImports } from "./imports";
import { setControllerMethods } from "./methods";

const controllerMain = (object: MainInterface): string => {
  const controllerName: string = object.form!.id.replace("Form", "");

  let _imports: string = setControllerImports(object);
  let _constructorParams: string = setControllerConstructorParams(object);
  let _methods: string = setControllerMethods(object);
  let code = `
  ${_imports}

  export class ${TextTransformation.pascalfy(controllerName)}Controller {  
    constructor(
      ${_constructorParams}
    ) { }
    
    ${_methods}
  }
  `;

  setControllerArchitectureAndWriteToFile(object, code);
  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setControllerArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  const componentFilePath = `${
    object.projectPath
  }-api/src/controllers/${TextTransformation.kebabfy(
    object.form?.id.replace("Form", "")!
  )}.controller.ts`;
  const componentIndexFilePath = `${object.projectPath}-api/src/controllers/index.ts`;

  try {
    fs.writeFileSync(componentFilePath, code);
    fs.appendFile(componentIndexFilePath, `export * from './${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)}.${ComponentCodeTypeEnum.Controller}';`, () => { });

    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} already exists.`);
    console.info(`File successfully written in ${componentFilePath}.`);
  } catch (error: any) {
    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} doesn't exist.`);

    fs.writeFileSync(componentFilePath, code);

    console.info(`File successfully created in ${componentFilePath}.`);
  }
};

export { controllerMain };
