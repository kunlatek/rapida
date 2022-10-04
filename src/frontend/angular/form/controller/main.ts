import * as chp from "child_process";
import * as fs from "fs";
import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { setFormControllerConstructorArguments } from "./constructor-args/main";
import { setFormControllerConstructorParams } from "./constructor-params/main";
import { setFormControllerImports } from "./imports/main";
import { setFormControllerMethods } from "./methods/main";
import { setFormControllerProperties } from "./properties/main";

/**
 * SET CODE
 * @param object
 * @returns
 */

let _hasCondition = false;

const setFormController = (
  object: MainInterface,
  mainArray: Array<MainInterface> | undefined = undefined
): string => {
  if (!object.form) {
    return ``;
  }

  const _methods: string = setFormControllerMethods(object);
  const _imports: string = setFormControllerImports(object);
  const _properties: string = setFormControllerProperties(object);
  const _constructorParams: string = setFormControllerConstructorParams(object);
  const _constructorArguments: string = setFormControllerConstructorArguments(object);
  const objectIdKebab: string = TextTransformation.kebabfy(object.form.id);
  const objectIdPascal: string = TextTransformation.pascalfy(object.form.id);

  let code = "";

  object.form.elements.forEach((element) => {
    verifyFormElement(element);
  });

  code += `
  ${_imports}

  @Component({
    selector: "app-${objectIdKebab}",
    templateUrl: "./${objectIdKebab}.component.html",
    styleUrls: ["./${objectIdKebab}.component.scss"],
  })
  export class ${objectIdPascal}Component {
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

const verifyFormElement = (element: FormElementInterface): void => {
  const formElements = [
    "input",
    "autocomplete",
    "button",
    "checkbox",
    "radio",
    "select",
    "slide",
  ];
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  if (formElements.includes(type)) {
    if (value.conditions) {
      _hasCondition = true;
    }
  }
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
    return;
  }
  const objectId = object.form.id;
  const objectIdKebab = TextTransformation.kebabfy(objectId);
  const projectPath = object.projectPath;

  const filePath = `${projectPath}/src/app/components/${objectIdKebab}/${objectIdKebab}.component.ts`;

  try {
    fs.writeFileSync(filePath, code);
    console.info(`File ${objectIdKebab} already exists.`);
    console.info(`File successfully written in ${filePath}.`);
  } catch (error) {
    console.info(`File ${objectIdKebab} doesn't exist.`);

    try {
      chp.execSync(
        `ng g c components/${objectIdKebab} --skip-import`,
        { cwd: object.projectPath }
      );
    } catch (error) {
      console.warn(error);
    }

    fs.writeFileSync(filePath, code);

    console.info(`File successfully created in ${filePath}.`);
  }
};

export {
  setFormController
};
