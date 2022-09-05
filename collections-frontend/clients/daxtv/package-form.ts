import { FormButtonTypeEnum, FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const DAXTV_PACKAGE_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    title: "Planos e extras",
    subtitle: "Gerenciamento de dados de pacotes",
    id:"daxtvPackageForm",
    elements: [
      {
        input: {
          label: "Nome",
          name: "name",
          type: FormInputTypeEnum.Text,
          placeholder: "Nome promocional do pacote",
          isRequired: true,
        }
      },
      {
        select: {
          label: "Tipo de plano",
          name: "type",
          type: FormInputTypeEnum.Text,
          optionsObject: [
            {
              label: "Principal",
              value: "main",
            },
            {
              label: "Extra",
              value: "extra",
            },
          ],
          isRequired: true,
        }
      },
      {
        input: {
          label: "Valor",
          name: "price",
          type: FormInputTypeEnum.Text,
          placeholder: "Preço do pacote",
          isRequired: true,
        }
      },
      {
        input: {
          label: "Número de canais",
          name: "channelQuantity",
          type: FormInputTypeEnum.Number,
          placeholder: "Número de canais do pacote",
          isRequired: true,
        }
      },
      {
        input: {
          label: "Número de telas",
          name: "screenQuantity",
          type: FormInputTypeEnum.Number,
          placeholder: "Quantidade de acesso por pacote",
          isRequired: true,
        }
      },
      {
        input: {
          label: "Horas de gravação",
          name: "recordingTime",
          type: FormInputTypeEnum.Number,
          placeholder: "Tempo de gravação disponível",
          isRequired: true,
        }
      },
      {
        select: {
          label: "Pacotes YouCast",
          name: "package",
          type: FormInputTypeEnum.Text,
          optionsObject: [
            {
              label: "YouCast Básico",
              value: "basic",
            },
            {
              label: "YouCast Light",
              value: "light",
            },
            {
              label: "YouCast Digital",
              value: "digital",
            },
            {
              label: "YouCast Top",
              value: "top",
            },
            {
              label: "YouCast Premium",
              value: "premium",
            },
            {
              label: "YouCast HBO",
              value: "hbo",
            }
          ],
          isMultiple: true,
          isRequired: true,
        }
      },
      {
        input: {
          label: "Descrição",
          name: "description",
          type: FormInputTypeEnum.Text,
          placeholder: "Descrição comercial do pacote",
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
      endpoint: "daxtv-packages",
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