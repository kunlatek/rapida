import { BuildedFrontendCode, MainInterface } from "../../../interfaces/main";
import { setModuleController } from "./controller/main";

const moduleMain = (object: MainInterface): BuildedFrontendCode => {
  let response: BuildedFrontendCode = {
    component: "",
  };

  try {
    const moduleControllerCode = setModuleController(object);

    response = {
      component: moduleControllerCode,
    };
  } catch (error) {
    console.error(error);
  }

  return response;
};

export { moduleMain };
