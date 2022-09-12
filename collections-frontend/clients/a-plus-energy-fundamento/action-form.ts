import { FormButtonTypeEnum, FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import {
  BackendFrameworkEnum,
  FrontendFrameworkEnum,
} from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const ACTION_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    id: "actionForm",
    title: "Ação",
    elements: [
      {
        tabs: [
          {
            id: "mainTab",
            title: "Dados principais",
            elements: [
              {
                autocomplete: {
                  label: "Serviços",
                  name: "servicesId",
                  type: FormInputTypeEnum.Text,
                  optionsApi: {
                    endpoint: "services",
                    labelField: "name",
                    valueField: "_id",
                    paramsToFilter: ["name"],
                  },
                  isRequired: true,
                  isMultiple: true,
                },
              },
              {
                input: {
                  label: "Nome",
                  name: "name",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Nome da ação relacionada ao serviço",
                  isRequired: true,
                },
              },
              {
                input: {
                  label: "Descrição",
                  name: "description",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Descrição da ação relacionada ao serviço",
                  isMultipleLines: true,
                },
              },
            ],
          },
          {
            id: "reasonTab",
            title: "Motivos",
            elements: [
              {
                array: {
                  id: "reasons",
                  title: "Motivo",
                  elements: [
                    {
                      input: {
                        label: "Nome",
                        name: "reasonName",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Motivo para aplicar a ação",
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
        }
      },
    ],
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "actions",
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
