import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_PERSON: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  module: {
    id: "clientPerson",
    title: "Cliente pessoa",
    components: ["clientPersonForm", "clientPersonTable"],
  },
}