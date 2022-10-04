import * as fs from "fs";
import { ComponentCodeTypeEnum } from "../../../enums/architecture";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";
import { setServiceConstructorParams } from "./constructor-params";
import { setServiceImports } from "./imports";
import { setServiceMethods } from "./methods";

const serviceMain = (
  object: MainInterface
): string => {
  const serviceName: string = object.form!.id.replace("Form", "");

  let _imports: string = setServiceImports(object);
  let _constructorParams: string = setServiceConstructorParams(object);
  let _methods: string = setServiceMethods(object);

  let code = `
  ${_imports}

  @injectable({scope: BindingScope.TRANSIENT})
  export class ${TextTransformation.pascalfy(serviceName)}Service {
    constructor(
      /* Add @inject to inject parameters */
      ${_constructorParams}
    ) {}

    /*
    * Add service methods here
    */
    ${_methods}
  }
  `;

  setServiceArchitectureAndWriteToFile(object, code);
  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setServiceArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  const componentFilePath = `${object.projectPath
    }-api/src/services/${TextTransformation.kebabfy(
      object.form?.id.replace("Form", "")!
    )}.service.ts`;
  const componentIndexFilePath = `${object.projectPath}-api/src/services/index.ts`;

  try {
    fs.writeFileSync(componentFilePath, code);
    fs.appendFile(componentIndexFilePath, `export * from './${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)}.${ComponentCodeTypeEnum.Service}';`, () => { });

    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} already exists.`);
    console.info(`File successfully written in ${componentFilePath}.`);
  } catch (error: any) {
    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} doesn't exist.`);

    fs.writeFileSync(componentFilePath, code);

    console.info(`File successfully created in ${componentFilePath}.`);
  }
};

export {
  serviceMain
};
