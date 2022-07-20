import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { RequestTypeEnum } from "../../../src/enums/request";
import { MainInterface } from "../../../src/interfaces/main";

const DAXTV_PACKAGE_TABLE: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  table: {
    title: "Pacotes",
    id: "daxtTvPackageTable",
    subtitle: "Listagem de pacotes",
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
          label: "Canais",
        },
        row: {
          field: "channelQuantity",
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
          label: "Gravação",
        },
        row: {
          field: "recordingTime",
        },
      },
      {
        column: {
          label: "YouCast",
        },
        row: {
          field: "channelQuantity",
        },
      },
    ]
  }
}