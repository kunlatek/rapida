import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { RequestTypeEnum } from "../../../src/enums/request";
import { MainInterface } from "../../../src/interfaces/main";

const CLIENT_PERSON_TABLE: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  table: {
    title: "Pessoas",
    subtitle: "Listagem de pessoas",
    id: "daxTvClientPersonTable",
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
    ]
  }
}