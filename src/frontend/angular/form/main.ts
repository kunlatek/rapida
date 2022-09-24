import { ArrayFeaturesInterface } from "../../../interfaces/array";
import { BuildedFrontendCode, MainInterface } from "../../../interfaces/main";
import { setArrayLayer } from "../core/array";
import { setFormController } from "./controller/main";
import { setFormService } from "./service/main";
import { setFormTemplate } from "./template/main";
require("dotenv").config();

let _arrayLayer: Array<ArrayFeaturesInterface> = [JSON.parse(
  process.env.ARRAY_LAYER!
)];

const formMain = (object: MainInterface): BuildedFrontendCode => {
  let response: BuildedFrontendCode = {
    component: "",
    service: "",
    template: "",
  };

  setArrayLayer(object.form!.elements);

  _arrayLayer = JSON.parse(process.env.ARRAY_LAYER!);

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
