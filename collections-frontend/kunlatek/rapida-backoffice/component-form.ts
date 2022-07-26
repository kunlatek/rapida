import {
  ConditionEnum,
  FormButtonTypeEnum,
  FormInputTypeEnum,
  ServiceFunctionsEnum,
} from "../../../src/enums/form";
import {
  BackendFrameworkEnum,
  FrontendFrameworkEnum,
} from "../../../src/enums/main";
import { FilterComparisonOperatorEnum } from "../../../src/enums/request";
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
                },
              },
              {
                input: {
                  label: "Propriedade",
                  name: "collectionId",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Nome da coleção. Ex.: animation",
                  isRequired: true,
                },
              },
            ],
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
                            value: "array",
                          },
                          {
                            label: "Autocomplete",
                            value: "autocomplete",
                          },
                          {
                            label: "Checkbox",
                            value: "checkbox",
                          },
                          {
                            label: "Radio",
                            value: "radio",
                          },
                          {
                            label: "Input",
                            value: "input",
                          },
                          {
                            label: "Select",
                            value: "select",
                          },
                          {
                            label: "Slide",
                            value: "slide",
                          },
                          {
                            label: "Tabs",
                            value: "tabs",
                          },
                          {
                            label: "Text area",
                            value: "textarea",
                          },
                        ],
                        isTriggerToCondition: true,
                        isRequired: true,
                      },
                    },
                    //!TABS && !ARRAY
                    {
                      input: {
                        label: "Label",
                        name: "formLabel",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Element label",
                        isRequired: true,
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              comparisonOperator:
                                FilterComparisonOperatorEnum.NotEqual,
                              value: "tabs",
                            },
                            {
                              key: "formElement",
                              comparisonOperator:
                                FilterComparisonOperatorEnum.NotEqual,
                              value: "array",
                            },
                          ],
                        },
                      },
                    },
                    {
                      input: {
                        label: "Placeholder",
                        name: "formPlaceholder",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Element placeholder",
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              comparisonOperator:
                                FilterComparisonOperatorEnum.NotEqual,
                              value: "tabs",
                            },
                            {
                              key: "formElement",
                              comparisonOperator:
                                FilterComparisonOperatorEnum.NotEqual,
                              value: "array",
                            },
                          ],
                        },
                      },
                    },
                    {
                      input: {
                        label: "Name",
                        name: "formName",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Name to be used as property",
                        isRequired: true,
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              comparisonOperator:
                                FilterComparisonOperatorEnum.NotEqual,
                              value: "tabs",
                            },
                            {
                              key: "formElement",
                              comparisonOperator:
                                FilterComparisonOperatorEnum.NotEqual,
                              value: "array",
                            },
                          ],
                        },
                      },
                    },
                    {
                      select: {
                        label: "Data type",
                        name: "formType",
                        type: FormInputTypeEnum.Text,
                        optionsObject: [
                          {
                            label: "Texto",
                            value: "text",
                          },
                          {
                            label: "Número",
                            value: "number",
                          },
                          {
                            label: "E-mail",
                            value: "email",
                          },
                          {
                            label: "Data",
                            value: "date",
                          },
                          {
                            label: "Arquivo",
                            value: "file",
                          },
                        ],
                        isRequired: true,
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              comparisonOperator:
                                FilterComparisonOperatorEnum.NotEqual,
                              value: "tabs",
                            },
                            {
                              key: "formElement",
                              comparisonOperator:
                                FilterComparisonOperatorEnum.NotEqual,
                              value: "array",
                            },
                          ],
                        },
                      },
                    },
                    {
                      slide: {
                        label: "Obrigatório",
                        name: "formIsRequired",
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              comparisonOperator:
                                FilterComparisonOperatorEnum.NotEqual,
                              value: "tabs",
                            },
                            {
                              key: "formElement",
                              comparisonOperator:
                                FilterComparisonOperatorEnum.NotEqual,
                              value: "array",
                            },
                          ],
                        },
                      },
                    },
                    {
                      slide: {
                        label: "Desabilitado",
                        name: "formIsDisabled",
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              comparisonOperator:
                                FilterComparisonOperatorEnum.NotEqual,
                              value: "tabs",
                            },
                            {
                              key: "formElement",
                              comparisonOperator:
                                FilterComparisonOperatorEnum.NotEqual,
                              value: "array",
                            },
                          ],
                        },
                      },
                    },
                    //AUTOCOMPLETE
                    {
                      input: {
                        label: "Endpoint",
                        name: "formAutocompleteEndpoint",
                        type: FormInputTypeEnum.Text,
                        placeholder:
                          "Endpoint para opções da seleção {{componentFormForm.get('formTitle')?.value}}",
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              value: "autocomplete",
                            },
                          ],
                        },
                      },
                    },
                    {
                      input: {
                        label: "Atributo de etiqueta da opção",
                        name: "formAutocompleteLabelField",
                        type: FormInputTypeEnum.Text,
                        placeholder:
                          "Label para opções da seleção {{componentFormForm.get('formTitle')?.value}}",
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              value: "autocomplete",
                            },
                          ],
                        },
                      },
                    },
                    {
                      input: {
                        label: "Atributo de valor da opção",
                        name: "formAutocompleteValueField",
                        type: FormInputTypeEnum.Text,
                        placeholder:
                          "Valor para opções da seleção {{componentFormForm.get('formTitle')?.value}}",
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              value: "autocomplete",
                            },
                          ],
                        },
                      },
                    },
                    {
                      slide: {
                        label: "Seleção múltipla",
                        name: "formAutocompleteIsMultiple",
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              value: "autocomplete",
                            },
                          ],
                        },
                        isTriggerToCondition: true,
                      },
                    },
                    {
                      array: {
                        id: "filterArray",
                        title: "Filtro",
                        elements: [
                          {
                            input: {
                              label: "Propriedade de filtro",
                              name: "formParamsToFilter",
                              type: FormInputTypeEnum.Text,
                              placeholder:
                                "Propriedade para filtragem no autocomplete",
                            },
                          },
                        ],
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              value: "autocomplete",
                            },
                          ],
                        },
                      },
                    },
                    //SELECT
                    {
                      select: {
                        label: "Options to select",
                        name: "formSelectOptions",
                        type: FormInputTypeEnum.Text,
                        optionsObject: [
                          {
                            label: "Manual",
                            value: "optionsObject",
                          },
                          {
                            label: "API",
                            value: "optionsAPI",
                          },
                        ],
                        isTriggerToCondition: true,
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              value: "select",
                            },
                          ],
                        },
                      },
                    },
                    {
                      input: {
                        label: "Endpoint",
                        name: "formSelectEndpoint",
                        type: FormInputTypeEnum.Text,
                        placeholder:
                          "Endpoint para opções da seleção {{componentFormForm.get('formTitle')?.value}}",
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formSelectOptions",
                              value: "optionsAPI",
                            },
                          ],
                        },
                      },
                    },
                    {
                      input: {
                        label: "Atributo de etiqueta da opção",
                        name: "formOptionLabelField",
                        type: FormInputTypeEnum.Text,
                        placeholder:
                          "Label para opções da seleção {{componentFormForm.get('formTitle')?.value}}",
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formSelectOptions",
                              value: "optionsAPI",
                            },
                          ],
                        },
                      },
                    },
                    {
                      input: {
                        label: "Atributo de valor da opção",
                        name: "formOptionValueField",
                        type: FormInputTypeEnum.Text,
                        placeholder:
                          "Valor para opções da seleção {{componentFormForm.get('formTitle')?.value}}",
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formSelectOptions",
                              value: "optionsAPI",
                            },
                          ],
                        },
                      },
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
                              type: FormInputTypeEnum.Text,
                            },
                          },
                          {
                            input: {
                              label: "Value",
                              name: "selectOptionValue",
                              type: FormInputTypeEnum.Text,
                            },
                          },
                        ],
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formSelectOptions",
                              value: "optionsObject",
                            },
                          ],
                        },
                      },
                    },
                    {
                      slide: {
                        label: "Seleção múltipla",
                        name: "formSelectIsMultiple",
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              value: "select",
                            },
                          ],
                        },
                      },
                    },
                    // ARRAY
                    {
                      input: {
                        label: "Title",
                        name: "arrayTitle",
                        type: FormInputTypeEnum.Text,
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              value: "array",
                            },
                          ],
                        },
                      },
                    },
                    {
                      input: {
                        label: "Id",
                        name: "arrayId",
                        type: FormInputTypeEnum.Text,
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              value: "array",
                            },
                          ],
                        },
                      },
                    },
                    {
                      input: {
                        label: "Id de array pai",
                        name: "arrayParentId",
                        type: FormInputTypeEnum.Text,
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              value: "array",
                            },
                          ],
                        },
                      },
                    },
                    // {
                    //   array: {
                    //     id: "arrayArray",
                    //     title: "Elemento de formulário em array",
                    //     todo: "Chamar os elements recursivamente",
                    //     elements: [
                    //       {
                    //         array: {
                    //           title: "Elemento de formulário",
                    //           id: "arrayFormArray",
                    //           elements: [
                    //             {
                    //               elementReplicaId: "formArray",
                    //             }
                    //           ]
                    //         },
                    //       },
                    //     ],
                    //     conditions: {
                    //       type: ConditionEnum.Form,
                    //       elements: [
                    //         {
                    //           key: "formElement",
                    //           value: "array",
                    //         },
                    //       ],
                    //     },
                    //   },
                    // },
                    // TABS
                    {
                      array: {
                        id: "tabsArray",
                        title: "Tab",
                        elements: [
                          {
                            input: {
                              label: "Title",
                              name: "tabsTitle",
                              type: FormInputTypeEnum.Text,
                              isRequired: true,
                            },
                          },
                          {
                            input: {
                              label: "Id",
                              name: "tabsId",
                              type: FormInputTypeEnum.Text,
                              isRequired: true,
                            },
                          },
                          {
                            array: {
                              id: "tabElementsArray",
                              title: "Elemento de formulário em tab",
                              elements: [
                                {
                                  select: {
                                    label: "Element",
                                    name: "tabsFormElement",
                                    type: FormInputTypeEnum.Text,
                                    optionsObject: [
                                      {
                                        label: "Array",
                                        value: "array",
                                      },
                                      {
                                        label: "Autocomplete",
                                        value: "autocomplete",
                                      },
                                      {
                                        label: "Checkbox",
                                        value: "checkbox",
                                      },
                                      {
                                        label: "Radio",
                                        value: "radio",
                                      },
                                      {
                                        label: "Input",
                                        value: "input",
                                      },
                                      {
                                        label: "Select",
                                        value: "select",
                                      },
                                      {
                                        label: "Slide",
                                        value: "slide",
                                      },
                                      {
                                        label: "Tabs",
                                        value: "tabs",
                                      },
                                      {
                                        label: "Text area",
                                        value: "textarea",
                                      },
                                    ],
                                    isTriggerToCondition: true,
                                    isRequired: true,
                                  },
                                },
                                //!TABS && !ARRAY
                                {
                                  input: {
                                    label: "Label",
                                    name: "tabsFormLabel",
                                    type: FormInputTypeEnum.Text,
                                    placeholder: "Element label",
                                    isRequired: true,
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          comparisonOperator:
                                            FilterComparisonOperatorEnum.NotEqual,
                                          value: "tabs",
                                        },
                                        {
                                          key: "tabsFormElement",
                                          comparisonOperator:
                                            FilterComparisonOperatorEnum.NotEqual,
                                          value: "array",
                                        },
                                      ],
                                    },
                                  },
                                },
                                {
                                  input: {
                                    label: "Placeholder",
                                    name: "tabsFormPlaceholder",
                                    type: FormInputTypeEnum.Text,
                                    placeholder: "Element placeholder",
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          comparisonOperator:
                                            FilterComparisonOperatorEnum.NotEqual,
                                          value: "tabs",
                                        },
                                        {
                                          key: "tabsFormElement",
                                          comparisonOperator:
                                            FilterComparisonOperatorEnum.NotEqual,
                                          value: "array",
                                        },
                                      ],
                                    },
                                  },
                                },
                                {
                                  input: {
                                    label: "Name",
                                    name: "tabsFormName",
                                    type: FormInputTypeEnum.Text,
                                    placeholder: "Name to be used as property",
                                    isRequired: true,
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          comparisonOperator:
                                            FilterComparisonOperatorEnum.NotEqual,
                                          value: "tabs",
                                        },
                                        {
                                          key: "tabsFormElement",
                                          comparisonOperator:
                                            FilterComparisonOperatorEnum.NotEqual,
                                          value: "array",
                                        },
                                      ],
                                    },
                                  },
                                },
                                {
                                  select: {
                                    label: "Data type",
                                    name: "tabsFormType",
                                    type: FormInputTypeEnum.Text,
                                    optionsObject: [
                                      {
                                        label: "Texto",
                                        value: "text",
                                      },
                                      {
                                        label: "Número",
                                        value: "number",
                                      },
                                      {
                                        label: "E-mail",
                                        value: "email",
                                      },
                                      {
                                        label: "Data",
                                        value: "date",
                                      },
                                      {
                                        label: "Arquivo",
                                        value: "file",
                                      },
                                    ],
                                    isRequired: true,
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          comparisonOperator:
                                            FilterComparisonOperatorEnum.NotEqual,
                                          value: "tabs",
                                        },
                                        {
                                          key: "tabsFormElement",
                                          comparisonOperator:
                                            FilterComparisonOperatorEnum.NotEqual,
                                          value: "array",
                                        },
                                      ],
                                    },
                                  },
                                },
                                {
                                  slide: {
                                    label: "Obrigatório",
                                    name: "tabsFormIsRequired",
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          comparisonOperator:
                                            FilterComparisonOperatorEnum.NotEqual,
                                          value: "tabs",
                                        },
                                        {
                                          key: "tabsFormElement",
                                          comparisonOperator:
                                            FilterComparisonOperatorEnum.NotEqual,
                                          value: "array",
                                        },
                                      ],
                                    },
                                  },
                                },
                                {
                                  slide: {
                                    label: "Desabilitado",
                                    name: "tabsFormIsDisabled",
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          comparisonOperator:
                                            FilterComparisonOperatorEnum.NotEqual,
                                          value: "tabs",
                                        },
                                        {
                                          key: "tabsFormElement",
                                          comparisonOperator:
                                            FilterComparisonOperatorEnum.NotEqual,
                                          value: "array",
                                        },
                                      ],
                                    },
                                  },
                                },
                                //AUTOCOMPLETE
                                {
                                  input: {
                                    label: "Endpoint",
                                    name: "tabsFormAutocompleteEndpoint",
                                    type: FormInputTypeEnum.Text,
                                    placeholder:
                                      "Endpoint para opções da seleção {{componentFormForm.get('formTitle')?.value}}",
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          value: "autocomplete",
                                        },
                                      ],
                                    },
                                  },
                                },
                                {
                                  input: {
                                    label: "Atributo de etiqueta da opção",
                                    name: "tabsFormAutocompleteLabelField",
                                    type: FormInputTypeEnum.Text,
                                    placeholder:
                                      "Label para opções da seleção {{componentFormForm.get('formTitle')?.value}}",
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          value: "autocomplete",
                                        },
                                      ],
                                    },
                                  },
                                },
                                {
                                  input: {
                                    label: "Atributo de valor da opção",
                                    name: "tabsFormAutocompleteValueField",
                                    type: FormInputTypeEnum.Text,
                                    placeholder:
                                      "Valor para opções da seleção {{componentFormForm.get('formTitle')?.value}}",
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          value: "autocomplete",
                                        },
                                      ],
                                    },
                                  },
                                },
                                {
                                  slide: {
                                    label: "Seleção múltipla",
                                    name: "tabsFormAutocompleteIsMultiple",
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          value: "autocomplete",
                                        },
                                      ],
                                    },
                                    isTriggerToCondition: true,
                                  },
                                },
                                {
                                  array: {
                                    id: "tabsFilterArray",
                                    title: "Filtro",
                                    elements: [
                                      {
                                        input: {
                                          label: "Propriedade de filtro",
                                          name: "tabsFormParamsToFilter",
                                          type: FormInputTypeEnum.Text,
                                          placeholder:
                                            "Propriedade para filtragem no autocomplete",
                                        },
                                      },
                                    ],
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          value: "autocomplete",
                                        },
                                      ],
                                    },
                                  },
                                },
                                //SELECT
                                {
                                  select: {
                                    label: "Options to select",
                                    name: "tabsFormSelectOptions",
                                    type: FormInputTypeEnum.Text,
                                    optionsObject: [
                                      {
                                        label: "Manual",
                                        value: "optionsObject",
                                      },
                                      {
                                        label: "API",
                                        value: "optionsAPI",
                                      },
                                    ],
                                    isTriggerToCondition: true,
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          value: "select",
                                        },
                                      ],
                                    },
                                  },
                                },
                                {
                                  input: {
                                    label: "Endpoint",
                                    name: "tabsFormSelectEndpoint",
                                    type: FormInputTypeEnum.Text,
                                    placeholder:
                                      "Endpoint para opções da seleção {{componentFormForm.get('formTitle')?.value}}",
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormSelectOptions",
                                          value: "optionsAPI",
                                        },
                                      ],
                                    },
                                  },
                                },
                                {
                                  input: {
                                    label: "Atributo de etiqueta da opção",
                                    name: "tabsFormOptionLabelField",
                                    type: FormInputTypeEnum.Text,
                                    placeholder:
                                      "Label para opções da seleção {{componentFormForm.get('formTitle')?.value}}",
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormSelectOptions",
                                          value: "optionsAPI",
                                        },
                                      ],
                                    },
                                  },
                                },
                                {
                                  input: {
                                    label: "Atributo de valor da opção",
                                    name: "tabsFormOptionValueField",
                                    type: FormInputTypeEnum.Text,
                                    placeholder:
                                      "Valor para opções da seleção {{componentFormForm.get('formTitle')?.value}}",
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormSelectOptions",
                                          value: "optionsAPI",
                                        },
                                      ],
                                    },
                                  },
                                },
                                {
                                  array: {
                                    id: "tabsSelectOptionArray",
                                    title: "Option",
                                    elements: [
                                      {
                                        input: {
                                          label: "Label",
                                          name: "tabsSelectOptionLabel",
                                          type: FormInputTypeEnum.Text,
                                        },
                                      },
                                      {
                                        input: {
                                          label: "Value",
                                          name: "tabsSelectOptionValue",
                                          type: FormInputTypeEnum.Text,
                                        },
                                      },
                                    ],
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormSelectOptions",
                                          value: "optionsObject",
                                        },
                                      ],
                                    },
                                  },
                                },
                                {
                                  slide: {
                                    label: "Seleção múltipla",
                                    name: "tabsFormSelectIsMultiple",
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          value: "select",
                                        },
                                      ],
                                    },
                                  },
                                },
                                // ARRAY
                                {
                                  input: {
                                    label: "Title",
                                    name: "tabsArrayTitle",
                                    type: FormInputTypeEnum.Text,
                                    isRequired: true,
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          value: "array",
                                        },
                                      ],
                                    },
                                  },
                                },
                                {
                                  input: {
                                    label: "Id",
                                    name: "tabsArrayId",
                                    type: FormInputTypeEnum.Text,
                                    isRequired: true,
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          value: "array",
                                        },
                                      ],
                                    },
                                  },
                                },
                                {
                                  input: {
                                    label: "Id de array pai",
                                    name: "tabsArrayParentId",
                                    type: FormInputTypeEnum.Text,
                                    conditions: {
                                      type: ConditionEnum.Form,
                                      elements: [
                                        {
                                          key: "tabsFormElement",
                                          value: "array",
                                        },
                                      ],
                                    },
                                  },
                                },
                                // {
                                //   array: {
                                //     id: "tabsArrayArray",
                                //     title: "Elemento de formulário em array",
                                //     todo: "Chamar os elements recursivamente",
                                //     elements: [
                                //       {
                                //         array: {
                                //           title: "Elemento de formulário",
                                //           id: "tabsArrayFormArray",
                                //           elements: [
                                //             {
                                //               elementReplicaId: "formArray",
                                //             }
                                //           ]
                                //         },
                                //       },
                                //     ],
                                //     conditions: {
                                //       type: ConditionEnum.Form,
                                //       elements: [
                                //         {
                                //           key: "tabsFormElement",
                                //           value: "array",
                                //         },
                                //       ],
                                //     },
                                //   },
                                // },
                              ],
                            },
                          },
                        ],
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "formElement",
                              value: "tabs",
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
            ],
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
                      },
                    },
                    {
                      input: {
                        label: "Campo da linha",
                        name: "tableRowField",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Campo de BD que preenche linha",
                        isRequired: true,
                      },
                    },
                    {
                      select: {
                        label: "Tipo de menu",
                        name: "tableMenuType",
                        type: FormInputTypeEnum.Text,
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "tableIsMenu",
                              value: true,
                            },
                          ],
                        },
                        optionsObject: [
                          {
                            label: "API",
                            value: "API",
                          },
                          {
                            label: "Object",
                            value: "OBJECT",
                          },
                          {
                            label: "Link",
                            value: "LINK",
                          },
                          {
                            label: "Modal",
                            value: "DIALOG",
                          },
                        ],
                        isTriggerToCondition: true,
                      },
                    },
                    {
                      input: {
                        label: "Etiqueta do link",
                        name: "tableMenuLinkLabel",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Label do link do menu",
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "tableMenuType",
                              value: "LINK",
                            },
                          ],
                        },
                      },
                    },
                    {
                      input: {
                        label: "Rota do link",
                        name: "tableMenuLinkUrl",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Rota do link do menu",
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "tableMenuType",
                              value: "LINK",
                            },
                          ],
                        },
                      },
                    },
                    {
                      input: {
                        label: "Parâmetro do link",
                        name: "tableMenuLinkParam",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Parâmetro do link do menu. Exemplo: _id",
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "tableMenuType",
                              value: "LINK",
                            },
                          ],
                        },
                      },
                    },
                    {
                      input: {
                        label: "Etiqueta da chamada de diálogo",
                        name: "tableMenuDialogLabel",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Label do diálogo do menu",
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "tableMenuType",
                              value: "LINK",
                            },
                          ],
                        },
                      },
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
                          },
                        ],
                        conditions: {
                          type: ConditionEnum.Form,
                          elements: [
                            {
                              key: "tableMenuType",
                              value: "LINK",
                            },
                          ],
                        },
                      },
                    },
                    {
                      slide: {
                        label: "Menu na linha",
                        name: "tableIsMenu",
                        isTriggerToCondition: true,
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        button: {
          label: "Criar",
          type: FormButtonTypeEnum.Submit,
        },
      },
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
  },
};
