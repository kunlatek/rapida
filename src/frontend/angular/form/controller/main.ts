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

const setFormController = (object: MainInterface, mainArray: Array<MainInterface> | undefined = undefined,): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let _methods = setFormControllerMethods(object);
  let _imports = setFormControllerImports(object);
  let _properties = setFormControllerProperties(object);
  let _constructorParams = setFormControllerConstructorParams(object);
  let _constructorArguments = setFormControllerConstructorArguments(object);
  let code = ``;

  object.form.elements.forEach(element => {
    verifyFormElement(element);
  });

  code += `
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
  export class ${TextTransformation.pascalfy(object.form.id)}Component ${_hasCondition ? `implements OnChanges` : ``}{
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
    return "";
  }

  const filePath = `${object.projectPath
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
