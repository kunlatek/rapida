import { BackendFrameworkEnum } from "../enums/main";
import { MainInterface, BuildedBackendCode } from "../interfaces/main";
import { createLoopbackProject } from "./loopback/main";

const setBackend = (
  array: Array<MainInterface>,
  index = 0
): BuildedBackendCode => {
  let response: BuildedBackendCode = {
    controller: "",
    model: "",
    repository: "",
  };

  try {
    switch (array[index].backendFramework) {
      case BackendFrameworkEnum.Loopback:
        response = createLoopbackProject(array[index], index);
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