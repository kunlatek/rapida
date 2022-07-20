import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

const DAXTV_CLIENT_COMPANY: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Pacotes",
    id: "daxTvClientCompany",
    components: ["daxTvClientCompanyForm", "daxTvClientCompanyTable"],
  }
}