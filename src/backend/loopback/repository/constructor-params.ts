import { FormElementInterface } from "../../../interfaces/form";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";
import { getAllElements } from "../main";

const setRepositoryConstructorParams = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let _constructorParams: string = ``;

  const elements: Array<FormElementInterface> = getAllElements(object.form?.elements);

  elements.forEach((element) => {
    _constructorParams += setConstructorParamsByElement(object, element);
  });

  let code = `
  @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ${_constructorParams}
  `;

  return code;
};

const setConstructorParamsByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  const modelName = object.form!.id.replace("Form", "");
  const value = Object.values(element)[0];

  let code = ``;

  if (value.optionsApi) {
    const modelNameClass = TextTransformation.setIdToClassName(modelName);
    const className = TextTransformation.setIdToClassName(
      TextTransformation.pascalfy(
        TextTransformation.singularize(
          value.optionsApi.endpoint.split("-").join(" ")
        )
      )
    );
    const propertyName = TextTransformation.setIdToPropertyName(
      TextTransformation.pascalfy(
        TextTransformation.singularize(
          value.optionsApi.endpoint.split("-").join(" ")
        )
      )
    );

    code += `@repository.getter('${className}Repository') ${propertyName}RepositoryGetter: Getter<${className}Repository>,`;

    if (value.isMultiple) {
      code += `@repository.getter('${modelNameClass}Has${className}Repository') ${modelName}Has${className}RepositoryGetter: Getter<${modelNameClass}Has${className}Repository>,`;
    }
  }

  return code;
};

export { setRepositoryConstructorParams };
