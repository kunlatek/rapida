import { FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_SERVICE_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    title: "Serviço prestado",
    id: "clientServiceForm",
    elements: [
      {
        autocomplete: {
          label: "Local de instalação",
          name: "clientSettlementId",
          type: FormInputTypeEnum.Text,
          placeholder: "Instalação para serviço",
          optionsApi: {
            endpoint: "client-settlements",
            labelField: "settlementZipCode",
            valueField: "_id",
            paramsToFilter: ["settlementZipCode", "settlementAddress"],
          },
        }
      },
      {
        select: {
          label: "Serviços prestados",
          name: "clientId",
          type: FormInputTypeEnum.Text,
          optionsApi: {
            endpoint: "clients",
            labelField: "name",
            valueField: "_id",
          },
          isMultiple: true,
        }
      },
    ],
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "client-services",
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