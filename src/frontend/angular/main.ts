import * as fs from "fs";
import * as chp from "child_process";

import { BuildedFrontendCode, MainInterface } from "../../interfaces/main";

import { setChartController } from "./chart/controller/main";
import { setChartService } from "./chart/service/main";
import { setChartTemplate } from "./chart/template/main";

import { setFormController } from "./form/controller/main";
import { setFormService } from "./form/service/main";
import { setFormTemplate } from "./form/template/main";

import { setTableController } from "./table/controller/main";
import { setTableService } from "./table/service/main";
import { setTableTemplate } from "./table/template/main";

import { setModuleController } from "./module/controller/main";
import { setModuleTemplate } from "./module/template/main";

const createAngularProject = (
  object: MainInterface,
  index: number
): BuildedFrontendCode => {
  let response: BuildedFrontendCode = {
    component: "",
    module: "",
    service: "",
    template: "",
  };

  if (index === 0) {
    setBaseProject(object);
  }

  if (object.form) {
    const controllerCode = setFormController(object);
    const serviceCode = setFormService(object);
    const templateCode = setFormTemplate(object);

    response = {
      component: controllerCode,
      service: serviceCode,
      template: templateCode,
    };
  }

  if (object.table) {
    const controllerCode = setTableController(object);
    const serviceCode = setTableService(object);
    const templateCode = setTableTemplate(object);

    response = {
      component: controllerCode,
      service: serviceCode,
      template: templateCode,
    };
  }

  if (object.chart) {
    const controllerCode = setChartController(object);
    const serviceCode = setChartService(object);
    const templateCode = setChartTemplate(object);

    response = {
      component: controllerCode,
      service: serviceCode,
      template: templateCode,
    };
  }

  if (object.module) {
    const controllerCode = setModuleController(object);
    const templateCode = setModuleTemplate(object);
    response = {
      component: controllerCode,
      template: templateCode,
    };
  }

  // console.info(response);

  return response;
};

const setBaseProject = (object: MainInterface) => {
  const projectPath = object.projectPath;
  const cloneFrontendPath = object.cloneFrontendPath;
  const projectFolder = projectPath.split(/[\/]+/).pop();
  const splitProjectFolder = projectPath.split(/[\/]+/);
  const projectFolderParent = splitProjectFolder
    .slice(0, splitProjectFolder.length - 1)
    .join("/");
  const nodeModulePath = `${projectPath}/node_modules`;
  const environmentPath = `${projectPath}/src/environments`;

  try {
    fs.readdirSync(projectPath);
    console.info(`Project folder ${projectPath} already exists.`);
  } catch (error) {
    chp.execSync(`git clone ${cloneFrontendPath} ${projectFolder}`, {
      cwd: projectFolderParent,
    });

    if (object.envFrontendDev)
      fs.writeFileSync(
        `${environmentPath}/environment.ts`,
        object.envFrontendDev
      );

    if (object.envFrontendProd)
      fs.writeFileSync(
        `${environmentPath}/environment.prod.ts`,
        object.envFrontendProd
      );

    console.info(`Project folder ${projectPath} created.`);
  }

  try {
    fs.readdirSync(nodeModulePath);
    console.info(`Folder ${nodeModulePath} already exists.`);
  } catch (error) {
    console.info(`Folder node_module isn't created. Running npm install.`);
    chp.execSync(`npm install`, { cwd: projectPath });
  }
};

export { createAngularProject };
