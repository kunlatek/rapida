import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const MODULE: MainInterface = {
    frontendFramework: FrontendFrameworkEnum.Angular,
    module: {
        id:"module",
        title: "Módulos",
        components: [
            "moduleForm",
            "moduleTable",
        ],
    }
}