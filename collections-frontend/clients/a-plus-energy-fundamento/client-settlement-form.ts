import { FormButtonTypeEnum, FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_SETTLEMENT_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    id: "clientSettlementForm",
    title: "Instalação",
    elements: [
      {
        autocomplete: {
          label: "Cliente",
          name: "clientId",
          type: FormInputTypeEnum.Text,
          placeholder: "Cliente da instalação",
          optionsApi: {
            endpoint: "clients",
            labelField: "name",
            valueField: "_id",
            paramsToFilter: ["name", "uniqueId"]
          },
          isRequired: true,
        }
      },
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
          ],
          isRequired: true,
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
          ],
          isRequired: true,
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
                  endpoint: "products",
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
                  endpoint: "products",
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
          title: "Endereço beneficiado",
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
                      formFieldName: "benefitedAddress",
                      propertyFromApiToFillFormField: "address"
                    },
                    {
                      formFieldName: "benefitedDistrict",
                      propertyFromApiToFillFormField: "neighborhood"
                    },
                    {
                      formFieldName: "benefitedCity",
                      propertyFromApiToFillFormField: "city"
                    },
                    {
                      formFieldName: "benefitedState",
                      propertyFromApiToFillFormField: "state"
                    },
                    {
                      formFieldName: "benefitedCountry",
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
                  {
                    input: {
                      label: "Documento da conta",
                      name: "billFile",
                      type: FormInputTypeEnum.File,
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
                formFieldName: "settlementAddress",
                propertyFromApiToFillFormField: "address"
              },
              {
                formFieldName: "settlementDistrict",
                propertyFromApiToFillFormField: "neighborhood"
              },
              {
                formFieldName: "settlementCity",
                propertyFromApiToFillFormField: "city"
              },
              {
                formFieldName: "settlementState",
                propertyFromApiToFillFormField: "state"
              },
              {
                formFieldName: "settlementCountry",
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
      {
        button: {
          label: "Criar",
          type: FormButtonTypeEnum.Submit,
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
    ],
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "client-settlements",
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