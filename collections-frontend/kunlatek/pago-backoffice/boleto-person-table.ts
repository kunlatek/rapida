import { ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { RequestTypeEnum } from "../../../src/enums/request";
import { MainInterface } from "../../../src/interfaces/main";

export const BOLETO_PERSON_TABLE: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  table: {
    id: "boletoPersonTable",
    title: "Boletos de pessoas",
    data: {
      type: RequestTypeEnum.Object,
    },
    elements: [
      {
        column: {
          label: "Vencimento",
        },
        row: {
          field: "dueDate"
        }
      },
      {
        column: {
          label: "Valor",
        },
        row: {
          field: "price"
        }
      },
      {
        column: {
          label: "Beneficiário",
        },
        row: {
          field: "recipient"
        }
      },
      {
        column: {
          label: "Status",
        },
        row: {
          field: "status"
        }
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
                url: "/main/boleto-person",
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
            {
              action: {
                type: RequestTypeEnum.Api,
                url: "/boleto-send-emails",
                param: "_id"
              },
              label: "Enviar por email",
            },
            {
              action: {
                type: RequestTypeEnum.Api,
                url: "/boleto-send-whatsapps",
                param: "_id"
              },
              label: "Enviar por whatsapp",
            },
          ],
        },
      },
    ],
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "boleto-people",
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