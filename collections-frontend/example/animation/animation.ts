import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const ANIMATION: MainInterface = {
    frontendFramework: FrontendFrameworkEnum.Angular,
    module: {
        id:"animation",
        title: "Animações",
        components: [
            "animationForm",
            "animationTable",
        ],
    }
}