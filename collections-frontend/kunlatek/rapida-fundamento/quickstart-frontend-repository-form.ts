import { FormButtonTypeEnum, FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const QUICKSTART_FRONTEND_REPOSITORY_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    title: "Repositório do quickstart do frontend",
    subtitle: "Repositórios do quickstart do frontend que alimentarão as options do select de elementos no backoffice rapida",
    id: "quickstartFrontendRepositoryForm",
    elements: [
      {
        input: {
          label: "Label",
          name: "label",
          type: FormInputTypeEnum.Text,
          isRequired: true,
        }
      },
      {
        input: {
          label: "Value",
          name: "value",
          type: FormInputTypeEnum.Text,
          isRequired: true,
        }
      },
      {
        button: {
          label: "Criar",
          type: FormButtonTypeEnum.Submit,
        }
      },
    ],
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "quickstart-frontend-repositories",
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