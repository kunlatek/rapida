import * as fs from "fs";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { setRepositorySchemaProperties } from "./properties";

const repositorySchemaMain = (
  object: MainInterface,
): string => {
  const schemaName: string = object.form!.id.replace("Form", "");
  const modelName = TextTransformation.pascalfy(schemaName);

  let _properties: string = setRepositorySchemaProperties(object, TextTransformation.pascalfy(schemaName));

  let code = `
  import mongoose from 'mongoose';
  import {transformSchemaToMongooseModel} from '../../../../utils/general.util';

  export const ${schemaName}Schema = {

    _createdBy: { type: 'string', required: false, default: '' },
    _ownerId: { type: 'string', required: false, default: '' },
    ${_properties}

  };

  const ${modelName}MongoSchema = new mongoose.Schema(
    transformSchemaToMongooseModel(${schemaName}Schema),
    {
      timestamps: {
        createdAt: '_createdAt',
        updatedAt: '_updatedAt',
      }
    }
  )
  export const ${modelName}MongoModel = mongoose.model('${modelName}', ${modelName}MongoSchema, '${modelName}');
  `;

  setRepositorySchemaArchitectureAndWriteToFile(object, code);
  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setRepositorySchemaArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  const componentFilePath = `${object.projectPath
    }-api/src/repositories/mongo/api/schemas/${TextTransformation.kebabfy(
      object.form?.id.replace("Form", "")!
    )}.schema.ts`;

  try {

    fs.writeFileSync(componentFilePath, code);
    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} already exists.`);
    console.info(`File successfully written in ${componentFilePath}.`);

  } catch (error: any) {

    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} doesn't exist.`);
    fs.writeFileSync(componentFilePath, code);
    console.info(`File successfully created in ${componentFilePath}.`);

  }
};

export {
  repositorySchemaMain
};
