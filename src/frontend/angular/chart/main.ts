import { BuildedFrontendCode, MainInterface } from "../../../interfaces/main";
import { setChartController } from "./controller/main";
import { setChartService } from "./service/main";
import { setChartTemplate } from "./template/main";

const chartMain = (object: MainInterface): BuildedFrontendCode => {
  let response: BuildedFrontendCode = {
    component: "",
    service: "",
    template: "",
  };

  try {
    const chartControllerCode = setChartController(object);
    const chartServiceCode = setChartService(object);
    const chartTemplateCode = setChartTemplate(object);

    response = {
      component: chartControllerCode,
      service: chartServiceCode,
      template: chartTemplateCode,
    };
  } catch (error) {
    console.error(error);
  }

  return response;
};

export { chartMain };
