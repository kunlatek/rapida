import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

const DAXTV_USER: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Usuário",
    id: "daxTvUser",
    components: ["daxTvUserForm", "daxTvUserTable"],
  }
}