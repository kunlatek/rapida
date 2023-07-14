import { ServiceFunctionsEnum } from "../../../src/enums/form";
import { RequestTypeEnum } from "../../../src/enums/request";
import { MainInterface } from "../../../src/interfaces/main";


export const ANIMATION_TABLE: MainInterface = {
  table: {
    id: "animationTable",
    title: "Animações",
    infiniteScroll: false,
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
          field: "actions",
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
    formIdToFieldsToLabels: "animationForm",
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "animations",
      hasAuthorization: true,
      methods: [
        ServiceFunctionsEnum.Get,
        ServiceFunctionsEnum.Delete,
        ServiceFunctionsEnum.Find,
      ],
    },
  },
};
