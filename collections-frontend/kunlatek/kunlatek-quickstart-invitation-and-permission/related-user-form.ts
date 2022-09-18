import {
  FormButtonTypeEnum,
  FormInputTypeEnum,
  ServiceFunctionsEnum
} from "../../../src/enums/form";
import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const RELATED_USER_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  form: {
    title: "Usuário relacionado",
    id: "relatedUserForm",
    elements: [
      {
        input: {
          label: "E-mail",
          name: "email",
          type: FormInputTypeEnum.Email,
          isRequired: true,
          isDisabled: true,
        },
      },
      {
        input: {
          label: "Nome",
          name: "name",
          type: FormInputTypeEnum.Text,
          isRequired: true,
          isDisabled: true,
        },
      },
      {
        input: {
          label: "CPF/CNPJ",
          name: "uniqueId",
          type: FormInputTypeEnum.Text,
          isRequired: true,
          isDisabled: true,
        },
      },
      {
        input: {
          label: "Nome fantasia",
          name: "businessName",
          type: FormInputTypeEnum.Text,
          isRequired: true,
          isDisabled: true,
        },
      },
      {
        autocomplete: {
          label: "Grupo de permissões relacionado",
          name: "permissionGroupId",
          type: FormInputTypeEnum.Text,
          optionsApi: {
            endpoint: "__permission-groups",
            labelField: "name",
            valueField: "_id",
            paramsToFilter: ["name"],
          },
          isRequired: true,
        }
      },
      {
        button: {
          label: "Criar",
          type: FormButtonTypeEnum.Submit,
        },
      },
    ],
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "__related-users",
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
