import { ServiceFunctionsEnum } from "../../../src/enums/form";
import { MainInterface } from "../../../src/interfaces/main";

export const ANIMATION_CHART: MainInterface = {
  chart: {
    id: "animationChart",
    line: {
      datasets: [{
        data: [1, 2, 3]
      }],
      labels: ["Uma coisa", "Outra coisa", "Mais uma coisa"]
    },
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "animations",
      hasAuthorization: true,
      methods: [
        ServiceFunctionsEnum.Get,
        ServiceFunctionsEnum.Delete,
        ServiceFunctionsEnum.Find,
      ],
    },
  }
};