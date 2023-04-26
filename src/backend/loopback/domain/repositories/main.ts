import * as fs from "fs";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

const domainRepositoryMain = (object: MainInterface): string => {
  const entityName: string = object.form!.id.replace("Form", "");
  const modelName: string = TextTransformation.pascalfy(entityName);

  let code = `
  import {${modelName}, I${modelName}} from '../../entities'
  
  export interface I${modelName}Repository {
    create(data: I${modelName}): Promise<${modelName}>
    findAll(filters: any, limit: number, page: number): Promise<${modelName}[]>
    findById(id: string): Promise<${modelName}>
    updateById(id: string, dataToUpdate: Partial<I${modelName}>): Promise<${modelName}>
    replaceById(id: string, dataToUpdate: I${modelName}): Promise<${modelName}>
    deleteById(id: string): Promise<void>
  }
  `;

  setDomainRepositoryArchitectureAndWriteToFile(object, code);
  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setDomainRepositoryArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  const componentFilePath = `${object.projectPath}-api/src/domain/repositories/api/${TextTransformation.kebabfy(object.form?.id.replace("Form", "")!)}.repository.ts`;
  const componentIndexFilePath = `${object.projectPath}-api/src/domain/repositories/api/index.ts`;

  try {
    fs.writeFileSync(componentFilePath, code);
    fs.appendFile(componentIndexFilePath, `export * from './${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)}.repository';`, () => { });

    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} already exists.`);
    console.info(`File successfully written in ${componentFilePath}.`);
  } catch (error: any) {
    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} doesn't exist.`);

    fs.writeFileSync(componentFilePath, code);

    console.info(`File successfully created in ${componentFilePath}.`);
  }
};

export { domainRepositoryMain as entityMain };
