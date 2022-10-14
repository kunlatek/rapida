import { MainInterface } from "../../../src/interfaces/main";

export const ANIMATION: MainInterface = {
    module: {
        id: "animation",
        title: "Animação",
        icon: "theaters",
        components: [
            "animationForm",
            "animationTable",
        ],
    }
};