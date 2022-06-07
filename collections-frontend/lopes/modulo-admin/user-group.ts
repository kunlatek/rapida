import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const USERS_GROUP: MainInterface = {
    frontendFramework: FrontendFrameworkEnum.Angular,
    module: {
        id:"usersGroup",
        title: "Grupos de usuários",
        components: [
            "usersGroupForm",
            "usersGroupTable",
        ],
    }
}