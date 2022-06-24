import { FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { RequestTypeEnum } from "../../../src/enums/request";
import { MainInterface } from "../../../src/interfaces/main";


export const ANIMATION_TABLE: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  table: {
    id: "animationTable",
    title: "Exemplos",
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
          label: "Data de início",
        },
        row: {
          field: "startDate",
        },
      },
      {
        column: {
          label: "Data do fim",
        },
        row: {
          field: "finishDate",
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
                url: "/main/animation",
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
    actions: {
        id: "animationTable",
        title: "Exemplo",
        elements: [{
            input: {
                label: "Search input",
                name: "searchInput",
                placeholder: "Placeholder to search input",
                type: FormInputTypeEnum.Text
            }
        }]
    },
    service: {
        baseUrl: "http://localhost:3000",
        endPoint: "animations",
        hasAuthorization: true,
        methods: [
            ServiceFunctionsEnum.Get,
            ServiceFunctionsEnum.Delete,
            ServiceFunctionsEnum.Find,
        ],
    },
  },
};
