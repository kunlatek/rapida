import * as fs from "fs";

import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";
import { setArrayTypeSchemas, setModelProperties } from "./properties";

const schemaMain = (
  object: MainInterface,
  index: number,
): string => {
  const schemaName: string = object.form!.id.replace("Form", "");
  let _arrayTypeModels: string = setArrayTypeSchemas(object.form?.elements!);
  let _properties: string = setModelProperties(object);

  let code = `
  import mongoose, { Schema } from "mongoose";

  ${_arrayTypeModels}

  const ${TextTransformation.pascalfy(schemaName)}Schema = new Schema({

    _ownerId: {
      type: String,
      required: false,
    },

    _createdBy: {
      type: String,
      required: true,
    },

    _createdAt: {
      type: Date,
      required: true,
      default: () => Date.now(),
    },

    _deletedAt: {
      type: Date,
      required: false,
      default: null
    },

    ${_properties}

  });

  module.exports = mongoose.model('${TextTransformation.pascalfy(schemaName)}', ${TextTransformation.pascalfy(schemaName)}Schema, '${TextTransformation.pascalfy(schemaName)}');
  
  /* moduleName->${object.form?.title}<- */
  /* moduleIndex->${index}<- */
  `;

  setModelArchitectureAndWriteToFile(object, code);
  return code;
};

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
    }-api/src/mongoose-schemas/${TextTransformation.kebabfy(
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
  schemaMain
};
