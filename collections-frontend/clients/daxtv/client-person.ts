import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const DAXTV_CLIENT_PERSON: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Pacotes",
    id: "daxtvClientPerson",
    components: ["daxtvClientPersonForm", "daxtvClientPersonTable"],
  }
}