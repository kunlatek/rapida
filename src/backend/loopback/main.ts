import * as fs from "fs";
import * as chp from "child_process";

import { BuildedBackendCode, MainInterface } from "../../interfaces/main";
import { controllerMain } from "./controller/main";
import { modelMain } from "./model/main";
import { repositoryMain } from "./repository/main";

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

  if (index === 0) {
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

  try {
    fs.readdirSync(projectPath);
    console.info(`Project folder ${projectPath} already exists.`);
  } catch (error) {
    console.info(`Project folder ${projectPath} doesn't exist.`);
    chp.execSync(`git clone ${clonePath} ${projectFolder}`, {
      cwd: projectFolderParent,
    });
  }

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
    chp.execSync(`npm install`, { cwd: projectPath });
  }
};

export { createLoopbackProject };
