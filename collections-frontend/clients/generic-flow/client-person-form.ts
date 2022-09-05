import { FormButtonTypeEnum, FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_PERSON_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    title: "Cliente pessoa",
    subtitle: "Utilize as abas abaixo para cadastrar o cliente, seu plano e os eventuais produtos extras.",
    id: "clientPersonForm",
    elements: [
      {
        tabs: [
          {
            title: "Dados pessoais",
            id: "mainTab",
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
            title: "Dados profissionais",
            id: "professionalTab",
            elements: [
              {
                input: {
                  label: "CRM",
                  name: "crm",
                  type: FormInputTypeEnum.Number,
                  placeholder: "Apenas números",
                  isRequired: true,
                }
              },
              {
                array: {
                  id: "specialities",
                  title: "Especialidade",
                  elements: [
                    {
                      input: {
                        label: "Nome",
                        name: "specialityName",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Ex.: Dermatologia",
                        tooltip: "As especialidades do médico",
                        isRequired: true,
                      }
                    },
                  ]
                }
              }
            ]
          },
          {
            title: "Contatos",
            id: "contactsTab",
            elements: [
              {
                array: {
                  title: "Contato",
                  id: "contacts",
                  elements: [
                    {
                      select: {
                        label: "Tipo de contato",
                        name: "contactType",
                        type: FormInputTypeEnum.Text,
                        optionsObject: [
                          {
                            label: "Celular",
                            value: "mobile",
                          },
                          {
                            label: "E-mail",
                            value: "email",
                          },
                          {
                            label: "Linkedin",
                            value: "linkedin",
                          },
                          {
                            label: "Instagram",
                            value: "instagram",
                          },
                          {
                            label: "Facebook",
                            value: "facebook",
                          },
                        ]
                      }
                    },
                    {
                      input: {
                        label: "Valor",
                        name: "contactValue",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Ex.: email@email.com | (88) 98888-8888",
                        tooltip: "Valor de acordo com o tipo de contato",
                      }
                    },
                    {
                      input: {
                        label: "Comentário",
                        name: "contactComment",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Ex.: E-mail comercial | Telefone do vizinho",
                        tooltip: "Informação adicional acerca do contato",
                        isMultipleLines: true,
                      }
                    },
                  ]
                }
              },
            ],
          },
          {
            title: "Endereços para contato",
            id: "addressesTab",
            elements: [
              {
                array: {
                  id: "addresses",
                  title: "Endereço",
                  elements: [
                    {
                      input: {
                        label: "CEP",
                        name: "zipCode",
                        type: FormInputTypeEnum.Text,
                        placeholder: "00.000-000",
                        isRequired: true,
                        mask: "00.000-000",
                        apiRequest: {
                          endpoint: "__external-api/address",
                          formFieldsFilledByApiResponse: [
                            {
                              formFieldName: "address",
                              propertyFromApiToFillFormField: "address"
                            },
                            {
                              formFieldName: "district",
                              propertyFromApiToFillFormField: "neighborhood"
                            },
                            {
                              formFieldName: "city",
                              propertyFromApiToFillFormField: "city"
                            },
                            {
                              formFieldName: "state",
                              propertyFromApiToFillFormField: "state"
                            },
                            {
                              formFieldName: "country",
                              propertyFromApiToFillFormField: "country"
                            },
                          ]
                        }
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
                }
              },              
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
      endpoint: "client-people",
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