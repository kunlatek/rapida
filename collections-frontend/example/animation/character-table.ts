import { ServiceFunctionsEnum } from "../../../src/enums/form";
import { RequestTypeEnum } from "../../../src/enums/request";
import { MainInterface } from "../../../src/interfaces/main";


export const CHARACTER_TABLE: MainInterface = {
  table: {
    id: "characterTable",
    title: "Personagens",
    infiniteScroll: true,
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
          label: "Animação relacionada",
        },
        row: {
          field: "animationId",
          fieldProperties: ["name"],
        },
      },
      {
        column: {
          label: "Ações",
        },
        row: {
          type: "menu",
          icon: "more_vert",
          field: "actions",
          menu: [
            {
              action: {
                type: RequestTypeEnum.Link,
                url: "/main/character",
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
    formIdToFieldsToLabels: "characterForm",
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "characters",
      hasAuthorization: true,
      methods: [
        ServiceFunctionsEnum.Get,
        ServiceFunctionsEnum.Delete,
        ServiceFunctionsEnum.Find,
      ],
    },
  },
};
