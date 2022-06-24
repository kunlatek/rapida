import {
  FormButtonTypeEnum,
  FormInputTypeEnum,
  ServiceFunctionsEnum,
} from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const USERS_GROUP_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    title: "Grupo de usuários",
    id: "usersGroupForm",
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
        button: {
          label: "Criar",
          type: FormButtonTypeEnum.Submit,          
        }
      }
    ],
    service: {
      baseUrl: "http://devbackadmin.lpsbr.com/api/v1",
      endPoint: "user-groups",
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
