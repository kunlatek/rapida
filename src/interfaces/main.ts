import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../enums/main";
import { RouterTypeEnum } from './../enums/form';
import { ChartInterface } from './chart';
import { FormInterface } from "./form";
import { ListInterface } from './list';
import { ModelInterface } from './model';
import { ModuleInterface } from "./module";
import { AppInterface } from "./quickstart";
import { TableInterface } from "./table";
import { TreeInterface } from "./tree";

export interface MainInterface {
  backendFramework?: BackendFrameworkEnum;
  frontendFramework?: FrontendFrameworkEnum;
  envFrontendDev?: string;
  envFrontendProd?: string;
  envBackend?: string;
  cloneFrontendPath?: string;
  cloneBackendPath?: string;
  projectPath?: any;
  comments?: string;
  boilerPlate?: string;
  form?: FormInterface;
  table?: TableInterface;
  chart?: ChartInterface;
  list?: ListInterface;
  tree?: TreeInterface;
  module?: ModuleInterface;
  model?: ModelInterface;
  quickstart?: QuickstartInterface;
  publicRoutes?: RouterTypeEnum[];
};

export interface BuildedFrontendCode {
  component: string;
  module?: string;
  service?: string;
  template?: string;
};

export interface BuildedBackendCode {
  domainModel?: string;
  domainRepository?: string;
  mongooseSchema: string;
  repository?: string;
  controller: string;
};

export interface QuickstartInterface {
  app?: AppInterface[];
};