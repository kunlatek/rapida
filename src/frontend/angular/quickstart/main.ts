import { BuildedFrontendCode, MainInterface } from "../../../interfaces/main";
import { setAppTemplate } from "./app/template/main";

const quickstartMain = (object: MainInterface) => {
  let response: BuildedFrontendCode = {
    component: "",
    module: "",
    service: "",
    template: "",
  };

  if (!object.quickstart) {
    return response;
  }

  const quickstart = object.quickstart;

  if (quickstart.app) {
    // const controllerCode = setAppController(object);
    // const serviceCode = setAppService(object);
    const templateCode = setAppTemplate(object);

    response = {
      component: "",
      service: "",
      template: templateCode,
    };
  }
};

export {
  quickstartMain
};
