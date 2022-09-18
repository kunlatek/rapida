import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_COMPANY: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Clientes empresas",
    id: "clientCompany",
    components: ["clientCompanyForm", "clientCompanyTable"],
  }
}