import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CONTACT_TYPE: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Tipo de contato",
    id: "contactType",
    components: ["contactTypeForm", "contactTypeTable"],
  }
}