import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_SETTLEMENT: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Instalações",
    id: "clientSettlement",
    components: ["clientSettlementForm", "clientSettlementTable"],
  }
}