import { ConditionEnum, FormButtonTypeEnum, FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const COMPONENT_FORM: MainInterface = {
  backendFramework: BackendFrameworkEnum.Loopback,
  frontendFramework: FrontendFrameworkEnum.Angular,
  form: {
    title: "Componente",
    id: "componentForm",
    elements: [
      {
        tabs: [
          {
            title: "Coleção",
            id: "collectionTab",
            elements: [
              {
                input: {
                  label: "Título",
                  name: "collectionTitle",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Título identificador. Ex.: Animação",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Propriedade",
                  name: "collectionId",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Nome da coleção. Ex.: animation",
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
                  title: "Elemento de formulário",
                  id: "formArray",
                  elements: [
                    {
                      select: {
                        label: "Element",
                        name: "formElement",
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
                        isTriggerToCondition: true,
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Label",
                        name: "formLabel",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Element label",
                        isRequired: true
                      }
                    },
                    {
                      input: {
                        label: "Placeholder",
                        name: "formPlaceholder",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Element placeholder",
                      }
                    },
                    {
                      input: {
                        label: "Name",
                        name: "formName",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Name to be used as property",
                        isRequired: true
                      }
                    },
                    {
                      select: {
                        label: "Data type",
                        name: "formType",
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
                        label: "Options to select",
                        name: "formSelectOptions",
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
                        isTriggerToCondition: true,
                        conditions: {
                          id: "formElementSelect",
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              value: "select",
                            }
                          ]
                        },
                      }
                    },
                    {
                      input: {
                        label: "Endpoint",
                        name: "formEndpoint",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Endpoint para opções da seleção {{componentFormForm.get('formTitle')?.value}}",
                        conditions: {
                          id: "formSelectOptionsAPI",
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formSelectOptions",
                              value: "optionsAPI",
                            }
                          ]
                        },
                      }
                    },
                    {
                      input: {
                        label: "Atributo de etiqueta da opção",
                        name: "formOptionLabelField",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Label para opções da seleção {{componentFormForm.get('formTitle')?.value}}",
                        conditions: {
                          id: "formSelectOptionsAPI",
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formSelectOptions",
                              value: "optionsAPI",
                            }
                          ]
                        },
                      }
                    },
                    {
                      input: {
                        label: "Atributo de valor da opção",
                        name: "formOptionValueField",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Valor para opções da seleção {{componentFormForm.get('formTitle')?.value}}",
                        conditions: {
                          id: "formSelectOptionsAPI",
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formSelectOptions",
                              value: "optionsAPI",
                            }
                          ]
                        },
                      }
                    },
                    {
                      array: {
                        id: "selectOptionArray",
                        title: "Option",
                        elements: [
                          {
                            input: {
                              label: "Label",
                              name: "selectOptionLabel",
                              type: FormInputTypeEnum.Text
                            }
                          },
                          {
                            input: {
                              label: "Value",
                              name: "selectOptionValue",
                              type: FormInputTypeEnum.Text
                            }
                          },
                        ],
                        conditions: {
                          id: "formSelectOptionsObject",
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formSelectOptions",
                              value: "optionsObject",
                            }
                          ]
                        },
                      }
                    },
                    {
                      slide: {
                        label: "Seleção múltipla",
                        name: "formSelectIsMultiple",
                        conditions: {
                          id: "formElementSelect",
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              value: "select"
                            }
                          ]
                        }
                      }
                    },
                    {
                      slide: {
                        label: "Seleção múltipla",
                        name: "formAutocompleteIsMultiple",
                        conditions: {
                          id: "formElementAutocomplete",
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              value: "autocomplete"
                            }
                          ]
                        }
                      }
                    },
                    {
                      input: {
                        label: "Filtros",
                        name: "formParamsToFilter",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Matriz de campos para filtragem em \${componentFormForm.get('formTitle')?.value}",
                        conditions: {
                          id: "formElementAutocomplete",
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              value: "autocomplete",
                            }
                          ]
                        },
                      }
                    },
                    {
                      slide: {
                        label: "Obrigatório",
                        name: "formIsRequired",
                      }
                    },
                    {
                      slide: {
                        label: "Desabilitado",
                        name: "formIsDisabled",
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
                array: {
                  title: "Coluna e linha",
                  id: "columnAndRowArray",
                  elements: [
                    {
                      input: {
                        label: "Etiqueta de coluna",
                        name: "tableColumnLabel",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Label de coluna",
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Campo da linha",
                        name: "tableRowField",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Campo de BD que preenche linha",
                      }
                    },
                    {
                      select: {
                        label: "Tipo de menu",
                        name: "tableMenuType",
                        type: FormInputTypeEnum.Text,
                        optionsObject: [
                          {
                            label: "API",
                            value: "API"
                          },
                          {
                            label: "Object",
                            value: "OBJECT"
                          },
                          {
                            label: "Link",
                            value: "LINK"
                          },
                          {
                            label: "Modal",
                            value: "DIALOG"
                          },
                        ],
                      }
                    },
                    {
                      input: {
                        label: "Etiqueta do link",
                        name: "tableMenuLinkLabel",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Label do link do menu",
                        conditions: {
                          id: "tableMenuType",
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "tableMenuType",
                              value: "LINK",
                            }
                          ]
                        },
                      }
                    },
                    {
                      input: {
                        label: "Rota do link",
                        name: "tableMenuLinkUrl",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Rota do link do menu",
                        conditions: {
                          id: "tableMenuType",
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "tableMenuType",
                              value: "LINK",
                            }
                          ]
                        },
                      }
                    },
                    {
                      input: {
                        label: "Parâmetro do link",
                        name: "tableMenuLinkParam",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Parâmetro do link do menu. Exemplo: _id",
                        conditions: {
                          id: "tableMenuType",
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "tableMenuType",
                              value: "LINK",
                            }
                          ]
                        },
                      }
                    },
                    {
                      input: {
                        label: "Etiqueta da chamada de diálogo",
                        name: "tableMenuDialogLabel",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Label do diálogo do menu",
                        conditions: {
                          id: "tableMenuType",
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "tableMenuType",
                              value: "LINK",
                            }
                          ]
                        },
                      }
                    },
                    {
                      select: {
                        label: "Opções de modais",
                        name: "tableMenuDialogParam",
                        type: FormInputTypeEnum.Text,
                        todo: "Default value",
                        optionsObject: [
                          {
                            label: "Confirmar remoção", 
                            value: "removeConfirmationDialog",
                          }
                        ],
                        conditions: {
                          id: "tableMenuType",
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "tableMenuType",
                              value: "LINK",
                            }
                          ]
                        },
                      }
                    },
                    {
                      slide: {
                        label: "Menu na linha",
                        name: "tableIsMenu",
                      }
                    },
                  ]
                }
              },              
            ]
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
      endPoint: "components",
      hasAuthorization: true,
      methods: [
        ServiceFunctionsEnum.Get,
        ServiceFunctionsEnum.Delete,
        ServiceFunctionsEnum.Save,
        ServiceFunctionsEnum.Update,
        ServiceFunctionsEnum.Find,
      ],
    }
  }
}