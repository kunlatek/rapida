import { FrontendFrameworkEnum } from "../enums/main";
import { BuildedFrontendCode, MainInterface } from "../interfaces/main";
import { createAngularProject } from "./angular/main";

const setFrontend = (
  array: Array<MainInterface>,
  index = 0
): BuildedFrontendCode => {
  let response: any = {
    component: "",
    module: "",
    service: "",
    template: "",
  };

  if (!array[index].frontendFramework) {
    return response;
  }

  try {
    switch (array[index].frontendFramework) {
      case FrontendFrameworkEnum.Angular:
        response = createAngularProject(array[index], index);
        break;

      default:
        
        break;
    }
  } catch (error) {
    console.error(error);
  }

  index = index + 1;

  if (index < array.length) {
    setFrontend(array, index);
  }

  return response;
};

export { setFrontend };
