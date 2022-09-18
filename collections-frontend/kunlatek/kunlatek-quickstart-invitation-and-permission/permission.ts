import {
  FrontendFrameworkEnum,
} from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const PERMISSION: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Permissão",
    id: "permissionGroup",
    components: ["permissionForm", "permissionTable"],
  },
};
