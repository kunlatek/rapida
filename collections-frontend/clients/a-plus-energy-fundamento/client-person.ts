import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_PERSON: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Clientes pessoas",
    id: "clientPerson",
    components: ["clientPersonForm", "clientPersonTable"],
  }
}