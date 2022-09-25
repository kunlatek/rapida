import { BuildedFrontendCode, MainInterface } from "../../../interfaces/main";
import { setArrayLayer } from "../core/array";
import { setFormController } from "./controller/main";
import { setFormService } from "./service/main";
import { setFormTemplate } from "./template/main";

const formMain = async (object: MainInterface): Promise<BuildedFrontendCode> => {
  await setArrayLayer(object.form!.elements);
  let response: BuildedFrontendCode = {
    component: "",
    service: "",
    template: "",
  };


  try {
    const formControllerCode = await setFormController(object);
    const formServiceCode = await setFormService(object);
    const formTemplateCode = await setFormTemplate(object);

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
