import * as chp from "child_process";
import * as fs from "fs";
import { ServiceFunctionsEnum } from "../../../../enums/form";
import { ServiceInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

let _hasAuthorization: boolean = false;

/**
 * SET CODE
 * @param object
 * @returns
 */
const setChartService = (object: MainInterface, mainArray: Array<MainInterface> | undefined = undefined,): string => {
  if (!object.chart) {
    console.info("Only charts set here");
    return ``;
  }

  let _services: string = setChartServiceServices(object);

  let code = `
  import { HttpClient } from "@angular/common/http";
  import { Injectable } from "@angular/core";

  @Injectable({
  providedIn: "root",
  })
  export class ${TextTransformation.pascalfy(object.chart.id)}Service {
      BASE_URL = "${object.chart.service?.baseUrl}";

      constructor(private _httpClient: HttpClient) {}

      getDetails(filter: string = "") {
        return this._httpClient
          .get(\`\${this.BASE_URL}/${object.chart.service?.endpoint
    }/details?\${filter}\`, {
            headers: {
              Authorization: \`Bearer \${sessionStorage.getItem("token")}\`,
            },
          });
      }
      
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
          );
        }
        `
      : ``
    }
  }
  `;

  setChartServiceArchitectureAndWriteToFile(object, code);
  return code;
};

// SET SERVICES
const setChartServiceServices = (object: MainInterface) => {
  let code = ``;

  if (object.chart?.service) {
    code += setChartServiceServicesOverChartElement(
      object,
      object.chart?.service
    );
  }

  return code;
};

const setChartServiceServicesOverChartElement = (
  object: MainInterface,
  element: ServiceInterface
) => {
  let hasAuthorization = ``;
  if (element.hasAuthorization) {
    hasAuthorization = `"Authorization": \`Bearer \${sessionStorage.getItem("token")}\``;
    _hasAuthorization = true;
  }

  let code = ``;

  element.methods.forEach((method) => {
    switch (method) {
      case ServiceFunctionsEnum.Get:
        code += `
        getAll(filter: string = "") {
          return this._httpClient.get(
            \`\${this.BASE_URL}/${element.endpoint}\${filter}\`, {
              headers: {
                ${hasAuthorization}
              }
            }
          );
        };
        `;
        break;

      case ServiceFunctionsEnum.Find:
        code += `
        find(id: string) {
          return this._httpClient.get(
            \`\${this.BASE_URL}/${element.endpoint}/\${id}\`,
            {
              headers: {
                ${hasAuthorization}
              }
            }
          );
        };
        `;
        break;

      case ServiceFunctionsEnum.Save:
        code += `
        save(body: any) {
          return this._httpClient.post(
          \`\${this.BASE_URL}/${element.endpoint}\`, 
          body,
          {
            headers: {
              ${hasAuthorization}
            }
          }
          );
        };
        `;
        break;

      case ServiceFunctionsEnum.Update:
        code += `
        update(body: any, id: string) {
          return this._httpClient.put(
            \`\${this.BASE_URL}/${element.endpoint}/\${id}\`, 
            body,
            {
              headers: {
                ${hasAuthorization}
              }
            }
          );
        };
        `;
        break;

      case ServiceFunctionsEnum.Delete:
        code += `
        delete(id: string) {
          return this._httpClient.delete(
            \`\${this.BASE_URL}/${element.endpoint}/\${id}\`,
            {
              headers: {
                ${hasAuthorization}
              }
            }
          );
        };
        `;
        break;

      case ServiceFunctionsEnum.SoftDelete:
        code += `
        softDelete(id: string) {
          return this._httpClient.put(
            \`\${this.BASE_URL}/${element.endpoint}/\${id}\`,
            {
              headers: {
                ${hasAuthorization}
              }
            }
          );
        };
        `;
        break;

      default:
        break;
    }
  });

  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setChartServiceArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  if (!object.chart) {
    return;
  }

  const filePath = `${object.projectPath
    }/src/app/components/${TextTransformation.kebabfy(
      object.chart.id
    )}/${TextTransformation.kebabfy(object.chart.id)}.service.ts`;

  try {
    fs.writeFileSync(filePath, code);
    console.info(
      `File ${TextTransformation.kebabfy(object.chart.id)} already exists.`
    );
    console.info(`File successfully written in ${filePath}.`);
  } catch (error) {
    console.info(
      `File ${TextTransformation.kebabfy(object.chart.id)} doesn't exist.`
    );

    try {
      chp.execSync(
        `ng g c components/${TextTransformation.kebabfy(
          object.chart.id
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

export { setChartService };
