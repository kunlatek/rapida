import { ServiceFunctionsEnum } from "../../../src/enums/form";
import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { RequestTypeEnum } from "../../../src/enums/request";
import { MainInterface } from "../../../src/interfaces/main";

export const BACKEND_FRAMEWORK_TABLE: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  table: {
    title: "Frameworks de backend",
    id: "backendFrameworkTable",
    subtitle: "Frameworks de backend de dados que alimentarão as options do select de elementos no backoffice rapida",
    data: {
      type: RequestTypeEnum.Object,
    },
    elements: [
      {
        column: {
          label: "Nome"
        },
        row: {
          field: "name"
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
                url: "/main/backend-framework",
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
      baseUrl: "http://localhost:3001",
      endpoint: "backend-frameworks",
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