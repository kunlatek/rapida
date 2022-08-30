import { FormButtonTypeEnum, FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_COMPANY_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    title: "Cliente empresa",
    subtitle: "Utilize as abas abaixo para cadastrar o cliente, seu plano e os eventuais produtos extras.",
    id: "clientCompanyForm",
    elements: [
      {
        tabs: [
          {
            title: "Dados da empresa",
            id: "mainTab",
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
      endpoint: "client-companies",
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