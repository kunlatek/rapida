import {
  FrontendFrameworkEnum,
} from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const RELATED_USER: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Usuário relacionado",
    id: "relatedUser",
    components: ["relatedUserForm", "relatedUserTable"],
  },
};
