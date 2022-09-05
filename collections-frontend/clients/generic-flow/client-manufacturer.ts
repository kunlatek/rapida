import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_MANUFACTURER: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Fábricas",
    id: "clientManufacturer",
    components: ["clientManufacturerForm", "clientManufacturerTable"],
  }
}