import {
  BackendFrameworkEnum,
  FrontendFrameworkEnum,
} from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const PROJECT: MainInterface = {
  backendFramework: BackendFrameworkEnum.Loopback,
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Projeto",
    id: "project",
    components: ["projectForm", "projectTable"],
  },
};
