import {
  FormButtonTypeEnum,
  FormInputTypeEnum, ParamTypeEnum, ServiceFunctionsEnum
} from "../../../src/enums/form";
import { MainInterface } from "../../../src/interfaces/main";

export const ANIMATION_FORM: MainInterface = {
  form: {
    title: "Animação",
    id: "animationForm",
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
                  placeholder: "Nome da animação",
                  type: FormInputTypeEnum.Text,
                  isRequired: true,
                },
              },
              {
                input: {
                  label: "Foto de capa",
                  name: "folderPicture",
                  type: FormInputTypeEnum.File,
                }
              },
              {
                input: {
                  label: "Data de criação",
                  name: "startDate",
                  type: FormInputTypeEnum.Date,
                  isRequired: true,
                },
              },
              {
                input: {
                  label: "Data de finalização",
                  name: "finishDate",
                  type: FormInputTypeEnum.Date,
                },
              },
            ]
          },
          {
            id: "seasonAndEpisodeTab",
            title: "Temporadas e episódios",
            elements: [
              {
                array: {
                  title: "Temporada",
                  id: "seasons",
                  elements: [
                    {
                      input: {
                        label: "Resumo",
                        name: "seasonBrief",
                        type: FormInputTypeEnum.Text,
                        isMultipleLines: true,
                      }
                    },
                    {
                      array: {
                        title: "Episódio",
                        id: "episodes",
                        elements: [
                          {
                            input: {
                              label: "Título",
                              name: "episodeTitle",
                              type: FormInputTypeEnum.Text,
                              isRequired: true
                            }
                          },
                          {
                            input: {
                              label: "Resumo",
                              name: "episodeBrief",
                              type: FormInputTypeEnum.Text,
                              isMultipleLines: true,
                            }
                          },
                          {
                            input: {
                              label: "Foto ilustrativa",
                              name: "episodePicture",
                              type: FormInputTypeEnum.File,
                            }
                          },
                          {
                            autocomplete: {
                              label: "Personagem principal do episódio",
                              name: "episodeCharacters",
                              type: FormInputTypeEnum.Text,
                              optionsApi: {
                                labelField: "name",
                                valueField: "_id",
                                paramsToFilter: ["name"],
                                endpoint: "characters",
                                paramType: ParamTypeEnum.Query
                              },
                              isMultiple: true,
                            }
                          },
                        ]
                      }
                    }
                  ]
                }
              },
            ]
          }
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
      endpoint: "animations",
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
