import * as chp from "child_process";
import * as fs from "fs";

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
import { quickstartMain } from "./quickstart/main";
import { setTableInfiniteScrollService } from "./table/service/infinite-scroll-table-data-source";
require("dotenv").config();

const createAngularProject = (
  object: MainInterface,
  index: number,
  array: Array<MainInterface>,
): BuildedFrontendCode => {
  process.env.ARRAY_LAYER = "[]";
  process.env.ARRAYS_IN_A_FLOW = "[]";

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
    const controllerCode = setFormController(object, array);
    const serviceCode = setFormService(object, array);
    const templateCode = setFormTemplate(object, array);

    response = {
      component: controllerCode,
      service: serviceCode,
      template: templateCode,
    };
  }

  if (object.table) {
    const controllerCode = setTableController(object, array);
    const serviceCode = setTableService(object);
    const templateCode = setTableTemplate(object);
    const tableInfiniteScrollTemplateCode = setTableInfiniteScrollService(object);

    response = {
      component: controllerCode,
      service: serviceCode,
      template: templateCode,
    };
  }

  if (object.chart) {
    const controllerCode = setChartController(object, array);
    const serviceCode = setChartService(object, array);
    const templateCode = setChartTemplate(object, array);

    response = {
      component: controllerCode,
      service: serviceCode,
      template: templateCode,
    };
  }

  if (object.module) {
    const controllerCode = setModuleController(object, array);
    const templateCode = setModuleTemplate(object, array);
    response = {
      component: controllerCode,
      template: templateCode,
    };
  }

  if (object.quickstart) {
    quickstartMain(object);
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
    chp.execSync(`npm install --save --legacy-peer-deps`, { cwd: projectPath });
  }
};

export { createAngularProject };
