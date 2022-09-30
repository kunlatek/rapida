import * as chp from "child_process";
import * as fs from "fs";
import { ServiceFunctionsEnum } from "../../../../enums/form";
import {
  FormElementInterface,
  ServiceInterface
} from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

let _hasAuthorization: boolean = false;

/**
 * SET CODE
 * @param object
 * @returns
 */
const setFormService = (
  object: MainInterface,
  mainArray: Array<MainInterface> | undefined = undefined
): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let _services: string = ``;

  if (object.form.service) {
    _services += setFormServiceServices(object.form.service);

    object.form.elements.forEach((element) => {
      _services += setFormServiceServicesOverFormElement(element);
    });
  }

  let code = `
  import { HttpClient } from "@angular/common/http";
  import { Injectable } from "@angular/core";
  import { convertJsonToFormData } from "src/app/utils/convert-json-to-form-data";

  @Injectable({
  providedIn: "root",
  })
  export class ${TextTransformation.pascalfy(object.form.id)}Service {
      BASE_URL = "${object.form.service?.baseUrl}";

      constructor(private _httpClient: HttpClient) {}

      ${_services}

      ${_hasAuthorization
      ? `
        refreshToken () {
          return this._httpClient.get(
            \`\${this.BASE_URL}/auth/refresh-token\`, {
            headers: {
              'Authorization': \`Bearer \${sessionStorage.getItem('refreshToken')}\`
            }
          }
          ).toPromise();
        }
        `
      : ``
    }
  }
  `;

  setFormServiceArchitectureAndWriteToFile(object, code);
  return code;
};

const setFormServiceServices = (service: ServiceInterface): string => {
  let hasAuthorization = ``;
  if (service.hasAuthorization) {
    hasAuthorization = `"Authorization": \`Bearer \${sessionStorage.getItem("token")}\``;
    _hasAuthorization = true;
  }

  let code = ``;

  service.methods.forEach((method) => {
    switch (method) {
      case ServiceFunctionsEnum.Get:
        code += `
        getAll(filter: string = "") {
          return this._httpClient.get(
            \`\${this.BASE_URL}/${service.endpoint}\${filter}\`, {
              headers: {
                ${hasAuthorization}
              }
            }
          ).toPromise();
        };
        `;
        break;

      case ServiceFunctionsEnum.Find:
        code += `
        find(id: string) {
          return this._httpClient.get(
            \`\${this.BASE_URL}/${service.endpoint}/\${id}\`,
            {
              headers: {
                ${hasAuthorization}
              }
            }
          ).toPromise();
        };
        `;
        break;

      case ServiceFunctionsEnum.Save:
        code += `
        save(body: any) {
          body = convertJsonToFormData(body, null, new FormData());
          return this._httpClient.post(
          \`\${this.BASE_URL}/${service.endpoint}\`, 
          body,
          {
            headers: {
              ${hasAuthorization}
            }
          }
          ).toPromise();
        };
        `;
        break;

      case ServiceFunctionsEnum.Update:
        code += `
        update(body: any, id: string) {
          body = convertJsonToFormData(body, null, new FormData());
          return this._httpClient.put(
            \`\${this.BASE_URL}/${service.endpoint}/\${id}\`, 
            body,
            {
              headers: {
                ${hasAuthorization}
              }
            }
          ).toPromise();
        };
        `;
        break;

      case ServiceFunctionsEnum.Delete:
        code += `
        delete(id: string) {
          return this._httpClient.delete(
            \`\${this.BASE_URL}/${service.endpoint}/\${id}\`,
            {
              headers: {
                ${hasAuthorization}
              }
            }
          ).toPromise();
        };
        `;
        break;

      case ServiceFunctionsEnum.SoftDelete:
        code += `
        softDelete(id: string) {
          return this._httpClient.put(
            \`\${this.BASE_URL}/${service.endpoint}/\${id}\`,
            {
              headers: {
                ${hasAuthorization}
              }
            }
          ).toPromise();
        };
        `;
        break;

      default:
        break;
    }
  });

  return code;
};

const setFormServiceServicesOverFormElement = (
  element: FormElementInterface
): string => {
  let hasAuthorization = ``;
  if (_hasAuthorization) {
    hasAuthorization = `"Authorization": \`Bearer \${sessionStorage.getItem("token")}\``;
  }
  let code = ``;

  if (element.input) {
    if (element.input.apiRequest) {
      if (element.input.apiRequest.endpoint) {
        code += `
          ${element.input.name}InputRequestToFind(param: string) {
            return this._httpClient.get(
              \`\${this.BASE_URL}/${element.input.apiRequest.endpoint}/\${param}\`, {
              headers: {
                ${hasAuthorization}
              }
            }
            ).toPromise();
        }
        `;
      }

      if (element.input.apiRequest.externalEndpoint) {
        code += `
          ${element.input.name}InputRequestToFind(filter: string = "") {
            return this._httpClient.get(
              \`${element.input.apiRequest.externalEndpoint}\${filter}\`, {
              headers: {
                ${hasAuthorization}
              }
            }
            ).toPromise();
        }
        `;
      }
    }
  }

  if (element.autocomplete) {
    if (element.autocomplete.optionsApi) {
      if (element.autocomplete.optionsApi.endpoint) {
        code += `
          ${element.autocomplete.name}SelectObjectGetAll(filter: string = "") {
            return this._httpClient.get(
              \`\${this.BASE_URL}/${element.autocomplete.optionsApi.endpoint}\${filter}\`, {
              headers: {
                ${hasAuthorization}
              }
            }
            ).toPromise();
        }
        `;
      }

      if (element.autocomplete.optionsApi.externalEndpoint) {
        code += `
          ${element.autocomplete.name}SelectObjectGetAll(filter: string = "") {
            return this._httpClient.get(
              \`${element.autocomplete.optionsApi.externalEndpoint}\${filter}\`, {
              headers: {
                ${hasAuthorization}
              }
            }
            ).toPromise();
        }
        `;
      }
    }
  }

  if (element.select) {
    if (element.select.optionsApi) {
      if (element.select.optionsApi.endpoint) {
        code += `
        ${element.select.name}SelectObjectGetAll() {
          return this._httpClient.get(
            \`\${this.BASE_URL}/${element.select.optionsApi.endpoint}\`, {
            headers: {
              ${hasAuthorization}
            }
          }
          ).toPromise();
        }
        `;
      }

      if (element.select.optionsApi.externalEndpoint) {
        code += `
        ${element.select.name}SelectObjectGetAll() {
          return this._httpClient.get(
            \`${element.select.optionsApi.externalEndpoint}\`, {
            headers: {
              ${hasAuthorization}
            }
          }
          ).toPromise();
        }
        `;
      }
    }
  }

  if (element.array) {
    element.array.elements.forEach((arrayElement) => {
      code += setFormServiceServicesOverFormElement(arrayElement);
    });
  }

  if (element.tabs) {
    element.tabs.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        code += setFormServiceServicesOverFormElement(tabElement);
      });
    });
  }

  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setFormServiceArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  if (!object.form) {
    return;
  }

  const filePath = `${object.projectPath
    }/src/app/components/${TextTransformation.kebabfy(
      object.form.id
    )}/${TextTransformation.kebabfy(object.form.id)}.service.ts`;

  try {
    fs.writeFileSync(filePath, code);
    console.info(
      `File ${TextTransformation.kebabfy(object.form.id)} already exists.`
    );
    console.info(`File successfully written in ${filePath}.`);
  } catch (error) {
    console.info(
      `File ${TextTransformation.kebabfy(object.form.id)} doesn't exist.`
    );

    try {
      chp.execSync(
        `ng g c components/${TextTransformation.kebabfy(
          object.form.id
        )} --skip-import`,
        { cwd: object.projectPath }
      );
    } catch (error) {
      console.warn(error);
    }

    fs.writeFileSync(filePath, code);

    console.info(`File successfully created in ${filePath}.`);
  }
};

export { setFormService };
