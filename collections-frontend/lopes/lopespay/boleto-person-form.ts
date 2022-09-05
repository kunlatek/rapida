import { FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const BOLETO_PERSON_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    id: "boletoPersonForm",
    title: "Boleto de pessoa",
    elements: [
      {
        autocomplete: {
          label: "Pagador por CPF",
          name: "payerId",
          placeholder: "Pesquise pelo CPF",
          tooltip: "A pessoa que será cobrada por boleto",
          type: FormInputTypeEnum.Text,
          optionsApi: {
            endpoint: "__kliento-person",
            labelField: "name",
            valueField: "_id",
            paramsToFilter: ["cpf"],
          },
        }
      },
      {
        autocomplete: {
          label: "Beneficiário por CPF",
          name: "recipientId",
          placeholder: "Pesquise pelo CPF",
          tooltip: "A pessoa que será beneficiada pelo boleto",
          type: FormInputTypeEnum.Text,
          optionsApi: {
            endpoint: "__kliento-person",
            labelField: "name",
            valueField: "_id",
            paramsToFilter: ["cpf"],
          },
          isRequired: true,
        }
      },
      {
        input: {
          label: "Preço",
          name: "price",
          placeholder: "Ex.: 105,80",
          tooltip: "Valor cobrado no boleto",
          type: FormInputTypeEnum.Text,
          isRequired: true,
        }
      },
      {
        input: {
          label: "Data de vencimento",
          name: "dueDate",
          type: FormInputTypeEnum.Date,
        }
      },
      {
        input: {
          label: "Instrução",
          name: "instruction",
          placeholder: "Ex.: Pagamento de serviço de desenvolvimento",
          tooltip: "Informação extra para identificação do boleto",
          type: FormInputTypeEnum.Text,
        }
      },
      {
        select: {
          label: "Status",
          name: "status",
          tooltip: "A situação do pagamento",
          type: FormInputTypeEnum.Text,
          optionsApi: {
            endpoint: "__pago-fundamento-status",
            labelField: "name",
            valueField: "_id",
          },
        }
      },
    ],
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "boleto-people",
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