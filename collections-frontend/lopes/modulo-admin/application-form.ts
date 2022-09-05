import {
  FormButtonTypeEnum,
  FormInputTypeEnum,
  ServiceFunctionsEnum,
} from "../../../src/enums/form";
import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const APPLICATION_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  form: {
    title: "Aplicações",
    id: "applicationForm",
    elements: [
      {
        input: {
          label: "Nome",
          name: "name",
          placeholder: "Nome do módulo",
          type: FormInputTypeEnum.Text,
          isRequired: true,
        },
      },
      {
        input: {
          label: "Descrição",
          name: "description",
          placeholder: "Descrição do módulo",
          type: FormInputTypeEnum.Text,
          isRequired: true,
        },
      },
      {
        input: {
          label: "Código",
          name: "code",
          placeholder: "Código do módulo",
          type: FormInputTypeEnum.Text,
          isRequired: true,
        },
      },
      {
        autocomplete: {
          label: "Módulo",
          name: "moduleId",
          type: FormInputTypeEnum.Text,
          placeholder: "Módulo relacionado",
          optionsApi: {
            endpoint: "modules",
            labelField: "name",
            valueField: "uuid",
            paramsToFilter: ["name", "code"],
          },
          isRequired: true,
        },
      },
      {
        button: {
          label: "Criar",
          type: FormButtonTypeEnum.Submit,          
        }
      }
    ],
    service: {
      baseUrl: "http://devbackadmin.lpsbr.com/api/v1",
      endpoint: "applications",
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
