import {
  FormButtonTypeEnum,
  FormInputTypeEnum,
  ServiceFunctionsEnum,
} from "../../../src/enums/form";
import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const MODEL_GROUP_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  form: {
    title: "Módulos",
    id: "modelGroupForm",
    elements: [
      {
        input: {
          label: "Nome",
          name: "name",
          placeholder: "Nome do modelo",
          type: FormInputTypeEnum.Text,
          isRequired: true,
        },
      },
      {
        input: {
          label: "Descrição",
          name: "description",
          placeholder: "Descrição do modelo",
          type: FormInputTypeEnum.Text,
          isRequired: true,
        },
      },
      {
        select: {
          label: "Módulo",
          name: "moduleId",
          type: FormInputTypeEnum.Text,
          optionsApi: {
            endpoint: "modules",
            labelField: "name",
            valueField: "uuid",
          },
          isRequired: true,
        }
      },
      {
        select: {
          label: "Aplicações",
          name: "applications",
          type: FormInputTypeEnum.Text,
          optionsApi: {
            endpoint: "applications",
            labelField: "name",
            valueField: "uuid"
          }
        }
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
      endpoint: "model-groups",
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
