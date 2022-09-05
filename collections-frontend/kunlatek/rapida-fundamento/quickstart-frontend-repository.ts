import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const QUICKSTART_FRONTEND_REPOSITORY: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Repositório do quickstart do frontend",
    id: "quickstartFrontendRepository",
    components: ["quickstartFrontendRepositoryForm", "quickstartFrontendRepositoryTable"],
  }
}