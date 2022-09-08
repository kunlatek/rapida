import {
  FormButtonTypeEnum,
  FormInputTypeEnum,
  ServiceFunctionsEnum,
} from "../../../src/enums/form";
import {
  BackendFrameworkEnum,
  FrontendFrameworkEnum,
} from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_SERVICE_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    id: "clientServiceForm",
    title: "Serviço",
    elements: [
      {
        input: {
          label: "Nome",
          name: "name",
          type: FormInputTypeEnum.Text,
          placeholder: "Nome do serviço prestado",
          isRequired: true,
        },
      },
      {
        input: {
          label: "Descrição",
          name: "description",
          type: FormInputTypeEnum.Text,
          placeholder: "Descrição do serviço prestado",
          isMultipleLines: true,
        },
      },
      {
        input: {
          label: "Preço",
          name: "price",
          placeholder: "Em R$",
          type: FormInputTypeEnum.Number,
          isRequired: true,
        },
      },
      {
        button: {
          label: "Criar",
          type: FormButtonTypeEnum.Submit,
        },
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
  },
};
