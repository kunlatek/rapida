import {
  FormButtonTypeEnum,
  FormInputTypeEnum,
  ServiceFunctionsEnum,
} from "../../../src/enums/form";
import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const INVITATION_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  form: {
    title: "Convite",
    id: "invitationForm",
    elements: [
      {
        input: {
          label: "E-mail",
          name: "email",
          type: FormInputTypeEnum.Email,
          placeholder: "Gmail ou Apple apenas.",
          isRequired: true,
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
        },
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
      endpoint: "__invitations",
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
