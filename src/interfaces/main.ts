import { ModelInterface } from './model';
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../enums/main";
import { FormInterface } from "./form";
import { ModuleInterface } from "./module";
import { TableInterface } from "./table";
import { TreeInterface } from "./tree";
import { ChartInterface } from './chart';
import { ListInterface } from './list';

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
};

export interface BuildedFrontendCode {
  component: string;
  module?: string;
  service?: string;
  template?: string;
};

export interface BuildedBackendCode {
  model: string;
  controller: string;
  repository?: string;
  service?: string;
};