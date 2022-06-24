import { FormElementInterface } from "../../../interfaces/form";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";

const validTypes = [
  "checkbox",
  "radio",
  "datalist",
  "fieldset",
  "input",
  "select",
  "slide",
  "textarea",
  "autocomplete",
];

const setRepositoryMethods = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let code = ``;

  object.form.elements.forEach((element) => {
    code += setMethodsByElement(object, element);
  });

  return code;
};

const setMethodsByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  const modelName = object.form!.id.replace("Form", "");
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  let code = ``;

  if (validTypes.includes(type)) {
    if (value.optionsApi) {
      const className = TextTransformation.setIdToClassName(
        TextTransformation.pascalfy(
          TextTransformation.singularize(
            value.optionsApi.endpoint.split("-").join(" ")
          )
        )
      );

      if (value.isMultiple) {
        code += createRepositoryRelatedModels(modelName, className);
      }
    }
  } else if (type === "tabs") {
    element.tabs?.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        code += setMethodsByElement(object, tabElement);
      });
    });
  }

  return code;
};

const createRepositoryRelatedModels = (
  mainProperty: string,
  secondProperty: string
): string => {
  const mainPropertyCamelCase =
    mainProperty.charAt(0).toLowerCase() + mainProperty.slice(1);
  const secondPropertyCamelCase =
    secondProperty.charAt(0).toLowerCase() + secondProperty.slice(1);

  return `
      @model()
      export class ${mainProperty}Has${secondProperty} extends Entity {
          @property({ type: 'string', id: true, generated: true })
          _id?: string;
          
          @property()
          ${mainPropertyCamelCase}Id?: string;
          
          @property()
          ${secondPropertyCamelCase}${
    mainPropertyCamelCase === secondPropertyCamelCase ? "Related" : ""
  }Id?: string;
          
          constructor(data?: Partial<${mainProperty}Has${secondProperty}>) {
              super(data);
          }
      }
      interface ${mainProperty}Has${secondProperty}Relations {}
      type ${mainProperty}Has${secondProperty}WithRelations = ${mainProperty}Has${secondProperty} & ${mainProperty}Has${secondProperty}Relations;
      export class ${mainProperty}Has${secondProperty}Repository extends DefaultCrudRepository<
          ${mainProperty}Has${secondProperty},
          typeof ${mainProperty}Has${secondProperty}.prototype._id,
          ${mainProperty}Has${secondProperty}Relations
      > {
          constructor(
              @inject('datasources.mongodb') dataSource: MongodbDataSource,
          ) {
              super(${mainProperty}Has${secondProperty}, dataSource);
          }
      }
  `;
};

export { setRepositoryMethods };
