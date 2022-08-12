import { ConditionEnum, FormInputTypeEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { FilterLogicalOperatorEnum } from "../../../src/enums/request";
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
                  endpoint: "form-elements",
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
                      value: "autocomplete",
                    },
                    {
                      key: "elementType",
                      value: "select",
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
                      key: "elementType",
                      value: "autocomplete",
                    },
                    {
                      key: "elementType",
                      value: "select",
                      logicalOperator: FilterLogicalOperatorEnum.Or,
                    },
                    {
                      key: "optionOrigin",
                      value: "optionsApi",
                      logicalOperator: FilterLogicalOperatorEnum.And,
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
                      key: "elementType",
                      value: "autocomplete",
                    },
                    {
                      key: "elementType",
                      value: "select",
                      logicalOperator: FilterLogicalOperatorEnum.Or,
                    },
                    {
                      key: "optionOrigin",
                      value: "optionsApi",
                      logicalOperator: FilterLogicalOperatorEnum.And,
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
                      key: "elementType",
                      value: "autocomplete",
                    },
                    {
                      key: "elementType",
                      value: "select",
                      logicalOperator: FilterLogicalOperatorEnum.Or,
                    },
                    {
                      key: "optionOrigin",
                      value: "optionsApi",
                      logicalOperator: FilterLogicalOperatorEnum.And,
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
                      key: "elementType",
                      value: "autocomplete",
                    },
                    {
                      key: "elementType",
                      value: "select",
                      logicalOperator: FilterLogicalOperatorEnum.Or,
                    },
                    {
                      key: "optionOrigin",
                      value: "optionsObject",
                      logicalOperator: FilterLogicalOperatorEnum.And,
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
                    elementReplicaId: "componentForm"
                  },
                ],
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "elementType",
                      value: "tabs",
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
                    elementReplicaId: "componentForm"
                  }
                ],
                conditions: {
                  type: ConditionEnum.Form,
                  elements: [
                    {
                      key: "elementType",
                      value: "array",
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
                isRequired: true,
              }
            },
            {
              select: {
                label: "Tipo de dado",
                name: "type",
                type: FormInputTypeEnum.Text,
                optionsApi: {
                  endpoint: "data-types",
                  labelField: "label",
                  valueField: "value",
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
              }
            },
            {
              input: {
                label: "Tooltip",
                name: "tooltip",
                type: FormInputTypeEnum.Text,
                placeholder: "Ex.: Nome da animação",
                tooltip: "Legenda de reforço do elemento de formulário",
              }
            },
            {
              slide: {
                label: "Required",
                name: "isRequired",                
              }
            },
            {
              slide: {
                label: "Disabled",
                name: "isDisabled",                
              }
            },
          ]
        }
      }
    ]
  }
}