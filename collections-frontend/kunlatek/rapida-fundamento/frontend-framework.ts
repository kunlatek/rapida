import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const FRONTEND_FRAMEWORK: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Framework de frontend",
    id: "frontendFramework",
    components: ["frontendFrameworkForm", "frontendFrameworkTable"],
  }
}