import { ServiceFunctionsEnum } from "../../../../enums/form";
import { ServiceInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TableInterface } from "../../../../interfaces/table";
import { TextTransformation } from "../../../../utils/text.transformation";
import { FileType } from "../../core/file-type";
import { writeToFile } from "../../core/write-to-file";

let _hasAuthorization: boolean = false;
/**
 * SET CODE
 * @param object
 * @returns
 */
const setTableService = ({ table, projectPath }: MainInterface): string => {
  if (!table) {
    console.info("Only tables set here");
    return ``;
  }

  let _services: string = setTableServiceServices(table);

  let code = `
  /*import { HttpClient } from "@angular/common/http";*/
  import { Injectable } from "@angular/core";
  import { HttpParams } from "@angular/common/http";
  import { Http } from "src/app/implementations";
  
  @Injectable({
  providedIn: "root",
  })
  export class ${TextTransformation.pascalfy(table.id)}Service {
      BASE_URL = "${table.service?.baseUrl}";

      constructor(/*private _httpClient: HttpClient*/) {}

      ${_services}

      ${_hasAuthorization
      ? `
        refreshToken () {
          /*return this._httpClient.get(
            \`\${this.BASE_URL}/auth/refresh-token\`, {
            headers: {
              'Authorization': \`Bearer \${sessionStorage.getItem('refreshToken')}\`
            }
          }
          );*/
          return Http.get({
            route: \`\${this.BASE_URL}/auth/refresh-token\`,
            options: {
              headers: {
                'Authorization': \`Bearer \${sessionStorage.getItem('refreshToken')}\`
              }
            }
          });
        }
        `
      : ``
    }
  }
  `;

  writeToFile({
    id: table.id,
    projectPath: projectPath,
    code,
    type: FileType.SERVICE,
  });

  return code;
};

// SET SERVICES
const setTableServiceServices = (table: TableInterface) => {
  let code = ``;

  if (table?.service) {
    code += setTableServiceServicesOverTableElement(
      table?.service
    );
  }

  return code;
};

const setTableServiceServicesOverTableElement = (
  service: ServiceInterface
) => {
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
        getAll(params: HttpParams) {
          /*return this._httpClient.get(
            \`\${this.BASE_URL}/${service.endpoint}\`, {
              params,
              headers: {
                ${hasAuthorization}
              }
            }
          );*/
          return Http.get({
            route: \`\${this.BASE_URL}/${service.endpoint}?\${params.toString()}\`,
            options: {
              headers: {
                ${hasAuthorization}
              }
            }
          });
        };
        `;
        break;

      case ServiceFunctionsEnum.Find:
        code += `
        find(id: string) {
          /*return this._httpClient.get(
            \`\${this.BASE_URL}/${service.endpoint}/\${id}\`,
            {
              headers: {
                ${hasAuthorization}
              }
            }
          );*/
          return Http.get({
            route: \`\${this.BASE_URL}/${service.endpoint}/\${id}\`,
            options: {
              headers: {
                ${hasAuthorization}
              }
            }
          });
        };
        `;
        break;

      case ServiceFunctionsEnum.Save:
        code += `
        save(body: any) {
          /*return this._httpClient.post(
          \`\${this.BASE_URL}/${service.endpoint}\`, 
          body,
          {
            headers: {
              ${hasAuthorization}
            }
          }
          );*/
          return Http.post({
            route: \`\${this.BASE_URL}/${service.endpoint}\`,
            body,
            options: {
              headers: {
                ${hasAuthorization}
              }
            }
          });
        };
        `;
        break;

      case ServiceFunctionsEnum.Update:
        code += `
        update(body: any, id: string) {
          /*return this._httpClient.put(
            \`\${this.BASE_URL}/${service.endpoint}/\${id}\`, 
            body,
            {
              headers: {
                ${hasAuthorization}
              }
            }
          );*/
          return Http.put({
            route: \`\${this.BASE_URL}/${service.endpoint}/\${id}\`,
            body,
            options: {
              headers: {
                ${hasAuthorization}
              }
            }
          });
        };
        `;
        break;

      case ServiceFunctionsEnum.Delete:
        code += `
        delete(id: string) {
          /*return this._httpClient.delete(
            \`\${this.BASE_URL}/${service.endpoint}/\${id}\`,
            {
              headers: {
                ${hasAuthorization}
              }
            }
          );*/
          return Http.delete({
            route: \`\${this.BASE_URL}/${service.endpoint}/\${id}\`,
            options: {
              headers: {
                ${hasAuthorization}
              }
            }
          });
        };
        `;
        break;

      case ServiceFunctionsEnum.SoftDelete:
        code += `
        softDelete(id: string) {
          /*return this._httpClient.put(
            \`\${this.BASE_URL}/${service.endpoint}/\${id}\`,
            {
              headers: {
                ${hasAuthorization}
              }
            }
          );*/
          return Http.put({
            route: \`\${this.BASE_URL}/${service.endpoint}/\${id}\`,
            options: {
              headers: {
                ${hasAuthorization}
              }
            }
          });
        };
        `;
        break;

      default:
        break;
    }
  });

  return code;
};

export { setTableService };
