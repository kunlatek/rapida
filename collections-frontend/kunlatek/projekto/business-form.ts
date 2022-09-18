import { FormInputTypeEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const BUSINESS_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    id: "businessForm",
    title: "Negócio",
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
                  type: FormInputTypeEnum.Text,
                  name: "name",
                  placeholder: "Ex.: Legomo",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Resumo",
                  type: FormInputTypeEnum.Text,
                  name: "description",
                  placeholder: "Ex.: Com o foco no público das feira itinerantes (as feiras itinerantes são eventos temporários, que reúnem um grande número de expositores, provenientes da agricultura familiar, a fim de comercializar seus produtos com preços consideravelmente mais vantajosos em comparação àqueles obtidos no comércio local), o Legomo Marketplace se propõe a facilitar aos consumidores desse nicho de mercado a consumir esse tipo de produto (produtos oriundos de agricultura familiar) no conforto da sua casa.",
                  isMultipleLines: true,
                  isRequired: true,
                }
              },
            ]
          },
          {
            title: "Segmentação de mercado",
            id: "marketSegmentation",
            elements: [
              {
                array: {
                  title: "Grupo",
                  id: "marketSegmentationGroup",
                  elements: [
                    {
                      input: {
                        label: "Nome",
                        type: FormInputTypeEnum.Text,
                        name: "marketSegmentationName",
                        placeholder: "Ex.: MST",
                        isRequired: true,
                      }
                    },
                    {
                      input: {
                        label: "Objetivo",
                        type: FormInputTypeEnum.Text,
                        name: "marketSegmentationObjective",
                        placeholder: "Ex.: Ter acesso aos participantes do maior grupo de agricultura familiar do Brasil.",
                        tooltip: "O porquê de ter este grupo como um segmento",
                        isMultipleLines: true,
                        isRequired: true,
                      }
                    },
                    {
                      array: {
                        title: "Dado psicográfico",
                        id: "marketSegmentationPsycographicData",
                        elements: [
                          {
                            input: {
                              label: "Descrição de dado psicográfico",
                              name: "marketSegmentationPsycographicDescription",
                              type: FormInputTypeEnum.Number,
                              placeholder: "Ex.: Desconfiadas com elementos que não fazem parte do grupo",
                              isMultipleLines: true,
                            }
                          },
                        ]
                      }
                    },
                    {
                      array: {
                        title: "Dado geográfico",
                        id: "marketSegmentationGeographicData",
                        elements: [
                          {
                            autocomplete: {
                              label: "Espaço de referência",
                              name: "marketSegmentationGeographicLocationReference",
                              type: FormInputTypeEnum.Text,
                              optionsApi: {
                                labelField: "name",
                                valueField: "_id",
                                paramsToFilter: ["name", "zipcode"],
                                externalEndpoint: "localhost",
                              }
                            }
                          },
                        ]
                      }
                    },
                  ]
                }
              },
            ]
          },
          {
            title: "Problemas e soluções",
            id: "problemTab",
            elements: [
              {
                input: {
                  label: "Problema principal",
                  name: "mainProblem",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Ex.: Ausência de ferramenta digital para facilitar o escoamento dos produtos cultivados.",
                  isMultipleLines: true,
                  isRequired: true,
                }
              },
              {
                array: {
                  title: "Outro problema",
                  id: "problems",
                  elements: [
                    {
                      input: {
                        label: "Descrição de problema",
                        name: "mainProblem",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Ex.: Falta de controle de estoque de produto.",
                        isMultipleLines: true,
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  }
}