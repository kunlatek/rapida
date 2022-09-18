import {
  BackendFrameworkEnum,
  FrontendFrameworkEnum,
} from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const MODULE: MainInterface = {
  backendFramework: BackendFrameworkEnum.Loopback,
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Módulo",
    id: "module",
    components: ["moduleForm", "moduleTable"],
  },
};
