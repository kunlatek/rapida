import * as chp from "child_process";
import * as fs from "fs";
import { TextTransformation } from "../../../utils/text.transformation";
import { FileType, FileTypeConfig } from "./file-type";

export interface WriteToFile {
  id: string,
  projectPath: string,
  type: FileType,
  code: string;
  optionalName?: string;
}
/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
export const writeToFile = ({ id, projectPath, code, type, optionalName }: WriteToFile) => {
  const { cliGenerateCommand, sufixFileType } = FileTypeConfig[type];

  const pathName = TextTransformation.kebabfy(id);

  const fileName = optionalName ? TextTransformation.kebabfy(optionalName) : TextTransformation.kebabfy(id);

  const filePath = `${projectPath}/src/app/components/${pathName}/${fileName}.${sufixFileType}`;

  try {
    fs.writeFileSync(filePath, code);
    console.info(
      `File ${fileName} ${type} already exists.`
    );
    console.info(`File successfully written in ${filePath} ${type}.`);
  } catch (error) {
    console.info(
      `File ${fileName} ${type} doesn't exist.`
    );

    try {
      chp.execSync(
        `ng g ${cliGenerateCommand} components/${pathName} --skip-import`,
        { cwd: projectPath }
      );
    } catch (error) {
      console.warn(error);
    }

    fs.writeFileSync(filePath, code);

    console.info(`File successfully created in ${filePath} ${type}.`);
  }
};