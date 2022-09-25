import { FormButtonTypeEnum, FormInputTypeEnum, ParamTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const PRODUCT_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    id: "productForm",
    title: "Produto",
    elements: [
      {
        tabs: [
          {
            id: "mainTab",
            title: "Dados principais",
            elements: [
              {
                input: {
                  label: "Nome",
                  name: "name",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Ex.: Seagate Spinpoint Internal Hard Drive 2.5'' 1 TB",
                  tooltip: "Nome que será utilizado como referência na busca do produto",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Descrição",
                  name: "description",
                  type: FormInputTypeEnum.Text,
                  isMultipleLines: true,
                  placeholder: "Ex.: Ideal para dispositivos digitais portáteis de todos os tipos, incluindo computadores notebook, armazenamento externo e media players digitais.",
                  tooltip: "Descrição para agregar valor comercial ao produto",
                }
              },
              {
                autocomplete: {
                  label: "Fabricante",
                  name: "manufacturerId",
                  type: FormInputTypeEnum.Text,
                  optionsApi: {
                    endpoint: "manufacturers",
                    labelField: "name",
                    valueField: "_id",
                    paramsToFilter: ["name"],
                    paramType: ParamTypeEnum.Query,
                  }
                }
              },
              {
                input: {
                  label: "Modelo",
                  name: "model",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Ex.: ST100LM024",
                  tooltip: "Modelo que destaca o produto dos outros da mesma espécie na fabricante",
                }
              },
              {
                input: {
                  label: "Código de barras EAN13",
                  name: "ean13",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Ex.: 7891000062296",
                  tooltip: "Código padrão 13 dígitos",
                  maxLength: 13,
                }
              },
              {
                input: {
                  label: "Código de barras EAN14",
                  name: "ean14",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Ex.: C7872G14AA1FXP",
                  tooltip: "Código padrão 14 dígitos",
                  maxLength: 14,
                }
              },
            ],
          },
          {
            id: "measuresTab",
            title: "Medidas do produto",
            elements: [
              {
                input: {
                  label: "Comprimento",
                  name: "width",
                  type: FormInputTypeEnum.Number,
                  placeholder: "Em centímetros",
                }
              },
              {
                input: {
                  label: "Altura",
                  name: "height",
                  type: FormInputTypeEnum.Number,
                  placeholder: "Em centímetros",
                }
              },
              {
                input: {
                  label: "Largura (ou profundidade)",
                  name: "length",
                  type: FormInputTypeEnum.Number,
                  placeholder: "Em centímetros",
                }
              },
              {
                input: {
                  label: "Peso",
                  name: "weight",
                  type: FormInputTypeEnum.Number,
                  placeholder: "Em gramas",
                }
              },
            ]
          },
          {
            id: "inputsTab",
            title: "Insumos",
            elements: [
              {
                array: {
                  id: "inputs",
                  title: "Insumo",
                  elements: [
                    {
                      autocomplete: {
                        label: "Produto",
                        name: "productId",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Ex.: Parafuso SX Inox 6x50mm Ciser",
                        tooltip: "Produto utilizado paraa construção deste produto",
                        optionsApi: {
                          endpoint: "products",
                          labelField: "name",
                          valueField: "_id",
                          paramsToFilter: ["name", "model", "ean13", "ean14"],
                          paramType: ParamTypeEnum.Query,
                        }
                      }
                    },
                    {
                      input: {
                        label: "Quantidade",
                        name: "inputQuantity",
                        type: FormInputTypeEnum.Number,
                      }
                    },
                    {
                      input: {
                        label: "Comentário",
                        name: "inputComment",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Ex.: Costuma enferrujar antes do vencimento do produto",
                        tooltip: "Detalhamento ou aviso acerca da integração dos produtos",
                        isMultipleLines: true,
                      }
                    },
                  ],
                }
              }
            ],
          },
          {
            id: "othersTab",
            title: "Informações adicionais",
            elements: [
              {
                array: {
                  id: "others",
                  title: "Informação",
                  elements: [
                    {
                      input: {
                        label: "Atributo",
                        name: "otherProperty",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Ex.: Quantidade de ouro na composição",
                        tooltip: "Identificador da característica a qual você quer atribuir ao produto"
                      }
                    },
                    {
                      input: {
                        label: "Valor",
                        name: "otherValue",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Ex.: 1g",
                        tooltip: "Valor acerca da característica atribuída ao produto"
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
      endpoint: "products",
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