import * as fs from "fs";
import * as chp from "child_process";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { ServiceInterface } from "../../../../interfaces/form";
import { ServiceFunctionsEnum } from "../../../../enums/form";

let _hasAuthorization: boolean = false;

/**
 * SET CODE
 * @param object
 * @returns
 */
const setTableService = (object: MainInterface): string => {
  if (!object.table) {
    console.info("Only tables set here");
    return ``;
  }

  let _services: string = setTableServiceServices(object);

  let code = `
  import { HttpClient } from "@angular/common/http";
  import { Injectable } from "@angular/core";

  @Injectable({
  providedIn: "root",
  })
  export class ${TextTransformation.pascalfy(object.table.id)}Service {
      BASE_URL = "${object.table.service?.baseUrl}";

      constructor(private _httpClient: HttpClient) {}

      ${_services}

      ${
        _hasAuthorization
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

  setTableServiceArchitectureAndWriteToFile(object, code);
  return code;
};

// SET SERVICES
const setTableServiceServices = (object: MainInterface) => {
  let code = ``;

  if (object.table?.service) {
    code += setTableServiceServicesOverTableElement(
      object,
      object.table?.service
    );
  }

  return code;
};

const setTableServiceServicesOverTableElement = (
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
          ).toPromise();
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
          ).toPromise();
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
          ).toPromise();
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
          ).toPromise();
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
          ).toPromise();
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

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setTableServiceArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  if (!object.table) {
    return "";
  }

  const filePath = `${
    object.projectPath
  }/src/app/components/${TextTransformation.kebabfy(
    object.table.id
  )}/${TextTransformation.kebabfy(object.table.id)}.service.ts`;

  try {
    fs.writeFileSync(filePath, code);
    console.info(
      `File ${TextTransformation.kebabfy(object.table.id)} already exists.`
    );
    console.info(`File successfully written in ${filePath}.`);
  } catch (error) {
    console.info(
      `File ${TextTransformation.kebabfy(object.table.id)} doesn't exist.`
    );

    try {
      chp.execSync(
        `ng g c components/${TextTransformation.kebabfy(
          object.table.id
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

export { setTableService };
