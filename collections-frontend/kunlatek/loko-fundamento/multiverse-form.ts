import { FormButtonTypeEnum, FormInputTypeEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const MULTIVERSE_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    title: "Multiverso",
    id: "multiverseForm",
    elements: [
      {
        input: {
          label: "Nome",
          name: "name",
          placeholder: "Ex.: Universo",
          type: FormInputTypeEnum.Text,
          isRequired: true,
        }
      },
      {
        input: {
          label: "Descrição",
          name: "name",
          type: FormInputTypeEnum.Text,
          placeholder: "O universo observável tem de raio cerca de 46 bilhões de anos-luz.",
          isMultipleLines: true,
        }
      },
      {
        button: {
          label: "Criar",
          type: FormButtonTypeEnum.Submit,
        }
      }
    ]
  }
}