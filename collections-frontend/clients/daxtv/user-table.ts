import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { RequestTypeEnum } from "../../../src/enums/request";
import { MainInterface } from "../../../src/interfaces/main";

const USER_TABLE: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  table: {
    title: "Usuários",
    subtitle: "Relatório de usuários",
    id: "daxTvUserTable",
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
          label: "CPF",
        },
        row: {
          field: "cpf",
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
          label: "Grupo",
        },
        row: {
          field: "permissions",
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
          label: "Ações",
        },
        row: {
          type: "menu",
          icon: "more_vert",
          menu: [
            {
              action: {
                type: RequestTypeEnum.Link,
                url: "/main/user",
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