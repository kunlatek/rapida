import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const DAXTV_USER: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Usuário",
    id: "daxtvUser",
    components: ["daxtvUserForm", "daxtvUserTable"],
  }
}