import * as fs from "fs";
import * as chp from "child_process";

import { BuildedBackendCode, MainInterface } from "../../interfaces/main";
import { controllerMain } from "./controller/main";
import { modelMain } from "./model/main";
import { repositoryMain } from "./repository/main";
import { FormElementInterface } from "../../interfaces/form";
import { FormInputTypeEnum } from "../../enums/form";

const createLoopbackProject = (
  object: MainInterface,
  index: number
): BuildedBackendCode => {
  let response: BuildedBackendCode = {
    model: "",
    controller: "",
    repository: "",
    service: "",
  };

  if (!doesProjectFolderExists(object)) {
    setBaseProject(object);
  }

  if (object.form) {
    const controllerCode = controllerMain(object);
    const modelCode = modelMain(object);
    const repositoryCode = repositoryMain(object);

    response = {
      controller: controllerCode,
      model: modelCode,
      repository: repositoryCode,
    };
  }

  return response;
};

const setBaseProject = (object: MainInterface) => {
  const projectName = object.projectPath.split("/").slice(-1);
  const projectPath = `${object.projectPath}-api`;
  const clonePath = object.cloneBackendPath;
  const projectFolder = projectPath.split(/[\/]+/).pop();
  const splitProjectFolder = projectPath.split(/[\/]+/);
  const projectFolderParent = splitProjectFolder
    .slice(0, splitProjectFolder.length - 1)
    .join("/");
  const nodeModulePath = `${projectPath}/node_modules`;

  chp.execSync(`git clone ${clonePath} ${projectFolder}`, {
    cwd: projectFolderParent,
  });

  fs.writeFileSync(
    `${projectPath}/.env`,
    `
    PROJECT=${projectName}
    ${object.envBackend}
    `
  );

  try {
    fs.readdirSync(nodeModulePath);
    console.info(`Folder ${nodeModulePath} already exists.`);
  } catch (error) {
    console.info(`Folder node_module isn't created. Running npm install.`);
    chp.execSync(`npm install --save --legacy-peer-deps`, { cwd: projectPath });
  }
};

const doesProjectFolderExists = (object: MainInterface) => {
  const projectPath = `${object.projectPath}-api`;
  try {
    fs.readdirSync(projectPath);
    console.info(`Project folder ${projectPath} already exists.`);
    return true;
  } catch (error) {
    console.info(`Project folder ${projectPath} doesn't exist.`);
    return false;
  }
}

const getAllElements = (
  elementList: Array<FormElementInterface>,
  elementsToReturn: Array<FormElementInterface> = [],
): Array<FormElementInterface> => {

  const validTypes = [
    "checkbox",
    "radio",
    "datalist",
    "fieldset",
    "input",
    "select",
    "slide",
    "textarea",
    "text",
    "autocomplete",

    'array',
  ];

  elementList.forEach(element => {
    const type = Object.keys(element)[0];

    if (validTypes.includes(type)) {

      elementsToReturn.push(element);

    } else if (type === "tabs") {

      element.tabs?.forEach((tab) => {
        elementsToReturn = getAllElements(tab.elements, elementsToReturn);
      });

    }
    // else if (type === "array") {

    //   if (element.array?.elements) {
    //     elementsToReturn = [
    //       {
    //         select: {
    //           label: element.array?.title,
    //           name: element.array?.id,
    //           isMultiple: true,
    //           type: FormInputTypeEnum.Text,
    //         },
    //       },
    //       ...getAllElements(element.array?.elements, elementsToReturn),
    //     ];

    //   }

    // }

  })

  return elementsToReturn;
}

export {
  createLoopbackProject,
  getAllElements,
};
