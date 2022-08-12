import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const QUICKSTART_BACKEND_REPOSITORY: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Repositório do quickstart do backend",
    id: "quickstartBackendRepository",
    components: ["quickstartBackendRepositoryForm", "quickstartBackendRepositoryTable"],
  }
}