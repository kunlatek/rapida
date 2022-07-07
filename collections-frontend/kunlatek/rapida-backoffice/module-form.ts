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
        array: {
          title: "Componente",
          id: "componentFormArray",
          elements: [
            {
              autocomplete: {
                label: "Identidade de componente",
                name: "componentFormId",
                type: FormInputTypeEnum.Text,
                optionsApi: {
                  endpoint: "components",
                  labelField: "name",
                  valueField: "_id",
                  paramsToFilter: ["name"]
                },
                isMultiple: true,
                isRequired: true,
              }
            }
          ]
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
      endPoint: "components",
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