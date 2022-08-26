import * as fs from "fs";

import { ComponentCodeTypeEnum } from "../../../enums/architecture";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";
import { setModelConstructorParams } from "./constructor-params";
import { setModelConstructorArguments } from "./contructor-args";
import { setModelImports } from "./imports";
import { setArrayTypeModels, setModelProperties } from "./properties";

const modelMain = (
  object: MainInterface
): string => {
  const modelName: string = object.form!.id.replace("Form", "");
  let _imports: string = setModelImports(object);
  let _arrayTypeModels: string = setArrayTypeModels(object);
  let _properties: string = setModelProperties(object);
  let _constructorArguments: string = setModelConstructorArguments(object);
  let _constructorParams: string = setModelConstructorParams(object);

  let code = `
  ${_imports}

  ${_arrayTypeModels}

  @model()
  export class ${TextTransformation.pascalfy(modelName)} extends __Default {
    ${_properties}

    constructor(
      ${_constructorParams}
    ) {
      ${_constructorArguments}
    }
  }
  
  export interface ${TextTransformation.pascalfy(modelName)}Relations {
      
  }
  
  export type ${TextTransformation.pascalfy(modelName)}WithRelations = ${TextTransformation.pascalfy(modelName)} & ${TextTransformation.pascalfy(modelName)}Relations;
  `;

  setModelArchitectureAndWriteToFile(object, code);
  return code;
}

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setModelArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  const componentFilePath = `${object.projectPath
    }-api/src/models/${TextTransformation.kebabfy(
      object.form?.id.replace("Form", "")!
    )}.model.ts`;
  const componentIndexFilePath = `${object.projectPath}-api/src/models/index.ts`;

  try {
    fs.writeFileSync(componentFilePath, code);
    fs.appendFile(componentIndexFilePath, `export * from './${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)}.${ComponentCodeTypeEnum.Model}';`, () => { });

    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} already exists.`);
    console.info(`File successfully written in ${componentFilePath}.`);
  } catch (error: any) {
    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} doesn't exist.`);

    fs.writeFileSync(componentFilePath, code);

    console.info(`File successfully created in ${componentFilePath}.`);
  }
};

export {
  modelMain
};