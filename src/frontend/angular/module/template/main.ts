import * as chp from "child_process";
import * as fs from "fs";
import { MainInterface } from "../../../../interfaces/main";
import { ModuleInterface } from "../../../../interfaces/module";
import { TextTransformation } from "../../../../utils/text.transformation";

/**
 * SET CODE
 * @param object
 * @returns
 */
const setModuleTemplate = (object: MainInterface, mainArray: Array<MainInterface> | undefined = undefined,): string => {
  if (!object.module) {
    console.info("Only modules set here");
    return ``;
  }

  let components = setModuleComponents(object.module);

  let code = `
  ${components}
  `;

  setModuleTemplateArchitectureAndWriteToFile(object, code);
  return code;
};

const setModuleComponents = (module: ModuleInterface): string => {
  let code = ``;
  let forms = 0;

  for (let index = 0; index < module.components.length; index++) {
    const element = TextTransformation.kebabfy(module.components[index]);

    const componentType = element.split('-')[element.split('-').length - 1];
    if (componentType === 'form') {
      forms = forms + 1;
    }
  }

  if (forms > 1) {
    code += `<mat-stepper>`;
  }
  module.components.forEach(component => {
    if (forms > 1) {
      code += `
      <mat-step> 
        <ng-template matStepLabel>${TextTransformation.kebabfy(component)}</ng-template>`;
    }
    code += `<app-${TextTransformation.kebabfy(component)} _moduleRelated="${module.title}"></app-${TextTransformation.kebabfy(component)}> `;
    if (forms > 1) {
      code += `</mat-step>`;
    }
  });

  if (forms > 1) {
    code += `</mat-stepper>`;
  }

  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setModuleTemplateArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  if (!object.module) {
    return;
  }

  const filePath = `${object.projectPath
    }/src/app/modules/${TextTransformation.kebabfy(
      object.module.id
    )}/${TextTransformation.kebabfy(object.module.id)}.component.html`;

  try {
    fs.writeFileSync(filePath, code);
    console.info(
      `File ${TextTransformation.kebabfy(object.module.id)} already exists.`
    );
    console.info(`File successfully written in ${filePath}.`);
  } catch (error) {
    console.info(
      `File ${TextTransformation.kebabfy(object.module.id)} doesn't exist.`
    );

    try {
      chp.execSync(
        `ng g c modules/${TextTransformation.kebabfy(
          object.module.id
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

export {
  setModuleTemplate
};
