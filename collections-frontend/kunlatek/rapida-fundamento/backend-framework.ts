import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const BACKEND_FRAMEWORK: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Framework de backend",
    id: "backendFramework",
    components: ["backendFrameworkForm", "backendFrameworkTable"],
  }
}