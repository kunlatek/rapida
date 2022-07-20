import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

const DAXTV_PACKAGE: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Pacotes",
    id: "daxTvPackage",
    components: ["daxTvPackageForm", "daxTvPackageTable"],
  }
}