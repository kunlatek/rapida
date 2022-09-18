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
                  name: "uniqueId",
                  type: FormInputTypeEnum.Text,
                  placeholder: "00.000.000/0000-00",
                  mask: "00.000.000/0000-00",
                  isRequired: true,
                  apiRequest: {
                    externalEndpoint: "https://autentikigo-tftftsuywa-ue.a.run.app/get-profile?userType=company&uniqueId=",
                    formFieldsFilledByApiResponse: [
                      {
                        formFieldName: "tradeName",
                        propertyFromApiToFillFormField: "tradeName",
                      },
                      {
                        formFieldName: "corporateName",
                        propertyFromApiToFillFormField: "corporateName",
                      },
                      {
                        formFieldName: "birthday",
                        propertyFromApiToFillFormField: "birthday",
                      },
                      {
                        formFieldName: "responsible",
                        propertyFromApiToFillFormField: "responsible",
                      },
                      {
                        formFieldName: "businessActivityCode",
                        propertyFromApiToFillFormField: "businessActivityCode.fiscal",
                      },
                      {
                        formFieldName: "businessActivityDescription",
                        propertyFromApiToFillFormField: "businessActivityCode.descricao",
                      },
                    ]
                  }
                }
              },
              {
                input: {
                  label: "Nome fantasia",
                  name: "tradeName",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Nome comercial",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Razão social",
                  name: "corporateName",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Nome jurídico",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Data de abertura",
                  name: "birthday",
                  type: FormInputTypeEnum.Date,
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Nome do responsável",
                  name: "responsible",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Responsável pela empresa",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "CNAE principal",
                  name: "businessActivityCode",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Código da atividade principal",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Descrição da atividade principal",
                  name: "businessActivityDescription",
                  type: FormInputTypeEnum.Text,
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Descrição do primeiro contato",
                  name: "firstContactDescription",
                  type: FormInputTypeEnum.Text,
                  isRequired: true,
                  isMultipleLines: true,
                }
              },
            ],
          },
          {
            title: "Sócios",
            id: "partnersTab",
            elements: [
              {
                array: {
                  title: "Sócio",
                  id: "partners",
                  elements: [
                    {
                      input: {
                        label: "CPF",
                        name: "partnerUniqueId",
                        type: FormInputTypeEnum.Text,
                        placeholder: "000.000.000-00",
                        mask: "000.000.000-00",
                        isRequired: true,
                        apiRequest: {
                          externalEndpoint: "https://autentikigo-tftftsuywa-ue.a.run.app/get-profile?userType=person&uniqueId=",
                          formFieldsFilledByApiResponse: [
                            {
                              formFieldName: "partnerName",
                              propertyFromApiToFillFormField: "name",
                            },
                            {
                              formFieldName: "partnerGender",
                              propertyFromApiToFillFormField: "gender",
                            },
                            {
                              formFieldName: "partnerBirthday",
                              propertyFromApiToFillFormField: "birthday",
                            },
                            {
                              formFieldName: "partnerMother",
                              propertyFromApiToFillFormField: "mother",
                            }
                          ]
                        }
                      }
                    },
                    {
                      input: {
                        label: "Nome",
                        name: "partnerName",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Nome completo",
                        isRequired: true,
                      }
                    },
                    {
                      select: {
                        label: "Gênero por direito",
                        name: "partnerGender",
                        type: FormInputTypeEnum.Text,
                        optionsObject: [
                          {
                            label: "Masculino",
                            value: "M",
                          },
                          {
                            label: "Feminino",
                            value: "F",
                          }
                        ],
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Nascimento",
                        name: "partnerBirthday",
                        type: FormInputTypeEnum.Date,
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Nome da mãe",
                        name: "partnerMother",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Nome completo",
                        isRequired: true,
                      }
                    },
                    {
                      autocomplete: {
                        label: "Nacionalidade",
                        name: "partnerNationalities",
                        tooltip: "Montar API Loko",
                        type: FormInputTypeEnum.Text,
                        optionsApi: {
                          externalEndpoint: "https://loko-tftftsuywa-ue.a.run.app/cities/",
                          labelField: "name",
                          valueField: "_id",
                          paramsToFilter: ["name"],
                        }
                      }
                    },
                    {
                      autocomplete: {
                        label: "Naturalidade",
                        placeholder: "Cidade de nascimento",
                        name: "partnerCityOfBirth",
                        tooltip: "Montar API Loko",
                        type: FormInputTypeEnum.Text,
                        optionsApi: {
                          externalEndpoint: "https://loko-tftftsuywa-ue.a.run.app/cities/",
                          labelField: "name",
                          valueField: "_id",
                          paramsToFilter: ["name"],
                        }
                      }
                    },
                    {
                      input: {
                        label: "Nome social",
                        name: "partnerNickname",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Nome reconhecido",
                      }
                    },
                    {
                      select: {
                        label: "Gênero de tratamento",
                        name: "partnerTreatmentGender",
                        type: FormInputTypeEnum.Text,
                        optionsObject: [
                          {
                            label: "Masculino (ele, dele, o)",
                            value: "M",
                          },
                          {
                            label: "Feminino (ela, dela, a)",
                            value: "F",
                          },
                          {
                            label: "Neutro (elx, delx, x)",
                            value: "X",
                          },
                        ],
                        isRequired: true,
                      }
                    },
                    {
                      select: {
                        label: "Estado civil",
                        name: "partnerMaritalStatus",
                        type: FormInputTypeEnum.Text,
                        optionsObject: [
                          {
                            label: "Solteiro",
                            value: "single",
                          },
                          {
                            label: "Casado",
                            value: "married",
                          },
                          {
                            label: "Separado",
                            value: "separated",
                          },
                          {
                            label: "Divorciado",
                            value: "divorced",
                          },
                          {
                            label: "Viúvo",
                            value: "widowed",
                          },
                        ],
                        isRequired: true,
                      }
                    },
                    {
                      array: {
                        title: "Contato",
                        id: "partnerContacts",
                        elements: [
                          {
                            select: {
                              label: "Tipo de contato",
                              name: "partnerContactType",
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
                              name: "partnerContactValue",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Ex.: email@email.com | (88) 98888-8888",
                              tooltip: "Valor de acordo com o tipo de contato",
                            }
                          },
                          {
                            input: {
                              label: "Comentário",
                              name: "partnerContactComment",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Ex.: E-mail comercial | Telefone do vizinho",
                              tooltip: "Informação adicional acerca do contato",
                              isMultipleLines: true,
                            }
                          },
                        ]
                      }
                    },
                    {
                      array: {
                        id: "partnerAddresses",
                        title: "Endereço",
                        elements: [
                          {
                            input: {
                              label: "CEP",
                              name: "partnerZipCode",
                              type: FormInputTypeEnum.Text,
                              placeholder: "00.000-000",
                              isRequired: true,
                              mask: "00.000-000",
                              apiRequest: {
                                endpoint: "__external-api/address",
                                formFieldsFilledByApiResponse: [
                                  {
                                    formFieldName: "partnerAddress",
                                    propertyFromApiToFillFormField: "address"
                                  },
                                  {
                                    formFieldName: "partnerDistrict",
                                    propertyFromApiToFillFormField: "neighborhood"
                                  },
                                  {
                                    formFieldName: "partnerCity",
                                    propertyFromApiToFillFormField: "city"
                                  },
                                  {
                                    formFieldName: "partnerState",
                                    propertyFromApiToFillFormField: "state"
                                  },
                                  {
                                    formFieldName: "partnerCountry",
                                    propertyFromApiToFillFormField: "country"
                                  },
                                ]
                              }
                            }
                          },
                          {
                            input: {
                              label: "Logradouro",
                              name: "partnerAddress",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Nome da Rua, Avenida, Travessa etc.",
                              isRequired: true,
                            }
                          },
                          {
                            input: {
                              label: "Número",
                              name: "partnerNumber",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Número da localização",
                              isRequired: true,
                            }
                          },
                          {
                            input: {
                              label: "Bairro",
                              name: "partnerDistrict",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Distrito do logradouro",
                              isRequired: true,
                            }
                          },
                          {
                            input: {
                              label: "Complemento",
                              name: "partnerComplement",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Mais informações que ajudem a achar seu endereço",
                            }
                          },
                          {
                            input: {
                              label: "País",
                              name: "partnerCountry",
                              type: FormInputTypeEnum.Text,
                              placeholder: "País do seu endereço",
                              isRequired: true,
                            }
                          },
                          {
                            input: {
                              label: "Estado",
                              name: "partnerState",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Estado do seu endereço",
                              isRequired: true,
                            }
                          },
                          {
                            input: {
                              label: "Cidade",
                              name: "partnerCity",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Município do seu endereço",
                              isRequired: true,
                            }
                          },
                        ],
                      }
                    },
                  ],
                }
              }
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
            title: "Endereço",
            id: "addressTab",
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
};