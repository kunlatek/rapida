import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const DATA_TYPE: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Tipo de dado",
    id: "dataType",
    components: ["dataTypeForm", "dataTypeTable"],
  }
}