import { BuildedFrontendCode, MainInterface } from "../../../interfaces/main";
import { setTableController } from "./controller/main";
import { setTableService } from "./service/main";
import { setTableTemplate } from "./template/main";

const tableMain = (object: MainInterface): BuildedFrontendCode => {
  let response: BuildedFrontendCode = {
    component: "",
    service: "",
    template: "",
  };

  try {
    const tableControllerCode = setTableController(object);
    const tableServiceCode = setTableService(object);
    const tableTemplateCode = setTableTemplate(object);

    response = {
      component: tableControllerCode,
      service: tableServiceCode,
      template: tableTemplateCode,
    };
  } catch (error) {
    console.error(error);
  }

  return response;
};

export { tableMain };
