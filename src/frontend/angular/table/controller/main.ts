import * as fs from "fs";
import * as chp from "child_process";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { setTableControllerImports } from "./imports";
import { setTableControllerProperties } from "./properties";
import { setTableControllerConstructorParams } from "./constructor-params";
import { setTableControllerConstructorArguments } from "./constructor-args";
import { setTableControllerMethods } from "./methods";

/**
 * SET CODE
 * @param object
 * @returns
 */
const setTableController = (object: MainInterface, mainArray: Array<MainInterface> | undefined = undefined,): string => {
  if (!object.table) {
    console.info("Only tables set here");
    return ``;
  }

  let _imports: string = setTableControllerImports(object);
  let _properties: string = setTableControllerProperties(object, mainArray);
  let _constructorParams: string = setTableControllerConstructorParams(object);
  let _constructorArguments: string = setTableControllerConstructorArguments(
    object
  );
  let _methods: string = setTableControllerMethods(object);

  let code = `
  ${_imports}

  @Component({
    selector: "app-${TextTransformation.kebabfy(object.table.id)}",
    templateUrl: "./${TextTransformation.kebabfy(
      object.table.id
    )}.component.html",
    styleUrls: ["./${TextTransformation.kebabfy(
      object.table.id
    )}.component.scss"],
  })
  export class ${TextTransformation.pascalfy(object.table.id)}Component {
    ${_properties}
    
    constructor(
      ${_constructorParams}
    ) {
      ${_constructorArguments}      
    }

    ${_methods}
  }
  `;

  setTableControllerArchitectureAndWriteToFile(object, code);

  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setTableControllerArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  if (!object.table) {
    return "";
  }

  const filePath = `${
    object.projectPath
  }/src/app/components/${TextTransformation.kebabfy(
    object.table.id
  )}/${TextTransformation.kebabfy(object.table.id)}.component.ts`;

  try {
    fs.writeFileSync(filePath, code);
    console.info(
      `File ${TextTransformation.kebabfy(object.table.id)} already exists.`
    );
    console.info(`File successfully written in ${filePath}.`);
  } catch (error) {
    console.info(
      `File ${TextTransformation.kebabfy(object.table.id)} doesn't exist.`
    );

    try {
      chp.execSync(
        `ng g c components/${TextTransformation.kebabfy(
          object.table.id
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

export { setTableController };
