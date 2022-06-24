import { BuildedFrontendCode, MainInterface } from "../../../interfaces/main";
import { setFormController } from "./controller/main";
import { setFormService } from "./service/main";
import { setFormTemplate } from "./template/main";

const formMain = (object: MainInterface): BuildedFrontendCode => {
  let response: BuildedFrontendCode = {
    component: "",
    service: "",
    template: "",
  };

  try {
    const formControllerCode = setFormController(object);
    const formServiceCode = setFormService(object);
    const formTemplateCode = setFormTemplate(object);

    response = {
      component: formControllerCode,
      service: formServiceCode,
      template: formTemplateCode,
    };
  } catch (error) {
    console.error(error);
  }

  return response;
};

export { formMain };
