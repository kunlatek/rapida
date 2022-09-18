import {
  BackendFrameworkEnum,
  FrontendFrameworkEnum,
} from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const MULTIVERSE: MainInterface = {
  backendFramework: BackendFrameworkEnum.Loopback,
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Multiverso",
    id: "multiverse",
    components: ["multiverseForm", "multiverseTable"],
  },
};
