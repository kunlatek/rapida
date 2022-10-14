import { BackendFrameworkEnum } from "../enums/main";
import { BuildedBackendCode, MainInterface } from "../interfaces/main";
import { createLoopbackProject } from "./loopback/main";
import { setUtilsModulesList } from "./loopback/utils/modules-list";

const setBackend = (
  array: Array<MainInterface>,
  index = 0
): BuildedBackendCode => {
  let response: BuildedBackendCode = {
    controller: "",
    model: "",
    repository: "",
    mongooseSchema: "",
  };

  try {
    switch (array[index].backendFramework) {
      case BackendFrameworkEnum.Loopback:
        response = createLoopbackProject(array[index], index);
        setUtilsModulesList(array.filter(object => object.module));
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }

  index = index + 1;

  if (index < array.length) {
    setBackend(array, index);
  }

  return response;
};

export { setBackend };
