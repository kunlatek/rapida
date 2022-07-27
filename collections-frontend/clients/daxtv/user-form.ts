import { FormButtonTypeEnum, FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const DAXTV_USER_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    title: "Usuário",
    subtitle: "Utilize as abas abaixo para cadastrar os usuários que terão acesso a esta ferramenta administrativa.",
    id: "daxtvUserForm",
    elements: [
      {
        tabs: [
          {
            title: "Dados pessoais",
            id: "daxtvMainTab",
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
            id: "daxtvContactsTab",
            elements: [
              {
                input: {
                  label: "Celular",
                  name: "mobile",
                  type: FormInputTypeEnum.Text,
                  placeholder: "(00) 0 0000-0000",
                  isRequired: true,
                  mask: "(00) 0 0000-0000",
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
            title: "Permissões",
            id: "daxtvPermissionsTab",
            elements: [
              {
                select: {
                  label: "Permissões do usuário",
                  name: "permissions",
                  type: FormInputTypeEnum.Text,
                  optionsObject: [
                    {
                      label: "Master",
                      value: "master",
                    },
                    {
                      label: "Revendedor",
                      value: "dealer",
                    },
                    {
                      label: "Assistente",
                      value: "assistant",
                    }
                  ],
                  isRequired: true,
                  isMultiple: true,
                }
              }
            ],
          },
        ]
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
      endpoint: "daxtv-users",
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