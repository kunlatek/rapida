import { ConditionEnum, FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { FilterComparisonOperatorEnum, FilterLogicalOperatorEnum } from "../../../src/enums/request";
import { MainInterface } from "../../../src/interfaces/main";

export const COMPONENT_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    title: "Componente",
    id: "componentForm",
    elements: [
      {
        array: {
          title: "Elemento",
          id: "elementArray",
          elements: [
            {
              select: {
                label: "Tipo de elemento",
                name: "elementType",
                type: FormInputTypeEnum.Text,
                optionsApi: {
                  externalEndpoint: "http://localhost:3001/form-elements",
                  labelField: "label",
                  valueField: "value",
                },
                isTriggerToCondition: true,
                isRequired: true,
              }
            },
            {
              select: {
                label: "Origem da option",
                name: "optionOrigin",
                type: FormInputTypeEnum.Text,
                optionsObject: [
                  {
                    label: "API",
                    value: "optionsApi",
                    isSelected: true,
                  },
                  {
                    label: "Manual",
                    value: "optionsObject"
                  },
                ],
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "elementType",
                      value: "62f2a53f564a1a9274f87f35",
                    },
                    {
                      key: "elementType",
                      value: "62f2a55f564a1a9274f87f39",
                      logicalOperator: FilterLogicalOperatorEnum.Or,
                    }
                  ]
                }
              },
            },
            {
              input: {
                label: "Endpoint",
                name: "optionApiEndpoint",
                type: FormInputTypeEnum.Text,
                placeholder: "Ex.: animations",
                tooltip: "Endpoint com dados para option",
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "optionOrigin",
                      value: "optionsApi",
                      logicalOperator: FilterLogicalOperatorEnum.And,
                    },
                    {
                      key: "elementType",
                      value: "62f2a55f564a1a9274f87f39",
                      logicalOperator: FilterLogicalOperatorEnum.Or,
                    },
                    {
                      key: "elementType",
                      value: "62f2a53f564a1a9274f87f35",
                    },
                  ]
                }
              }
            },
            {
              input: {
                label: "Label",
                name: "optionApiLabelField",
                type: FormInputTypeEnum.Text,
                placeholder: "Ex.: name",
                tooltip: "Campo que preencherá o label da option",
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "optionOrigin",
                      value: "optionsApi",
                      logicalOperator: FilterLogicalOperatorEnum.And,
                    },
                    {
                      key: "elementType",
                      value: "62f2a55f564a1a9274f87f39",
                      logicalOperator: FilterLogicalOperatorEnum.Or,
                    },
                    {
                      key: "elementType",
                      value: "62f2a53f564a1a9274f87f35",
                    },
                  ]
                }
              }
            },
            {
              input: {
                label: "Value",
                name: "optionApiValueField",
                type: FormInputTypeEnum.Text,
                placeholder: "Ex.: _id",
                tooltip: "Campo que preencherá o value da option",
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "optionOrigin",
                      value: "optionsApi",
                      logicalOperator: FilterLogicalOperatorEnum.And,
                    },
                    {
                      key: "elementType",
                      value: "62f2a55f564a1a9274f87f39",
                      logicalOperator: FilterLogicalOperatorEnum.Or,
                    },
                    {
                      key: "elementType",
                      value: "62f2a53f564a1a9274f87f35",
                    },
                  ]
                }
              }
            },
            {
              array: {
                title: "Opção manual",
                id: "manualOptionArray",
                elements: [
                  {
                    input: {
                      label: "Label",
                      name: "optionObjectLabelField",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: Masculino",
                      tooltip: "String que preencherá o label da option",
                    }
                  },
                  {
                    input: {
                      label: "Value",
                      name: "optionObjectValueField",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: male",
                      tooltip: "String que preencherá o value da option",
                    }
                  },
                ],
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "optionOrigin",
                      value: "optionsObject",
                      logicalOperator: FilterLogicalOperatorEnum.And,
                    },
                    {
                      key: "elementType",
                      value: "62f2a55f564a1a9274f87f39",
                      logicalOperator: FilterLogicalOperatorEnum.Or,
                    },
                    {
                      key: "elementType",
                      value: "62f2a53f564a1a9274f87f35",
                    },
                  ]
                }
              }
            },
            {
              array: {
                title: "Tab",
                id: "tabArray",
                elements: [
                  {
                    select: {
                      label: "Tipo de elemento",
                      name: "elementTypeTab",
                      type: FormInputTypeEnum.Text,
                      optionsApi: {
                        externalEndpoint: "http://localhost:3001/form-elements",
                        labelField: "label",
                        valueField: "value",
                      },
                      isTriggerToCondition: true,
                      isRequired: true,
                    }
                  },
                  {
                    select: {
                      label: "Origem da option",
                      name: "optionOriginTab",
                      type: FormInputTypeEnum.Text,
                      optionsObject: [
                        {
                          label: "API",
                          value: "optionsApi",
                          isSelected: true,
                        },
                        {
                          label: "Manual",
                          value: "optionsObject"
                        },
                      ],
                      isTriggerToCondition: true,
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeTab",
                            value: "62f2a53f564a1a9274f87f35",
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a55f564a1a9274f87f39",
                            logicalOperator: FilterLogicalOperatorEnum.Or,
                          }
                        ]
                      }
                    },
                  },
                  {
                    input: {
                      label: "Endpoint",
                      name: "optionApiEndpointTab",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: animations",
                      tooltip: "Endpoint com dados para option",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "optionOriginTab",
                            value: "optionsApi",
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a55f564a1a9274f87f39",
                            logicalOperator: FilterLogicalOperatorEnum.Or,
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a53f564a1a9274f87f35",
                          },
                        ]
                      }
                    }
                  },
                  {
                    input: {
                      label: "Label",
                      name: "optionApiLabelFieldTab",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: name",
                      tooltip: "Campo que preencherá o label da option",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "optionOriginTab",
                            value: "optionsApi",
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a55f564a1a9274f87f39",
                            logicalOperator: FilterLogicalOperatorEnum.Or,
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a53f564a1a9274f87f35",
                          },
                        ]
                      }
                    }
                  },
                  {
                    input: {
                      label: "Value",
                      name: "optionApiValueFieldTab",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: _id",
                      tooltip: "Campo que preencherá o value da option",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "optionOriginTab",
                            value: "optionsApi",
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a55f564a1a9274f87f39",
                            logicalOperator: FilterLogicalOperatorEnum.Or,
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a53f564a1a9274f87f35",
                          },
                        ]
                      }
                    }
                  },
                  {
                    array: {
                      title: "Opção manual",
                      id: "manualOptionArrayTab",
                      elements: [
                        {
                          input: {
                            label: "Label",
                            name: "optionObjectLabelFieldTab",
                            type: FormInputTypeEnum.Text,
                            placeholder: "Ex.: Masculino",
                            tooltip: "String que preencherá o label da option",
                          }
                        },
                        {
                          input: {
                            label: "Value",
                            name: "optionObjectValueFieldTab",
                            type: FormInputTypeEnum.Text,
                            placeholder: "Ex.: male",
                            tooltip: "String que preencherá o value da option",
                          }
                        },
                      ],
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "optionOriginTab",
                            value: "optionsObject",
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a55f564a1a9274f87f39",
                            logicalOperator: FilterLogicalOperatorEnum.Or,
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a53f564a1a9274f87f35",
                          },
                        ]
                      }
                    }
                  },
                  {
                    array: {
                      title: "Array element",
                      id: "arrayArrayTab",
                      elements: [
                        {
                          select: {
                            label: "Tipo de elemento",
                            name: "elementTypeArrayTab",
                            type: FormInputTypeEnum.Text,
                            optionsApi: {
                              externalEndpoint: "http://localhost:3001/form-elements",
                              labelField: "label",
                              valueField: "value",
                            },
                            isTriggerToCondition: true,
                            isRequired: true,
                          }
                        },
                        {
                          select: {
                            label: "Origem da option",
                            name: "optionOriginArrayTab",
                            type: FormInputTypeEnum.Text,
                            optionsObject: [
                              {
                                label: "API",
                                value: "optionsApi",
                                isSelected: true,
                              },
                              {
                                label: "Manual",
                                value: "optionsObject"
                              },
                            ],
                            isTriggerToCondition: true,
                            conditions: {
                              type: ConditionEnum.Form,
                              elements: [
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a53f564a1a9274f87f35",
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a55f564a1a9274f87f39",
                                  logicalOperator: FilterLogicalOperatorEnum.Or,
                                }
                              ]
                            }
                          },
                        },
                        {
                          input: {
                            label: "Endpoint",
                            name: "optionApiEndpointArrayTab",
                            type: FormInputTypeEnum.Text,
                            placeholder: "Ex.: animations",
                            tooltip: "Endpoint com dados para option",
                            conditions: {
                              type: ConditionEnum.Form,
                              elements: [
                                {
                                  key: "optionOriginArrayTab",
                                  value: "optionsApi",
                                  logicalOperator: FilterLogicalOperatorEnum.And,
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a55f564a1a9274f87f39",
                                  logicalOperator: FilterLogicalOperatorEnum.Or,
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a53f564a1a9274f87f35",
                                },
                              ]
                            }
                          }
                        },
                        {
                          input: {
                            label: "Label",
                            name: "optionApiLabelFieldArrayTab",
                            type: FormInputTypeEnum.Text,
                            placeholder: "Ex.: name",
                            tooltip: "Campo que preencherá o label da option",
                            conditions: {
                              type: ConditionEnum.Form,
                              elements: [
                                {
                                  key: "optionOriginArrayTab",
                                  value: "optionsApi",
                                  logicalOperator: FilterLogicalOperatorEnum.And,
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a55f564a1a9274f87f39",
                                  logicalOperator: FilterLogicalOperatorEnum.Or,
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a53f564a1a9274f87f35",
                                },
                              ]
                            }
                          }
                        },
                        {
                          input: {
                            label: "Value",
                            name: "optionApiValueFieldArrayTab",
                            type: FormInputTypeEnum.Text,
                            placeholder: "Ex.: _id",
                            tooltip: "Campo que preencherá o value da option",
                            conditions: {
                              type: ConditionEnum.Form,
                              elements: [
                                {
                                  key: "optionOriginArrayTab",
                                  value: "optionsApi",
                                  logicalOperator: FilterLogicalOperatorEnum.And,
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a55f564a1a9274f87f39",
                                  logicalOperator: FilterLogicalOperatorEnum.Or,
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a53f564a1a9274f87f35",
                                },
                              ]
                            }
                          }
                        },
                        {
                          array: {
                            title: "Opção manual",
                            id: "manualOptionArrayArrayTab",
                            elements: [
                              {
                                input: {
                                  label: "Label",
                                  name: "optionObjectLabelFieldArrayTab",
                                  type: FormInputTypeEnum.Text,
                                  placeholder: "Ex.: Masculino",
                                  tooltip: "String que preencherá o label da option",
                                }
                              },
                              {
                                input: {
                                  label: "Value",
                                  name: "optionObjectValueFieldArrayTab",
                                  type: FormInputTypeEnum.Text,
                                  placeholder: "Ex.: male",
                                  tooltip: "String que preencherá o value da option",
                                }
                              },
                            ],
                            conditions: {
                              type: ConditionEnum.Form,
                              elements: [
                                {
                                  key: "optionOriginArrayTab",
                                  value: "optionsObject",
                                  logicalOperator: FilterLogicalOperatorEnum.And,
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a55f564a1a9274f87f39",
                                  logicalOperator: FilterLogicalOperatorEnum.Or,
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a53f564a1a9274f87f35",
                                },
                              ]
                            }
                          }
                        },
                        {
                          input: {
                            label: "Label",
                            name: "labelArrayTab",
                            type: FormInputTypeEnum.Text,
                            placeholder: "Ex.: Animação",
                            tooltip: "Legenda principal do elemento de formulário",
                            conditions: {
                              type: ConditionEnum.Form,
                              elements: [
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a56d564a1a9274f87f3b",
                                  comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a526564a1a9274f87f34",
                                  comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                                  logicalOperator: FilterLogicalOperatorEnum.And,
                                },
                              ]
                            },
                            isRequired: true,
                          }
                        },
                        {
                          input: {
                            label: "Name",
                            name: "nameArrayTab",
                            type: FormInputTypeEnum.Text,
                            placeholder: "Ex.: animation",
                            tooltip: "Identificação referência para tratamento do dado",
                            conditions: {
                              type: ConditionEnum.Form,
                              elements: [
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a56d564a1a9274f87f3b",
                                  comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a526564a1a9274f87f34",
                                  comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                                  logicalOperator: FilterLogicalOperatorEnum.And,
                                },
                              ]
                            },
                            isRequired: true,
                          }
                        },
                        {
                          select: {
                            label: "Tipo de dado",
                            name: "typeArrayTab",
                            type: FormInputTypeEnum.Text,
                            optionsApi: {
                              externalEndpoint: "http://localhost:3001/data-types",
                              labelField: "label",
                              valueField: "value",
                            },
                            conditions: {
                              type: ConditionEnum.Form,
                              elements: [
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a56d564a1a9274f87f3b",
                                  comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a526564a1a9274f87f34",
                                  comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                                  logicalOperator: FilterLogicalOperatorEnum.And,
                                },
                              ]
                            },
                            isRequired: true,
                          }
                        },
                        {
                          input: {
                            label: "Placeholder",
                            name: "placeholderArrayTab",
                            type: FormInputTypeEnum.Text,
                            placeholder: "Ex.: Ex.: The Simpsons",
                            tooltip: "Legenda secundária do elemento de formulário",
                            conditions: {
                              type: ConditionEnum.Form,
                              elements: [
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a56d564a1a9274f87f3b",
                                  comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a526564a1a9274f87f34",
                                  comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                                  logicalOperator: FilterLogicalOperatorEnum.And,
                                },
                              ]
                            },
                          }
                        },
                        {
                          input: {
                            label: "Tooltip",
                            name: "tooltipArrayTab",
                            type: FormInputTypeEnum.Text,
                            placeholder: "Ex.: Nome da animação",
                            tooltip: "Legenda de reforço do elemento de formulário",
                            conditions: {
                              type: ConditionEnum.Form,
                              elements: [
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a56d564a1a9274f87f3b",
                                  comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a526564a1a9274f87f34",
                                  comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                                  logicalOperator: FilterLogicalOperatorEnum.And,
                                },
                              ]
                            },
                          }
                        },
                        {
                          slide: {
                            label: "Required",
                            name: "isRequiredArrayTab",
                            conditions: {
                              type: ConditionEnum.Form,
                              elements: [
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a56d564a1a9274f87f3b",
                                  comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a526564a1a9274f87f34",
                                  comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                                  logicalOperator: FilterLogicalOperatorEnum.And,
                                },
                              ]
                            },
                          }
                        },
                        {
                          slide: {
                            label: "Disabled",
                            name: "isDisabledArrayTab",
                            conditions: {
                              type: ConditionEnum.Form,
                              elements: [
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a56d564a1a9274f87f3b",
                                  comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                                },
                                {
                                  key: "elementTypeArrayTab",
                                  value: "62f2a526564a1a9274f87f34",
                                  comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                                  logicalOperator: FilterLogicalOperatorEnum.And,
                                },
                              ]
                            },
                          }
                        },
                      ],
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementType",
                            value: "62f2a526564a1a9274f87f34",
                          }
                        ]
                      }
                    }
                  },
                  {
                    input: {
                      label: "Label",
                      name: "labelTab",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: Animação",
                      tooltip: "Legenda principal do elemento de formulário",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeTab",
                            value: "62f2a56d564a1a9274f87f3b",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a526564a1a9274f87f34",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                        ]
                      },
                      isRequired: true,
                    }
                  },
                  {
                    input: {
                      label: "Name",
                      name: "nameTab",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: animation",
                      tooltip: "Identificação referência para tratamento do dado",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeTab",
                            value: "62f2a56d564a1a9274f87f3b",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a526564a1a9274f87f34",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                        ]
                      },
                      isRequired: true,
                    }
                  },
                  {
                    select: {
                      label: "Tipo de dado",
                      name: "typeTab",
                      type: FormInputTypeEnum.Text,
                      optionsApi: {
                        externalEndpoint: "http://localhost:3001/data-types",
                        labelField: "label",
                        valueField: "value",
                      },
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeTab",
                            value: "62f2a56d564a1a9274f87f3b",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a526564a1a9274f87f34",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                        ]
                      },
                      isRequired: true,
                    }
                  },
                  {
                    input: {
                      label: "Placeholder",
                      name: "placeholderTab",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: Ex.: The Simpsons",
                      tooltip: "Legenda secundária do elemento de formulário",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeTab",
                            value: "62f2a56d564a1a9274f87f3b",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a526564a1a9274f87f34",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                        ]
                      },
                    }
                  },
                  {
                    input: {
                      label: "Tooltip",
                      name: "tooltipTab",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: Nome da animação",
                      tooltip: "Legenda de reforço do elemento de formulário",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeTab",
                            value: "62f2a56d564a1a9274f87f3b",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a526564a1a9274f87f34",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                        ]
                      },
                    }
                  },
                  {
                    slide: {
                      label: "Required",
                      name: "isRequiredTab",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeTab",
                            value: "62f2a56d564a1a9274f87f3b",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a526564a1a9274f87f34",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                        ]
                      },
                    }
                  },
                  {
                    slide: {
                      label: "Disabled",
                      name: "isDisabledTab",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeTab",
                            value: "62f2a56d564a1a9274f87f3b",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                          },
                          {
                            key: "elementTypeTab",
                            value: "62f2a526564a1a9274f87f34",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                        ]
                      },
                    }
                  },

                ],
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "elementType",
                      value: "62f2a56d564a1a9274f87f3b",
                    }
                  ]
                }
              }
            },
            {
              array: {
                title: "Array element",
                id: "arrayArray",
                elements: [
                  {
                    select: {
                      label: "Tipo de elemento",
                      name: "elementTypeArray",
                      type: FormInputTypeEnum.Text,
                      optionsApi: {
                        externalEndpoint: "http://localhost:3001/form-elements",
                        labelField: "label",
                        valueField: "value",
                      },
                      isTriggerToCondition: true,
                      isRequired: true,
                    }
                  },
                  {
                    select: {
                      label: "Origem da option",
                      name: "optionOriginArray",
                      type: FormInputTypeEnum.Text,
                      optionsObject: [
                        {
                          label: "API",
                          value: "optionsApi",
                          isSelected: true,
                        },
                        {
                          label: "Manual",
                          value: "optionsObject"
                        },
                      ],
                      isTriggerToCondition: true,
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeArray",
                            value: "62f2a53f564a1a9274f87f35",
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a55f564a1a9274f87f39",
                            logicalOperator: FilterLogicalOperatorEnum.Or,
                          }
                        ]
                      }
                    },
                  },
                  {
                    input: {
                      label: "Endpoint",
                      name: "optionApiEndpointArray",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: animations",
                      tooltip: "Endpoint com dados para option",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "optionOriginArray",
                            value: "optionsApi",
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a55f564a1a9274f87f39",
                            logicalOperator: FilterLogicalOperatorEnum.Or,
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a53f564a1a9274f87f35",
                          },
                        ]
                      }
                    }
                  },
                  {
                    input: {
                      label: "Label",
                      name: "optionApiLabelFieldArray",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: name",
                      tooltip: "Campo que preencherá o label da option",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "optionOriginArray",
                            value: "optionsApi",
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a55f564a1a9274f87f39",
                            logicalOperator: FilterLogicalOperatorEnum.Or,
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a53f564a1a9274f87f35",
                          },
                        ]
                      }
                    }
                  },
                  {
                    input: {
                      label: "Value",
                      name: "optionApiValueFieldArray",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: _id",
                      tooltip: "Campo que preencherá o value da option",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "optionOriginArray",
                            value: "optionsApi",
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a55f564a1a9274f87f39",
                            logicalOperator: FilterLogicalOperatorEnum.Or,
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a53f564a1a9274f87f35",
                          },
                        ]
                      }
                    }
                  },
                  {
                    array: {
                      title: "Opção manual",
                      id: "manualOptionArrayArray",
                      elements: [
                        {
                          input: {
                            label: "Label",
                            name: "optionObjectLabelFieldArray",
                            type: FormInputTypeEnum.Text,
                            placeholder: "Ex.: Masculino",
                            tooltip: "String que preencherá o label da option",
                          }
                        },
                        {
                          input: {
                            label: "Value",
                            name: "optionObjectValueFieldArray",
                            type: FormInputTypeEnum.Text,
                            placeholder: "Ex.: male",
                            tooltip: "String que preencherá o value da option",
                          }
                        },
                      ],
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "optionOriginArray",
                            value: "optionsObject",
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a55f564a1a9274f87f39",
                            logicalOperator: FilterLogicalOperatorEnum.Or,
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a53f564a1a9274f87f35",
                          },
                        ]
                      }
                    }
                  },
                  {
                    input: {
                      label: "Label",
                      name: "labelArray",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: Animação",
                      tooltip: "Legenda principal do elemento de formulário",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeArray",
                            value: "62f2a56d564a1a9274f87f3b",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a526564a1a9274f87f34",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                        ]
                      },
                      isRequired: true,
                    }
                  },
                  {
                    input: {
                      label: "Name",
                      name: "nameArray",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: animation",
                      tooltip: "Identificação referência para tratamento do dado",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeArray",
                            value: "62f2a56d564a1a9274f87f3b",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a526564a1a9274f87f34",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                        ]
                      },
                      isRequired: true,
                    }
                  },
                  {
                    select: {
                      label: "Tipo de dado",
                      name: "typeArray",
                      type: FormInputTypeEnum.Text,
                      optionsApi: {
                        externalEndpoint: "http://localhost:3001/data-types",
                        labelField: "label",
                        valueField: "value",
                      },
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeArray",
                            value: "62f2a56d564a1a9274f87f3b",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a526564a1a9274f87f34",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                        ]
                      },
                      isRequired: true,
                    }
                  },
                  {
                    input: {
                      label: "Placeholder",
                      name: "placeholderArray",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: Ex.: The Simpsons",
                      tooltip: "Legenda secundária do elemento de formulário",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeArray",
                            value: "62f2a56d564a1a9274f87f3b",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a526564a1a9274f87f34",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                        ]
                      },
                    }
                  },
                  {
                    input: {
                      label: "Tooltip",
                      name: "tooltipArray",
                      type: FormInputTypeEnum.Text,
                      placeholder: "Ex.: Nome da animação",
                      tooltip: "Legenda de reforço do elemento de formulário",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeArray",
                            value: "62f2a56d564a1a9274f87f3b",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a526564a1a9274f87f34",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                        ]
                      },
                    }
                  },
                  {
                    slide: {
                      label: "Required",
                      name: "isRequiredArray",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeArray",
                            value: "62f2a56d564a1a9274f87f3b",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a526564a1a9274f87f34",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                        ]
                      },
                    }
                  },
                  {
                    slide: {
                      label: "Disabled",
                      name: "isDisabledArray",
                      conditions: {
                        type: ConditionEnum.Form,
                        elements: [
                          {
                            key: "elementTypeArray",
                            value: "62f2a56d564a1a9274f87f3b",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                          },
                          {
                            key: "elementTypeArray",
                            value: "62f2a526564a1a9274f87f34",
                            comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                            logicalOperator: FilterLogicalOperatorEnum.And,
                          },
                        ]
                      },
                    }
                  },
                ],
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "elementType",
                      value: "62f2a526564a1a9274f87f34",
                    }
                  ]
                }
              }
            },
            {
              input: {
                label: "Label",
                name: "label",
                type: FormInputTypeEnum.Text,
                placeholder: "Ex.: Animação",
                tooltip: "Legenda principal do elemento de formulário",
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "elementType",
                      value: "62f2a56d564a1a9274f87f3b",
                      comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                    },
                    {
                      key: "elementType",
                      value: "62f2a526564a1a9274f87f34",
                      comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                      logicalOperator: FilterLogicalOperatorEnum.And,
                    },
                  ]
                },
                isRequired: true,
              }
            },
            {
              input: {
                label: "Name",
                name: "name",
                type: FormInputTypeEnum.Text,
                placeholder: "Ex.: animation",
                tooltip: "Identificação referência para tratamento do dado",
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "elementType",
                      value: "62f2a56d564a1a9274f87f3b",
                      comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                    },
                    {
                      key: "elementType",
                      value: "62f2a526564a1a9274f87f34",
                      comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                      logicalOperator: FilterLogicalOperatorEnum.And,
                    },
                  ]
                },
                isRequired: true,
              }
            },
            {
              select: {
                label: "Tipo de dado",
                name: "type",
                type: FormInputTypeEnum.Text,
                optionsApi: {
                  externalEndpoint: "http://localhost:3001/data-types",
                  labelField: "label",
                  valueField: "value",
                },
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "elementType",
                      value: "62f2a56d564a1a9274f87f3b",
                      comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                    },
                    {
                      key: "elementType",
                      value: "62f2a526564a1a9274f87f34",
                      comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                      logicalOperator: FilterLogicalOperatorEnum.And,
                    },
                  ]
                },
                isRequired: true,
              }
            },
            {
              input: {
                label: "Placeholder",
                name: "placeholder",
                type: FormInputTypeEnum.Text,
                placeholder: "Ex.: Ex.: The Simpsons",
                tooltip: "Legenda secundária do elemento de formulário",
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "elementType",
                      value: "62f2a56d564a1a9274f87f3b",
                      comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                    },
                    {
                      key: "elementType",
                      value: "62f2a526564a1a9274f87f34",
                      comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                      logicalOperator: FilterLogicalOperatorEnum.And,
                    },
                  ]
                },
              }
            },
            {
              input: {
                label: "Tooltip",
                name: "tooltip",
                type: FormInputTypeEnum.Text,
                placeholder: "Ex.: Nome da animação",
                tooltip: "Legenda de reforço do elemento de formulário",
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "elementType",
                      value: "62f2a56d564a1a9274f87f3b",
                      comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                    },
                    {
                      key: "elementType",
                      value: "62f2a526564a1a9274f87f34",
                      comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                      logicalOperator: FilterLogicalOperatorEnum.And,
                    },
                  ]
                },
              }
            },
            {
              slide: {
                label: "Required",
                name: "isRequired",
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "elementType",
                      value: "62f2a56d564a1a9274f87f3b",
                      comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                    },
                    {
                      key: "elementType",
                      value: "62f2a526564a1a9274f87f34",
                      comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                      logicalOperator: FilterLogicalOperatorEnum.And,
                    },
                  ]
                },
              }
            },
            {
              slide: {
                label: "Disabled",
                name: "isDisabled",
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "elementType",
                      value: "62f2a56d564a1a9274f87f3b",
                      comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                    },
                    {
                      key: "elementType",
                      value: "62f2a526564a1a9274f87f34",
                      comparisonOperator: FilterComparisonOperatorEnum.NotEqual,
                      logicalOperator: FilterLogicalOperatorEnum.And,
                    },
                  ]
                },
              }
            },
          ]
        }
      }
    ],    
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "components",
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