import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CHARACTER: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    id: "character",
    title: "Personagens",
    components: ["characterForm", "characterTable"],
  },
};
