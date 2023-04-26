import * as chp from "child_process";
import * as fs from "fs";

import { FormElementInterface } from "../../interfaces/form";
import { BuildedBackendCode, MainInterface } from "../../interfaces/main";
import { controllerMain } from "./controller/main";
import { entityMain } from "./domain/entities/main";
import { domainRepositoryMain } from "./domain/repositories/main";
import { repositoryMain } from "./repositories/main/main";
import { repositorySchemaMain } from "./repositories/schema/main";

const createLoopbackProject = (
  object: MainInterface,
  index: number
): BuildedBackendCode => {
  let response: BuildedBackendCode = {
    domainModel: "",
    domainRepository: "",
    controller: "",
    repository: "",
    mongooseSchema: "",
  };

  if (!doesProjectFolderExists(object)) {
    setBaseProject(object);
  }

  if (object.form) {
    const domainModelCode = entityMain(object);
    const domainRepositoryCode = domainRepositoryMain(object);
    const mongooseSchemaCode = repositorySchemaMain(object);
    const repositoryCode = repositoryMain(object);
    const controllerCode = controllerMain(object);

    response = {
      domainModel: domainModelCode,
      domainRepository: domainRepositoryCode,
      controller: controllerCode,
      mongooseSchema: mongooseSchemaCode,
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
};

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
    'date',

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

  });

  return elementsToReturn;
};

const getSpecifiqueTypesElements = (
  elementList: Array<FormElementInterface>,
  typesToCheck: Array<string> = [],
  elementsToReturn: string[] = [],
): string[] => {

  elementList.forEach((element: FormElementInterface) => {
    const type = Object.keys(element)[0];
    const value = Object.values(element)[0];

    if (typesToCheck.includes(value.type) || (value.optionsApi && typesToCheck.includes('objectId'))) {

      elementsToReturn = [...elementsToReturn, value.name];

    } else if (type === "tabs" || type === "array") {

      element.tabs?.forEach((tab) => {
        elementsToReturn = [...elementsToReturn, ...getSpecifiqueTypesElements(tab.elements, typesToCheck, elementsToReturn)];
      });

    }

  });

  return [...new Set(elementsToReturn)];
};

export {
  createLoopbackProject,
  getAllElements,
  getSpecifiqueTypesElements,
};

