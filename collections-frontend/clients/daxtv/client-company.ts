import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const DAXTV_CLIENT_COMPANY: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Pacotes",
    id: "daxtvClientCompany",
    components: ["daxtvClientCompanyForm", "daxtvClientCompanyTable"],
  }
}