import {
  FormButtonTypeEnum,
  FormInputTypeEnum,
  ServiceFunctionsEnum,
} from "../../../src/enums/form";
import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const USERS_GROUP_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  form: {
    title: "Grupo de usuários",
    id: "usersGroupForm",
    elements: [
      {
        input: {
          label: "Nome",
          name: "name",
          placeholder: "Nome do grupo",
          type: FormInputTypeEnum.Text,
          isRequired: true,
        },
      },
      {
        input: {
          label: "Descrição",
          name: "description",
          placeholder: "Descrição do grupo",
          type: FormInputTypeEnum.Text,
          isRequired: true,
        },
      },
      {
        autocomplete: {
          label: "Usuários",
          name: "users",
          placeholder: "Usuários relacionados",
          type: FormInputTypeEnum.Text,
          optionsApi: {
            endpoint: "users",
            labelField: "name",
            valueField: "uuid",
            paramsToFilter: ["name"]
          },
          isRequired: true,
          isMultiple: true,
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
      endpoint: "user-groups",
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
