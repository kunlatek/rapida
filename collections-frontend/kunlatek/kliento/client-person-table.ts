import { ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { RequestTypeEnum } from "../../../src/enums/request";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_PERSON_TABLE: MainInterface = {
  frontendFramework:  FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  table: {
    id: "clientPersonTable",
    title: "Clientes pessoas",
    data: {
      type: RequestTypeEnum.Object
    },
    elements: [
      {
        column: {
          label: "CPF"
        },
        row: {
          field: "cpf"
        }
      },
      {
        column: {
          label: "Nome"
        },
        row: {
          field: "name"
        }
      },
    ],
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "client-people",
      hasAuthorization: true,
      methods: [
        ServiceFunctionsEnum.Get,
        ServiceFunctionsEnum.Delete,
        ServiceFunctionsEnum.Save,
        ServiceFunctionsEnum.Update,
        ServiceFunctionsEnum.Find,
      ],
    },
  }
}