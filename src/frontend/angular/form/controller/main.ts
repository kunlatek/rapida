import * as fs from "fs";
import * as chp from "child_process";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { setFormControllerImports } from "./imports";
import { setFormControllerProperties } from "./properties";
import { setFormControllerConstructorParams } from "./constructor-params";
import { setFormControllerConstructorArguments } from "./constructor-args";
import { setFormControllerMethods } from "./methods";

/**
 * SET CODE
 * @param object
 * @returns
 */
const setFormController = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let _imports = setFormControllerImports(object);
  let _properties = setFormControllerProperties(object);
  let _constructorParams = setFormControllerConstructorParams(object);
  let _constructorArguments = setFormControllerConstructorArguments(object);
  let _methods = setFormControllerMethods(object);

  let code = `
  ${_imports}

  @Component({
    selector: "app-${TextTransformation.kebabfy(object.form.id)}",
    templateUrl: "./${TextTransformation.kebabfy(
      object.form.id
    )}.component.html",
    styleUrls: ["./${TextTransformation.kebabfy(
      object.form.id
    )}.component.scss"],
  })
  export class ${TextTransformation.pascalfy(object.form.id)}Component {
    ${_properties}
    
    constructor(
      ${_constructorParams}
    ) {
      ${_constructorArguments}
    }
    ${_methods}
  }
  `;

  setFormArchitectureAndWriteToFile(object, code);
  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setFormArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  if (!object.form) {
    return "";
  }

  const filePath = `${
    object.projectPath
  }/src/app/components/${TextTransformation.kebabfy(
    object.form.id
  )}/${TextTransformation.kebabfy(object.form.id)}.component.ts`;

  try {
    fs.writeFileSync(filePath, code);
    console.info(
      `File ${TextTransformation.kebabfy(object.form.id)} already exists.`
    );
    console.info(`File successfully written in ${filePath}.`);
  } catch (error) {
    console.info(
      `File ${TextTransformation.kebabfy(object.form.id)} doesn't exist.`
    );

    try {
      chp.execSync(
        `ng g c components/${TextTransformation.kebabfy(
          object.form.id
        )} --skip-import`,
        { cwd: object.projectPath }
      );
    } catch (error) {
      console.warn(error);
    }

    fs.writeFileSync(filePath, code);

    console.info(`File successfully created in ${filePath}.`);
  }
};

export { setFormController };
