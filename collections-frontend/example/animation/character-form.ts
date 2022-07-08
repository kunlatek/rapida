import {
  FormButtonTypeEnum,
  FormInputTypeEnum,
  ServiceFunctionsEnum,
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
                    labelField: "name",
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
            ],
          },
          {
            title: "Mais detalhes",
            id: "moreTab",
            elements: [
              {
                array: {
                  title: "Dado aleatório importante",
                  id: "genericDataArray",
                  elements: [
                    {
                      input: {
                        label: "Identificador do dado",
                        name: "genericDataKey",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Chave para o dado"
                      }
                    },
                    {
                      input: {
                        label: "Conteúdo do dado",
                        name: "genericDataValue",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Valor para o dado"
                      }
                    }
                  ],
                },
              },
              {
                autocomplete: {
                  label: "Personagens relacionados",
                  placeholder: "Nome de personagem",
                  name: "characterId",
                  type: FormInputTypeEnum.Text,
                  optionsApi: {
                    endpoint: "characters",
                    labelField: "name",
                    valueField: "_id",
                    paramsToFilter: ["name"],
                  },
                  isMultiple: true,
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
              }
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
      endPoint: "characters",
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
