import { FormButtonTypeEnum, FormInputTypeEnum, ParamTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
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
            paramType: ParamTypeEnum.Query,
          },
          isRequired: true,
        }
      },
      {
        select: {
          label: "Serviços prestados",
          name: "serviceId",
          type: FormInputTypeEnum.Text,
          optionsApi: {
            endpoint: "services",
            labelField: "name",
            valueField: "_id",
          },
          isRequired: true,
          isMultiple: true,
        }
      },
      {
        button: {
          label: "Criar",
          type: FormButtonTypeEnum.Submit,
        }
      }
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
};