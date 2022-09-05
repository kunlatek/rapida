import {
  FrontendFrameworkEnum,
} from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const INVITATION: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  module: {
    title: "Convite",
    id: "invitation",
    components: ["invitationForm", "invitationTable"],
  },
};
