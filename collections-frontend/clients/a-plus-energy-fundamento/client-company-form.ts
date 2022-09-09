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
          {
            title: "Instalações",
            id: "settlementsTab",
            elements: [
              {
                array: {
                  id: "settlements",
                  title: "Instalação",
                  elements: [
                    {
                      select: {
                        label: "Tipo de instalação",
                        name: "settlementType",
                        type: FormInputTypeEnum.Text,
                        optionsObject: [
                          {
                            label: "Solo",
                            value: "ground",
                          },
                          {
                            label: "Teto",
                            value: "roof",
                          }
                        ]
                      }
                    },
                    {
                      select: {
                        label: "Tipo de geração",
                        name: "settlementGeneration",
                        type: FormInputTypeEnum.Text,
                        optionsObject: [
                          {
                            label: "Compartilhada",
                            value: "shared",
                          },
                          {
                            label: "Autoconsumo remoto",
                            value: "remoteSelfConsumption",
                          }
                        ]
                      }
                    },
                    {
                      array: {
                        id: "inverters",
                        title: "Inversor",
                        elements: [
                          {
                            autocomplete: {
                              label: "Inversor",
                              name: "settlementInverterId",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Ex.: SMA",
                              optionsApi: {
                                endpoint: "client-products",
                                labelField: "name",
                                valueField: "_id",
                                paramsToFilter: ["name", "ean13", "ean14"]
                              }
                            }
                          },
                          {
                            input: {
                              label: "Número de série",
                              name: "settlementInverterSerialNumber",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Ex.: SMA-09765-ZY",
                              tooltip: "Identificação única do produto",
                            }
                          },
                        ]
                      }
                    },
                    {
                      array: {
                        id: "modules",
                        title: "Módulo",
                        elements: [
                          {
                            autocomplete: {
                              label: "Módulo",
                              name: "settlementModuleId",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Ex.: Trina",
                              optionsApi: {
                                endpoint: "client-products",
                                labelField: "name",
                                valueField: "_id",
                                paramsToFilter: ["name", "ean13", "ean14"]
                              }
                            }
                          },
                          {
                            input: {
                              label: "Número de série",
                              name: "settlementModuleSerialNumber",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Ex.: Trina-09765-ZY",
                              tooltip: "Identificação única do produto",
                            }
                          },
                        ]
                      }
                    },
                    {
                      array: {
                        title: "Endereços beneficiados",
                        id: "benefitedAddresses",
                        elements: [
                          {
                            input: {
                              label: "CEP",
                              name: "benefitedZipCode",
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
                              name: "benefitedAddress",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Nome da Rua, Avenida, Travessa etc.",
                              isRequired: true,
                            }
                          },
                          {
                            input: {
                              label: "Número",
                              name: "benefitedNumber",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Número da localização",
                              isRequired: true,
                            }
                          },
                          {
                            input: {
                              label: "Bairro",
                              name: "benefitedDistrict",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Distrito do logradouro",
                              isRequired: true,
                            }
                          },
                          {
                            input: {
                              label: "Complemento",
                              name: "benefitedComplement",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Mais informações que ajudem a achar seu endereço",
                            }
                          },
                          {
                            input: {
                              label: "País",
                              name: "benefitedCountry",
                              type: FormInputTypeEnum.Text,
                              placeholder: "País do seu endereço",
                              isRequired: true,
                            }
                          },
                          {
                            input: {
                              label: "Estado",
                              name: "benefitedState",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Estado do seu endereço",
                              isRequired: true,
                            }
                          },
                          {
                            input: {
                              label: "Cidade",
                              name: "benefitedCity",
                              type: FormInputTypeEnum.Text,
                              placeholder: "Município do seu endereço",
                              isRequired: true,
                            }
                          },
                          {
                            array: {
                              id: "bills",
                              title: "Conta de energia",
                              elements: [
                                {
                                  input: {
                                    label: "Leitura atual",
                                    name: "referenceDate",
                                    type: FormInputTypeEnum.Date,
                                    tooltip: "Data referência para o cálculo atual",
                                  }
                                },
                                {
                                  input: {
                                    label: "Leitura anterior",
                                    name: "lastDate",
                                    type: FormInputTypeEnum.Date,
                                    tooltip: "Data referência para o cálculo anterior",
                                  }
                                },
                                {
                                  input: {
                                    label: "Preço",
                                    name: "billPrice",
                                    placeholder: "Em R$",
                                    type: FormInputTypeEnum.Number,
                                  }
                                },
                              ]
                            }
                          },
                        ],
                      }
                    },
                    {
                      input: {
                        label: "KVA transformador",
                        name: "settlementKvaConverter",
                        type: FormInputTypeEnum.Number,
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "kWp",
                        name: "settlementKwp",
                        type: FormInputTypeEnum.Number,
                        isRequired: true,
                      }
                    },
                    {
                      slide: {
                        label: "Possui string box",
                        name: "hasStringBox"
                      }
                    },
                    {
                      input: {
                        label: "Nº UC beneficiárias",
                        name: "settlementBeneficiaryQuantity",
                        type: FormInputTypeEnum.Number,
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "CEP",
                        name: "settlementZipCode",
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
                        name: "settlementAddress",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Nome da Rua, Avenida, Travessa etc.",
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Número",
                        name: "settlementNumber",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Número da localização",
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Bairro",
                        name: "settlementDistrict",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Distrito do logradouro",
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Complemento",
                        name: "settlementComplement",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Mais informações que ajudem a achar seu endereço",
                      }
                    },
                    {
                      input: {
                        label: "País",
                        name: "settlementCountry",
                        type: FormInputTypeEnum.Text,
                        placeholder: "País do seu endereço",
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Estado",
                        name: "settlementState",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Estado do seu endereço",
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Cidade",
                        name: "settlementCity",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Município do seu endereço",
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Geração média estimada",
                        name: "settlementEstimatedAverageGeneration",
                        placeholder: "Em KWh/mês",
                        type: FormInputTypeEnum.Number,
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Valor do kit",
                        name: "settlementKitPrice",
                        placeholder: "Em R$",
                        type: FormInputTypeEnum.Number,
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Investimento rede",
                        name: "settlementNetPrice",
                        placeholder: "Em R$",
                        type: FormInputTypeEnum.Number,
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Valor do serviço",
                        name: "settlementServicePrice",
                        placeholder: "Em R$",
                        type: FormInputTypeEnum.Number,
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Data de conexão",
                        name: "settlementConnectionDate",
                        type: FormInputTypeEnum.Date,
                        isRequired: true,
                      }
                    },
                    // {
                    //   input: {
                    //     label: "Investimento total",
                    //     name: "settlementTotalPrice",
                    //     placeholder: "Em R$",
                    //     type: FormInputTypeEnum.Number,
                    //     isDisabled: true,
                    //   }
                    // },
                    // {
                    //   input: {
                    //     label: "Retorno do investimento",
                    //     name: "settlementInvestmentReturn",
                    //     placeholder: "Em meses",
                    //     type: FormInputTypeEnum.Number,
                    //     isDisabled: true,
                    //   }
                    // },
                  ]
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