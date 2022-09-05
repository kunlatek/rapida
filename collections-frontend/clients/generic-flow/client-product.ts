import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_PRODUCT: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Produtos",
    id: "clientProduct",
    components: ["clientProductForm", "clientProductTable"],
  }
}