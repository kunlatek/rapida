import { FormInputTypeEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const MODULE_FORM: MainInterface = {
  backendFramework: BackendFrameworkEnum.Loopback,
  frontendFramework: FrontendFrameworkEnum.Angular,
  form: {
    title: "Componente",
    id: "component",
    elements: [
      {
        tabs: [
          {
            title: "Coleção",
            id: "collectionTab",
            elements: [
              {
                input: {
                  label: "Nome",
                  name: "id",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Nome da coleção. Ex.: animation",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Título",
                  name: "title",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Título identificador. Ex.: Animação",
                  isRequired: true,
                }
              },
            ]
          },
          {
            title: "Formulário",
            id: "formTab",
            elements: [
              {
                array: {
                  title: "Formulário",
                  id: "formArray",
                  elements: [
                    {
                      select: {
                        label: "Elemento",
                        name: "element",
                        type: FormInputTypeEnum.Text,
                        optionsObject: [
                          {
                            label: "Array",
                            value: "array"
                          },
                          {
                            label: "Autocomplete",
                            value: "autocomplete"
                          },
                          {
                            label: "Checkbox",
                            value: "checkbox"
                          },
                          {
                            label: "Radio",
                            value: "radio"
                          },
                          {
                            label: "Input",
                            value: "input"
                          },
                          {
                            label: "Select",
                            value: "select"
                          },
                          {
                            label: "Slide",
                            value: "slide"
                          },
                          {
                            label: "Tabs",
                            value: "tabs"
                          },
                          {
                            label: "Text area",
                            value: "textarea"
                          },
                        ],
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Etiqueta do elemento",
                        name: "label",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Label do elemento. Ex.: Nome",
                        isRequired: true
                      }
                    },
                    {
                      input: {
                        label: "Detalhamento",
                        name: "placeholder",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Detalhamento da etiqueta. Ex.: Nome na etiqueta",
                      }
                    },
                    {
                      input: {
                        label: "Propriedade",
                        name: "name",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Nome do campo para BD. Ex.: name",
                        isRequired: true
                      }
                    },
                    {
                      select: {
                        label: "Tipo de dado",
                        name: "type",
                        type: FormInputTypeEnum.Text,
                        optionsObject: [
                          {
                            label: "Texto",
                            value: "text"
                          },
                          {
                            label: "Número",
                            value: "number"
                          },
                          {
                            label: "E-mail",
                            value: "email"
                          },
                          {
                            label: "Data",
                            value: "date"
                          },
                          {
                            label: "Arquivo",
                            value: "file"
                          },
                        ],
                        isRequired: true
                      }
                    },
                    {
                      select: {
                        label: "Entrada de opções",
                        name: "optionsInput",
                        type: FormInputTypeEnum.Text,
                        optionsObject: [
                          {
                            label: "Manual",
                            value: "optionsObject"
                          },
                          {
                            label: "API",
                            value: "optionsAPI"
                          },
                        ],
                        condition: `componentFormForm.get("element").value === "select"`,
                      }
                    },
                    {
                      input: {
                        label: "Endpoint",
                        name: "endpoint",
                        type: FormInputTypeEnum.Text,
                        placeholder: `Endpoint para opções da seleção {{componentFormForm.get("title").value}}`,
                        condition: `componentFormForm.get("optionsInput").value === "optionsAPI"`
                      }
                    },
                    {
                      input: {
                        label: "Atributo de etiqueta da opção",
                        name: "labelField",
                        type: FormInputTypeEnum.Text,
                        placeholder: `Label para opções da seleção {{componentFormForm.get("title").value}}`,
                        condition: `componentFormForm.get("optionsInput").value === "optionsAPI"`
                      }
                    },
                    {
                      input: {
                        label: "Atributo de valor da opção",
                        name: "valueField",
                        type: FormInputTypeEnum.Text,
                        placeholder: `Valor para opções da seleção {{componentFormForm.get("title").value}}`,
                        condition: `componentFormForm.get("optionsInput").value === "optionsAPI"`
                      }
                    },
                    {
                      input: {
                        label: "Matriz para etiqueta de opção",
                        name: "label",
                        type: FormInputTypeEnum.Text,
                        placeholder: `Label para opções da seleção {{componentFormForm.get("title").value}}`,
                        condition: `componentFormForm.get("optionsInput").value === "optionsObject"`
                      }
                    },
                    {
                      input: {
                        label: "Matriz para valor de opção",
                        name: "value",
                        type: FormInputTypeEnum.Text,
                        placeholder: `Valor para opções da seleção {{componentFormForm.get("title").value}}`,
                        condition: `componentFormForm.get("optionsInput").value === "optionsObject"`
                      }
                    },
                    {
                      slide: {
                        label: "Seleção múltipla",
                        name: "isMultiple",
                        type: FormInputTypeEnum.Text,
                        condition: `componentFormForm.get("optionsInput").value === "optionsAPI" || componentFormForm.get("optionsInput").value === "optionsObject"`,
                      }
                    },
                    {
                      input: {
                        label: "Filtros",
                        name: "paramsToFilter",
                        type: FormInputTypeEnum.Text,
                        placeholder: `Matriz de campos para filtragem em \${componentFormForm.get("title").value}`,
                        condition: `componentFormForm.get("element").value === "autocomplete"`
                      }
                    },
                    {
                      slide: {
                        label: "Obrigatório",
                        name: "isRequired",
                        type: FormInputTypeEnum.Text,
                      }
                    },
                    {
                      slide: {
                        label: "Desabilitado",
                        name: "isDisabled",
                        type: FormInputTypeEnum.Text,
                      }
                    },
                    {
                      autocomplete: {
                        label: "Tab relacionada",
                        name: "relatedTab",
                        type: FormInputTypeEnum.Text,
                        optionsApi: {
                          endpoint: `components?{[type:"tabs"]}`,
                          labelField: "title",
                          valueField: "id",
                          paramsToFilter: ["title", "id"]
                        },
                        condition: `componentFormForm.get("element").value === "select"`,
                      }
                    },
                    {
                      autocomplete: {
                        label: "Array relacionada",
                        name: "relatedArray",
                        type: FormInputTypeEnum.Text,
                        optionsApi: {
                          endpoint: `components?{[type:"array"]}`,
                          labelField: "title",
                          valueField: "id",
                          paramsToFilter: ["title", "id"]
                        },
                        condition: `componentFormForm.get("element").value === "select"`,
                      }
                    },
                  ]
                }
              },
            ]
          },
          {
            title: "Tabela",
            id: "tableTab",
            elements: [
              {
                input: {
                  label: "Nome",
                  name: "id",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Nome da coleção. Ex.: animation",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Título",
                  name: "title",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Título identificador. Ex.: Animação",
                  isRequired: true,
                }
              },
              {
                array: {
                  title: "Coluna e linha",
                  id: "columnAndRowArray",
                  elements: [
                    {
                      input: {
                        label: "Etiqueta de coluna",
                        name: "columnLabel",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Label de coluna",
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Campo da linha",
                        name: "rowField",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Campo de BD que preenche linha",
                        condition: `componentFormForm.get("isMenu").value`,
                      }
                    },
                    {
                      slide: {
                        label: "Menu na linha",
                        name: "isMenu",
                        type: FormInputTypeEnum.Text
                      }
                    },
                  ]
                }
              },              
            ]
          },
        ]
      }
    ]
  }
}