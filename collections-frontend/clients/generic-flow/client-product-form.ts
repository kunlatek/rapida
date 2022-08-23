import { FormButtonTypeEnum, FormInputTypeEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_PRODUCT_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    id: "clientProductForm",
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
                  placeholder: "Ex.: Seagate Spinpoint Internal Hard Drive 2.5\" 1 TB",
                  tooltip: "Nome que será utilizado como referência na busca do produto",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Descrição",
                  name: "name",
                  type: FormInputTypeEnum.Text,
                  isMultipleLines: true,
                  placeholder: "Ex.: Ideal para dispositivos digitais portáteis de todos os tipos, incluindo computadores notebook, armazenamento externo e media players digitais.",
                  tooltip: "Descrição para agregar valor comercial ao produto",
                }
              },
              {
                select: {
                  label: "Fabricante",
                  name: "manufacturer",
                  type: FormInputTypeEnum.Text,
                  optionsApi: {
                    endpoint: "manufacturers",
                    labelField: "name",
                    valueField: "_id",
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
                  tooltip: "Código padrão 13 dígitos",
                  maxLength: 14,
                }
              },
            ],
          },
          {
            id: "othersTab",
            title: "Informações adicionais",
            elements: [
              {
                array: {
                  id: "otherArray",
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
    ]
  }
}