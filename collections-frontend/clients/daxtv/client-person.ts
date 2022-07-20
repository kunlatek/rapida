import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

const DAXTV_CLIENT_PERSON: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Pacotes",
    id: "daxTvClientPerson",
    components: ["daxTvClientPersonForm", "daxTvClientPersonTable"],
  }
}