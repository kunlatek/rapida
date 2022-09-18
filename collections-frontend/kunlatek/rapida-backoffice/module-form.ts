import { FormButtonTypeEnum, FormInputTypeEnum, ServiceFunctionsEnum, } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const MODULE_FORM: MainInterface = {
  backendFramework: BackendFrameworkEnum.Loopback,
  frontendFramework: FrontendFrameworkEnum.Angular,
  form: {
    title: "Módulo", 
    id: "moduleForm",
    elements: [
      {
        input: {
          label: "Título",
          name: "collectionTitle",
          type: FormInputTypeEnum.Text,
          placeholder: "Título identificador. Ex.: Animação",
          isRequired: true,
        }
      },
      {
        input: {
          label: "Propriedade",
          name: "collectionId",
          type: FormInputTypeEnum.Text,
          placeholder: "Nome da coleção. Ex.: animation",
          isRequired: true,
        }
      },
      {
        autocomplete: {
          label: "Identidade de componente",
          name: "componentFormId",
          type: FormInputTypeEnum.Text,
          optionsApi: {
            endpoint: "components",
            labelField: "collectionTitle",
            valueField: "_id",
            paramsToFilter: ["collectionTitle", "collectionId"]
          },
          isMultiple: true,
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
      endpoint: "modules",
      hasAuthorization: true,
      methods: [
        ServiceFunctionsEnum.Get,
        ServiceFunctionsEnum.Delete,
        ServiceFunctionsEnum.Save,
        ServiceFunctionsEnum.Update,
        ServiceFunctionsEnum.Find,
      ],
    }
  }
}