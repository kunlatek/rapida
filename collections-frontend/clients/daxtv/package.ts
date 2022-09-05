import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const DAXTV_PACKAGE: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Pacotes",
    id: "daxtvPackage",
    components: ["daxtvPackageForm", "daxtvPackageTable"],
  }
}