import { ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { RequestTypeEnum } from "../../../src/enums/request";
import { MainInterface } from "../../../src/interfaces/main";

export const DAXTV_CLIENT_PERSON_TABLE: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  table: {
    title: "Pessoas",
    subtitle: "Listagem de pessoas",
    id: "daxtvClientPersonTable",
    data: {
      type: RequestTypeEnum.Object,
    },
    elements: [
      {
        column: {
          label: "Nome",
        },
        row: {
          field: "name",
        },
      },
      {
        column: {
          label: "Celular",
        },
        row: {
          field: "mobile",
        },
      },
      {
        column: {
          label: "E-mail",
        },
        row: {
          field: "email",
        },
      },
      {
        column: {
          label: "Cidade",
        },
        row: {
          field: "city",
        },
      },
      {
        column: {
          label: "Estado",
        },
        row: {
          field: "state",
        },
      },
      {
        column: {
          label: "Plano",
        },
        row: {
          field: "packageId",
        },
      },
      {
        column: {
          label: "Extras",
        },
        row: {
          field: "extraId",
        },
      },
      {
        column: {
          label: "Valor",
        },
        row: {
          field: "price",
        },
      },
      {
        column: {
          label: "Ações",
        },
        row: {
          type: "menu",
          icon: "more_vert",
          menu: [
            {
              action: {
                type: RequestTypeEnum.Link,
                url: "/main/person",
                param: "_id",
              },
              label: "Editar",
            },
            {
              action: {
                type: RequestTypeEnum.Dialog,
                param: "_id",
              },
              label: "Remover",
              dialog: {
                templateFolder: "remove-confirmation-dialog",
                id: "removeConfirmationDialog",
              },
            },
          ],
        },
      },
    ],
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "daxtv-client-people",
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