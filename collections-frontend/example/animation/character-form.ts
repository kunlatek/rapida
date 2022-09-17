import {
  FormButtonTypeEnum,
  FormInputTypeEnum,
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
                autocomplete: {
                  label: "Animação",
                  placeholder: "Animação do personagem",
                  name: "animationId",
                  type: FormInputTypeEnum.Text,
                  optionsApi: {
                    endpoint: "animations",
                    labelField: ["name", "_id"],
                    valueField: "_id",
                    paramsToFilter: ["name", "startDate"],
                  },
                  isRequired: true,
                },
              },
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
                input: {
                  label: "Imagem",
                  placeholder: "Imagem do personagem",
                  name: "img",
                  type: FormInputTypeEnum.File,
                }
              },
            ],
          },
          {
            title: "Mais detalhes",
            id: "moreTab",
            elements: [
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
                        },
                      }
                    },
                  ],
                },
              },
              {
                input: {
                  label: "História",
                  placeholder: "História do personagem",
                  name: "history",
                  type: FormInputTypeEnum.Text,
                  isMultipleLines: true,
                }
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
