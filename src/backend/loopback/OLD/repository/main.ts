import * as fs from "fs";

import { ComponentCodeTypeEnum } from "../../../../enums/architecture";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { setRepositoryConstructorArguments } from "./constructor-args";
import { setRepositoryConstructorParams } from "./constructor-params";
import { setRepositoryImports } from "./imports";
import { setRepositoryMethods } from "./methods";
import { setRepositoryProperties } from "./properties";

const repositoryMain = (
  object: MainInterface,
  index: number,
): string => {
  const modelName: string = object.form!.id.replace("Form", "");

  let _imports: string = setRepositoryImports(object);
  let _properties: string = setRepositoryProperties(object);
  let _constructorArguments: string = setRepositoryConstructorArguments(object);
  let _constructorParams: string = setRepositoryConstructorParams(object);
  let _methods: string = setRepositoryMethods(object);
  let code = `
  ${_imports}

  export class ${TextTransformation.pascalfy(modelName)}Repository extends DefaultCrudRepository<
    ${TextTransformation.pascalfy(modelName)},
    typeof ${TextTransformation.pascalfy(modelName)}.prototype._id,
    ${TextTransformation.pascalfy(modelName)}Relations
  > {  
    ${_properties}

    constructor(
      ${_constructorParams}
    ) {
      ${_constructorArguments}
    }
  }
  ${_methods}
  /* moduleName->${object.form?.title}<- */
  /* moduleIndex->${index}<- */
  `;

  setRepositoryArchitectureAndWriteToFile(object, code);
  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setRepositoryArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  const componentFilePath = `${object.projectPath
    }-api/src/repositories/${TextTransformation.kebabfy(
      object.form?.id.replace("Form", "")!
    )}.repository.ts`;
  const componentIndexFilePath = `${object.projectPath}-api/src/repositories/index.ts`;

  try {
    fs.writeFileSync(componentFilePath, code);
    fs.appendFile(componentIndexFilePath, `export * from './${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)}.${ComponentCodeTypeEnum.Repository}';`, () => { });

    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} already exists.`);
    console.info(`File successfully written in ${componentFilePath}.`);
  } catch (error: any) {
    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} doesn't exist.`);

    fs.writeFileSync(componentFilePath, code);

    console.info(`File successfully created in ${componentFilePath}.`);
  }
};

export {
  repositoryMain
};
