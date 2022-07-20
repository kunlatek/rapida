import { FormButtonTypeEnum, FormInputTypeEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

const DAXTV_CLIENT_PERSON_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    title: "Pessoa",
    subtitle: "Utilize as abas abaixo para cadastrar o cliente, seu plano e os eventuais produtos extras.",
    id: "daxTvClientPersonForm",
    elements: [
      {
        tabs: [
          {
            title: "Dados pessoais",
            id: "daxTvMainTab",
            elements: [
              {
                input: {
                  label: "CPF",
                  name: "cpf",
                  type: FormInputTypeEnum.Text,
                  placeholder: "000.000.000-00",
                  mask: "000.000.000-00",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Nome",
                  name: "name",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Nome completo",
                  isRequired: true,
                }
              },
              {
                select: {
                  label: "Gênero",
                  name: "gender",
                  type: FormInputTypeEnum.Text,
                  optionsObject: [
                    {
                      label: "Masculino",
                      value: "male",
                    },
                    {
                      label: "Feminino",
                      value: "female",
                    },
                  ],
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Nascimento",
                  name: "birthday",
                  type: FormInputTypeEnum.Date,
                }
              },
            ],
          },
          {
            title: "Contatos",
            id: "daxTvContactsTab",
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
            id: "daxTvAddressesTab",
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
            id: "daxTvPackageTab",
            elements: [
              {
                select: {
                  label: "Plano principal",
                  name: "packageId",
                  type: FormInputTypeEnum.Text,
                  optionsApi: {
                    endpoint: "daxTvPackages",
                    labelField: "name",
                    valueField: "_id",                    
                  }
                }
              },
              {
                select: {
                  label: "Extras",
                  name: "extraId",
                  type: FormInputTypeEnum.Text,
                  optionsApi: {
                    endpoint: "daxTvExtras",
                    labelField: "name",
                    valueField: "_id",                    
                  },
                  isMultiple: true
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
    ]
  }
}