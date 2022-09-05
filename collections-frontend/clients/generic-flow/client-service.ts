import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_SERVICE: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Serviços",
    id: "clientService",
    components: ["clientServiceForm", "clientServiceTable"],
  }
}