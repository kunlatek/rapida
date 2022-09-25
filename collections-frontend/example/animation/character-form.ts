import {
  ConditionEnum,
  FormButtonTypeEnum,
  FormInputTypeEnum,
  ParamTypeEnum,
  ServiceFunctionsEnum
} from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CHARACTER_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    title: "Personagem",
    id: "characterForm",
    elements: [
      {
        tabs: [
          {
            title: "Dados principais",
            id: "mainTab",
            elements: [
              {
                input: {
                  label: "Nome",
                  placeholder: "Nome do personagem",
                  name: "name",
                  type: FormInputTypeEnum.Text,
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Apelido",
                  placeholder: "Apelido do personagem",
                  name: "nickname",
                  type: FormInputTypeEnum.Text,
                }
              },
              {
                autocomplete: {
                  label: "Animação",
                  placeholder: "Animação a qual pertence",
                  name: "animationId",
                  type: FormInputTypeEnum.Text,
                  optionsApi: {
                    endpoint: "animations",
                    labelField: "name",
                    valueField: "_id",
                    paramsToFilter: ["name", "startDate"],
                    paramType: ParamTypeEnum.Query,
                  },
                  isRequired: true,
                },
              },
              {
                input: {
                  label: "Imagem",
                  placeholder: "Imagem do personagem",
                  name: "img",
                  type: FormInputTypeEnum.File,
                }
              },
              {
                select: {
                  label: "Tipo",
                  name: "characterType",
                  type: FormInputTypeEnum.Text,
                  optionsObject: [
                    {
                      label: "Humano",
                      value: "human",
                    },
                    {
                      label: "Animal",
                      value: "animal",
                    },
                    {
                      label: "Extraterrestre",
                      value: "extraterrestrial"
                    },
                    {
                      label: "Outro",
                      value: "other"
                    },
                  ],
                  isTriggerToCondition: true
                }
              },
              {
                input: {
                  label: "Tipo de animal",
                  placeholder: "Ex.: Cachorro, Gato, Coelho",
                  name: "animalType",
                  type: FormInputTypeEnum.Text,
                  conditions: {
                    type: ConditionEnum.Form,
                    elements: [
                      {
                        key: "characterType",
                        value: "animal",
                      }
                    ]
                  }
                }
              },
              {
                input: {
                  label: "Planeta",
                  placeholder: "Planeta de origem",
                  name: "extraterrestrialPlanet",
                  type: FormInputTypeEnum.Text,
                  conditions: {
                    type: ConditionEnum.Form,
                    elements: [
                      {
                        key: "characterType",
                        value: "extraterrestrial",
                      }
                    ]
                  }
                }
              },
              {
                input: {
                  label: "Descrição",
                  placeholder: "Ex.: Demônio, Anjo, Ideia",
                  name: "otherType",
                  type: FormInputTypeEnum.Text,
                  conditions: {
                    type: ConditionEnum.Form,
                    elements: [
                      {
                        key: "characterType",
                        value: "other",
                      }
                    ]
                  }
                }
              },
              {
                select: {
                  label: "Sexo",
                  name: "sex",
                  type: FormInputTypeEnum.Text,
                  optionsObject: [
                    {
                      label: "Homem",
                      value: "man",
                    },
                    {
                      label: "Mulher",
                      value: "woman",
                    },
                    {
                      label: "Homem transsexual",
                      value: "transman",
                    },
                    {
                      label: "Mulher transsexual",
                      value: "transwoman",
                    },
                    {
                      label: "Outro",
                      value: "other",
                    },
                  ],
                  conditions: {
                    type: ConditionEnum.Form,
                    elements: [
                      {
                        key: "characterType",
                        value: "human",
                      }
                    ]
                  }
                }
              },
            ],
          },
          {
            title: "Mais detalhes",
            id: "moreTab",
            elements: [
              {
                input: {
                  label: "História",
                  placeholder: "História do personagem",
                  name: "history",
                  type: FormInputTypeEnum.Text,
                  isMultipleLines: true,
                }
              },
              {
                array: {
                  title: "Dado genérico",
                  id: "genericDataArray",
                  elements: [
                    {
                      input: {
                        label: "Atributo",
                        name: "genericAttribute",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Ex.: gender",
                        tooltip: "Um atributo qualquer para melhor especificar a personagem"
                      }
                    },
                    {
                      input: {
                        label: "Valor",
                        name: "genericValue",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Ex.: Masculino",
                        tooltip: "Um valor qualquer acerca do atributo pré definido"
                      }
                    },
                    {
                      autocomplete: {
                        label: "Outras animações",
                        name: "otherAnimations",
                        type: FormInputTypeEnum.Text,
                        optionsApi: {
                          endpoint: "animations",
                          labelField: ["name", "_id"],
                          valueField: "_id",
                          paramsToFilter: ["name", "startDate"],
                          paramType: ParamTypeEnum.Query,
                        },
                        isMultiple: true,
                      }
                    },
                    {
                      autocomplete: {
                        label: "Outro personagem",
                        name: "otherCharacter",
                        type: FormInputTypeEnum.Text,
                        optionsApi: {
                          endpoint: "characters",
                          labelField: ["name"],
                          valueField: "_id",
                          paramsToFilter: ["name"],
                          paramType: ParamTypeEnum.Query,
                        },
                      }
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
        }
      },
    ],
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "characters",
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
