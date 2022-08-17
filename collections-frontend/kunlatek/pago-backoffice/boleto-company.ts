import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const BOLETO_COMPANY: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  module: {
    id: "boletoCompany",
    title: "Boleto de empresa",
    components: ["boletoCompanyForm", "boletoCompanyTable"],
  }
}