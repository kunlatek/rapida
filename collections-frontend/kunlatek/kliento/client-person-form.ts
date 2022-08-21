import { FormInputTypeEnum, ServiceFunctionsEnum } from "../../../src/enums/form";
import { BackendFrameworkEnum, FrontendFrameworkEnum } from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_PERSON_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    id: "clientPersonForm",
    title: "Cliente pessoa",
    elements: [
      {
        tabs: [
          {
            id: "mainTab",
            title: "Dados principais",
            elements: [
              {
                input: {
                  label: "CPF",
                  name: "uniqueId",
                  type: FormInputTypeEnum.Text,
                  placeholder: "CPF do cliente",
                  mask: "000.000.000-00",
                  isRequired: true,
                }
              },
              {
                input: {
                  label: "Nome",
                  name: "name",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Nome do cliente",
                  isRequired: true,
                  isDisabled: true,
                }
              },
              {
                input: {
                  label: "Gênero",
                  name: "gender",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Gênero oficial do cliente",
                  isRequired: true,
                  isDisabled: true,
                }
              },
              {
                input: {
                  label: "Data de nascimento",
                  name: "birthay",
                  type: FormInputTypeEnum.Date,
                  isRequired: true,
                  isDisabled: true,
                }
              },
            ]
          },
          {
            id: "contactTab",
            title: "Contatos",
            elements: [
              {
                array: {
                  id: "contactArray",
                  title: "Contato",
                  elements: [
                    {
                      select: {
                        label: "Tipo de contato",
                        name: "contactType",
                        type: FormInputTypeEnum.Text,
                        optionsApi: {
                          externalEndpoint: "http://localhost:3001/contact-types",
                          labelField: "name",
                          valueField: "_id",
                        },
                      }
                    },
                    {
                      input: {
                        label: "Valor",
                        name: "contactValue",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Ex.: email@email.com | (88) 98888-8888",
                        tooltip: "Valor de acordo com o tipo de contato",
                      }
                    },
                    {
                      input: {
                        label: "Comentário",
                        name: "contactComment",
                        type: FormInputTypeEnum.Text,
                        placeholder: "Ex.: E-mail comercial | Telefone do vizinho",
                        tooltip: "Informação adicional acerca do contato",
                        isMultipleLines: true,
                      }
                    },
                  ],
                }
              },
            ]
          },
          {
            id: "addressTab",
            title: "Endereços",
            elements: [
              {
                input: {
                  label: "CEP",
                  name: "zipCode",
                  type: FormInputTypeEnum.Text,
                  placeholder: "Código postal",
                  tooltip: "Código postal relacionado ao cliente",
                }
              }
            ]
          }
        ]
      },      
    ],
    service: {
      baseUrl: "http://localhost:3000",
      endpoint: "client-people",
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