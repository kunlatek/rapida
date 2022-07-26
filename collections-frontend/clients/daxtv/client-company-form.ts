import { FormButtonTypeEnum, FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const DAXTV_CLIENT_COMPANY_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    title: "Empresa",
    subtitle: "Utilize as abas abaixo para cadastrar o cliente, seu plano e os eventuais produtos extras.",
    id: "daxtvClientCompanyForm",
    elements: [
      {
        tabs: [
          {
            title: "Dados da empresa",
            id: "daxtvMainTab",
            elements: [
              {
                input: {
                  label: "CNPJ",
                  name: "cnpj",
                  type: FormInputTypeEnum.Text,
                  placeholder: "00.000.000/0000-00",
                  mask: "00.000.000/0000-00",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Nome fanstasia",
                  name: "businessName",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Nome comercial",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Razão social",
                  name: "companyName",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Nome jurídico",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Nome do responsável",
                  name: "ownerName",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Responsável pela empresa",
                  isRequired: true,
                }
              },
            ],
          },
          {
            title: "Contatos",
            id: "daxtvContactsTab",
            elements: [
              {
                input: {
                  label: "Celular",
                  name: "mobile",
                  type: FormInputTypeEnum.Text,
                  placeholder: "(00) 0 0000-0000",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "E-mail",
                  name: "email",
                  type: FormInputTypeEnum.Email,
                  placeholder: "E-mail",
                  isRequired: true,
                }
              },
            ],
          },
          {
            title: "Endereços",
            id: "daxtvAddressesTab",
            elements: [
              {
                input: {
                  label: "CEP",
                  name: "zipCode",
                  type: FormInputTypeEnum.Text,
                  placeholder: "00.000-000",
                  isRequired: true,
                  mask: "00.000-000",
                }
              },
              {
                input: {
                  label: "Logradouro",
                  name: "address",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Nome da Rua, Avenida, Travessa etc.",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Número",
                  name: "number",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Número da localização",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Bairro",
                  name: "district",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Distrito do logradouro",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Complemento",
                  name: "complement",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Mais informações que ajudem a achar seu endereço",
                }
              },
              {
                input: {
                  label: "País",
                  name: "country",
                  type: FormInputTypeEnum.Text,
                  placeholder: "País do seu endereço",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Estado",
                  name: "state",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Estado do seu endereço",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Cidade",
                  name: "city",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Município do seu endereço",
                  isRequired: true,
                }
              },
            ],
          },
          {
            title: "Pacotes",
            id: "daxtvPackageTab",
            elements: [
              {
                select: {
                  label: "Plano principal",
                  name: "packageId",
                  type: FormInputTypeEnum.Text,
                  optionsApi: {
                    endpoint: `daxtv-packages`,
                    labelField: "name",
                    valueField: "_id",
                  }
                }
              },
              // {
              //   select: {
              //     label: "Extras",
              //     name: "extraId",
              //     type: FormInputTypeEnum.Text,
              //     optionsApi: {
              //       endpoint: `daxtv-extras`,
              //       labelField: "name",
              //       valueField: "_id",
              //     },
              //     isMultiple: true
              //   }
              // },
              {
                input: {
                  label: "Telas",
                  name: "screenQuantity",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Contas por plano",
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
          },
        ]
      }
    ],
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "daxtvClientCompanies",
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