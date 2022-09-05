import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const BOLETO_PERSON: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  module: {
    id: "boletoPerson",
    title: "Boleto de pessoa",
    components: ["boletoPersonForm", "boletoPersonTable"],
  }
}