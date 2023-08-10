import { ArrayInterface, FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";

const setLink = (
  object: MainInterface,
  element: FormElementInterface,
  conditions: string,
  array: ArrayInterface | undefined = undefined
) => {
  if (!object.form || !element.link) {
    return "";
  };


  const values = element.link.values;
  const baseUrl = element.link.baseUrl;
  let code = ``;
  let url = baseUrl;
  let conditionShowLink = ``;

  if (baseUrl.split("?").length < 2) {
    const bound = baseUrl.split(/[[0-9]]/).length - 1;
    for (let i = 0; i < bound; i++) {
      url = url.replace(`[${i}]`, `{{${object.form.id}Form.value.${values[i]}}}`);
      conditionShowLink += `&& ${object.form.id}Form.value.${values[i]}`;
    }
  }

  if (baseUrl.split("?").length > 1) {
    const bound = baseUrl.split(/[[0-9]]/).length - 1;
    for (let i = 0; i < bound; i++) {
      url = url.replace(`[${i}]`, `${values[i]}={{${object.form.id}Form.value.${values[i]}}}`);
    }
  }

  code +=
    `<div *ngIf="!isLoading ${conditionShowLink}" class="lines link" 
        style="width: 100%; margin-bottom: 30px;">
      <a href="${url}"
        target = "_blank" >${url}
      </a>
    </div>
    <div *ngIf="isLoading"
      style="clear: both" >
    <div style="color: rgba(0, 0, 0, 0.54);font-size: 12px;margin-bottom: -10px;"> Carregando... </div>
      <div class="lines shimmer"
        style="width: 250px;margin-right: 30px;"> 
      </div>
    </div>
    `;

  return code;
};

export { setLink };
