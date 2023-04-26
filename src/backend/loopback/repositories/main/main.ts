import * as fs from "fs";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { setConstructor } from "./constructor";
import { setEntityInterfaces } from "./interfaces";
import { setEntityProperties } from "./properties";

const repositoryMain = (object: MainInterface): string => {
  const entityName: string = object.form!.id.replace("Form", "");

  let _interface: string = setEntityInterfaces(object);
  let _properties: string = setEntityProperties(object);
  let _constructorParams: string = setConstructor(object);

  let code = `
  ${_interface}

  export class ${TextTransformation.pascalfy(entityName)} {  

    ${_properties}

    constructor(entity: I${TextTransformation.pascalfy(entityName)}){
      ${_constructorParams}
    }
  }
  `;

  setDomainEntityArchitectureAndWriteToFile(object, code);
  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setDomainEntityArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  const componentFilePath = `${object.projectPath}-api/src/domain/entities/api/${TextTransformation.kebabfy(object.form?.id.replace("Form", "")!)}.model.ts`;
  const componentIndexFilePath = `${object.projectPath}-api/src/domain/entities/api/index.ts`;

  try {
    fs.writeFileSync(componentFilePath, code);
    fs.appendFile(componentIndexFilePath, `export * from './${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)}.model';`, () => { });

    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} already exists.`);
    console.info(`File successfully written in ${componentFilePath}.`);
  } catch (error: any) {
    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} doesn't exist.`);

    fs.writeFileSync(componentFilePath, code);

    console.info(`File successfully created in ${componentFilePath}.`);
  }
};

export { repositoryMain };
