import { FormButtonTypeEnum, FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const PERMISSION_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  form: {
    title: "Permissão",
    id: "permissionForm",
    elements: [
      {
        tabs: [
          {
            title: "Grupo de permissão",
            id: "permissionGroupTab",
            elements: [
              {
                input: {
                  label: "Nome",
                  placeholder: "Nome do grupo",
                  type: FormInputTypeEnum.Text,
                  name: "name",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Descrição",
                  placeholder: "Descrição do grupo",
                  type: FormInputTypeEnum.Text,
                  name: "description",
                }
              },
              {
                slide: {
                  label: "Permissão administrativa",
                  name: "isAdminPermission"
                }
              },
            ],
          },
          {
            title: "Permissões sobre módulos",
            id: "moduleTab",
            elements: [
              {
                array: {
                  title: "Permissão sobre módulo",
                  id: "modulePermissions",
                  elements: [
                    {
                      select: {
                        label: "Módulo",
                        type: FormInputTypeEnum.Text,
                        name: "moduleId",
                        optionsApi: {
                          endpoint: "__modules",
                          labelField: "name",
                          valueField: "_id",
                        }
                      }
                    },
                    {
                      select: {
                        label: "Permissões",
                        type: FormInputTypeEnum.Text,
                        name: "permissionActions",
                        optionsApi: {
                          endpoint: "__permission-actions",
                          labelField: "name",
                          valueField: "_id",
                        },
                        isMultiple: true,
                      }
                    },
                  ],
                }
              },
            ],
          },
        ]
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
      endpoint: "__permissions",
      hasAuthorization: true,
      methods: [
        ServiceFunctionsEnum.Get,
        ServiceFunctionsEnum.Delete,
        ServiceFunctionsEnum.Save,
        ServiceFunctionsEnum.Update,
        ServiceFunctionsEnum.Find,
      ],
    },
  }
}