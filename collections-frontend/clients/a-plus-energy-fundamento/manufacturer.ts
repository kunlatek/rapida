import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const MANUFACTURER: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Fábricas",
    id: "manufacturer",
    components: ["manufacturerForm", "manufacturerTable"],
  }
}