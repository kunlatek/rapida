import { FormButtonTypeEnum, FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const PROJECT_FORM: MainInterface = {
  backendFramework: BackendFrameworkEnum.Loopback,
  frontendFramework: FrontendFrameworkEnum.Angular,
  form: {
    id: "projectForm",
    title: "Projeto",
    elements: 
    [
      {
        tabs: [
          {
            title: "Dados principais",
            id: "tabMain",
            elements: [
              {
                input: {
                  label: "Nome",
                  name: "name",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Nome do projeto",
                  isRequired: true,
                },
              },
              {
                input: {
                  label: "Descrição",
                  name: "description",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Descrição do projeto",
                },
              },
            ]
          },
          {
            title: "Tratamento do frontend",
            id: "tabFrontend",
            elements: [
              {
                select: {
                  label: "Clone base",
                  name: "cloneFrontendPath",
                  type: FormInputTypeEnum.Text,
                  optionsObject: [{
                    label: "Kunlatek Quickstart",
                    value: "kunlatekQuickstart"
                  }],
                  isRequired: true,
                },
              },
              {
                select: {
                  label: "Framework base",
                  name: "frontendFramework",
                  type: FormInputTypeEnum.Text,
                  optionsObject: [{
                    label: "Angular",
                    value: "angular"
                  }],
                  isRequired: true,
                },
              },
              // {
              //   input: {
              //     label: "Integração em desenvolvimento",
              //     name: "envFrontDev",
              //     value: "http://localhost:3000",
              //     type: FormInputTypeEnum.Text,
              //     placeholder: "URL base do ambiente dev",
              //     isRequired: true
              //   }
              // },
              // {
              //   input: {
              //     label: "Integração em produção",
              //     name: "envFrontProd",
              //     type: FormInputTypeEnum.Text,
              //     placeholder: "URL base do ambiente prod",
              //   }
              // }
            ]
          },
          {
            title: "Tratamento do backend",
            id: "tabBackend",
            elements: [
              {
                select: {
                  label: "Clone do backend",
                  name: "cloneBackendPath",
                  type: FormInputTypeEnum.Text,
                  optionsObject: [{
                    label: "Kunlatek Quickstart API",
                    value: "https://github.com/kunlabori-teknologio/quickstart-api"
                  }],
                  isRequired: true,
                },
              },
              {
                select: {
                  label: "Framework base",
                  name: "backendFramework",
                  type: FormInputTypeEnum.Text,
                  optionsObject: [{
                    label: "Loopback",
                    value: "loopback"
                  }],
                  isRequired: true,
                },
              },
              // {
              //   input: {
              //     label: "Porta do servidor em desenvolvimento",
              //     name: "port",
              //     value: "3000",
              //     type: FormInputTypeEnum.Text,
              //     placeholder: "URL base do ambiente dev",
              //     isRequired: true
              //   }
              // },
              // {
              //   input: {
              //     label: "Raíz do servidor em desenvolvimento",
              //     name: "serverRootUri",
              //     value: "http://localhost",
              //     type: FormInputTypeEnum.Text,
              //     placeholder: "URL base do ambiente dev",
              //     isRequired: true
              //   }
              // },
              // {
              //   input: {
              //     label: "Permissão para acesso em dev",
              //     name: "clientRedirect",
              //     value: "http://localhost:4200",
              //     type: FormInputTypeEnum.Text,
              //     placeholder: "URL base do ambiente dev",
              //     isRequired: true
              //   }
              // },
              // {
              //   input: {
              //     label: "Projeto de BD em desenvolvimento",
              //     name: "db",
              //     type: FormInputTypeEnum.Text,
              //     placeholder: "Nome do projeto no banco",
              //     isRequired: true
              //   }
              // },
              // {
              //   input: {
              //     label: "Acesso ao BD em desenvolvimento",
              //     name: "dbAccessString",
              //     type: FormInputTypeEnum.Text,
              //     value: "mongodb+srv://kunlatek:Kunlatek751@cluster0.b0pfr.mongodb.net/?authSource=admin&replicaSet=atlas-zft6fn-shard-0&readPreference=primary&ssl=true",
              //     placeholder: "String para acesso ao banco",
              //     isRequired: true
              //   }
              // },
            ]
          }
        ]
      },
      {
        button: {
          label: "Criar",
          type: FormButtonTypeEnum.Submit
        }
      }
    ],
    service: {
      baseUrl: "http://localhost:3000",
      endPoint: "projects",
      hasAuthorization: true,
      methods: [
        ServiceFunctionsEnum.Get,
        ServiceFunctionsEnum.Delete,
        ServiceFunctionsEnum.Save,
        ServiceFunctionsEnum.Update,
        ServiceFunctionsEnum.Find,
      ],
    }
  }
}