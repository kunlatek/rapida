import {
  FormButtonTypeEnum,
  FormInputTypeEnum,
  ServiceFunctionsEnum,
} from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const ANIMATION_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    title: "Animação",
    id: "animationForm",
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
      {
        button: {
          label: "Criar",
          type: FormButtonTypeEnum.Submit,          
        }
      },
    ],
    service: {
      baseUrl: "http://localhost:3000",
      endPoint: "animations",
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
