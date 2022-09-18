import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const FORM_ELEMENT: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Elemento de formulário",
    id: "formElement",
    components: ["formElementForm", "formElementTable"],
  }
}