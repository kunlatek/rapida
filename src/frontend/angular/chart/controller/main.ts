import * as chp from "child_process";
import * as fs from "fs";

import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { setChartControllerConstructorArguments } from "./constructor-args";
import { setChartControllerConstructorParams } from "./constructor-params";
import { setChartControllerImports } from "./imports";
import { setChartControllerMethods } from "./methods";
import { setChartControllerProperties } from "./properties";

/**
 * SET CODE
 * @param object
 * @returns
 */
const setChartController = (object: MainInterface, mainArray: Array<MainInterface> | undefined = undefined,): string => {
  if (!object.chart) {
    console.info("Only charts set here");
    return ``;
  }

  const _imports: string = setChartControllerImports(object);
  const _properties: string = setChartControllerProperties(object);
  const _constructorParams: string = setChartControllerConstructorParams(object);
  const _constructorArguments: string = setChartControllerConstructorArguments(
    object
  );
  const _methods: string = setChartControllerMethods(object);

  const code = `
  ${_imports}
  
  @Component({
    selector: "app-${TextTransformation.kebabfy(object.chart.id)}",
    templateUrl: "./${TextTransformation.kebabfy(
    object.chart.id
  )}.component.html",
    styleUrls: ["./${TextTransformation.kebabfy(
    object.chart.id
  )}.component.scss"],
  })
  export class ${TextTransformation.pascalfy(
    object.chart.id
  )}Component implements OnChanges {
    ${_properties}
    
    constructor(
      ${_constructorParams}
    ) {
      ${_constructorArguments}
    }

    ${_methods}
  }  
  `;

  setChartControllerArchitectureAndWriteToFile(object, code);
  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setChartControllerArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  if (!object.chart) {
    return "";
  }

  const filePath = `${object.projectPath
    }/src/app/components/${TextTransformation.kebabfy(
      object.chart.id
    )}/${TextTransformation.kebabfy(object.chart.id)}.component.ts`;

  try {
    fs.writeFileSync(filePath, code);
    console.info(
      `File ${TextTransformation.kebabfy(object.chart.id)} already exists.`
    );
    console.info(`File successfully written in ${filePath}.`);
  } catch (error) {
    console.info(
      `File ${TextTransformation.kebabfy(object.chart.id)} doesn't exist.`
    );

    try {
      chp.execSync(
        `ng g c components/${TextTransformation.kebabfy(
          object.chart.id
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

export { setChartController };
