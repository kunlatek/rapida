import { FormElementInterface } from "../../../interfaces/form";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";
import { getAllElements } from "../main";

const setRepositoryImports = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }
  const modelName = object.form.id.replace("Form", "");

  let _modelImports: string = ``;
  let _repositoryImports: string = ``;

  let additionalLoopbackCoreAndRepositoriesImportMethods = {
    core: [] as string[],
    repositories: [] as string[],
  }

  const elements: Array<FormElementInterface> = getAllElements(object.form?.elements);

  elements.forEach((element) => {
    _modelImports += setModelImportsByElement(object, element);
    _repositoryImports += setRepositoryImportsByElement(object, element);

    additionalLoopbackCoreAndRepositoriesImportMethods["core"] = [...additionalLoopbackCoreAndRepositoriesImportMethods.core, ...getAdditionalLoopbackCoreAndRepositoriesImportMethods(element).core];
    additionalLoopbackCoreAndRepositoriesImportMethods["repositories"] = [...additionalLoopbackCoreAndRepositoriesImportMethods.repositories, ...getAdditionalLoopbackCoreAndRepositoriesImportMethods(element).repositories];
  });


  _modelImports = [
    ...new Set(
      `${_modelImports} ${TextTransformation.pascalfy(
        modelName
      )}, ${TextTransformation.pascalfy(modelName)}Relations`
        .split(",")
        .map((el) => el.trim())
    ),
  ].join(",");

  _repositoryImports = [
    ...new Set(`${_repositoryImports}`.split(",").map((el) => el.trim())),
  ].join(",");

  let code = `
  import {
    inject, 
    ${[...new Set(additionalLoopbackCoreAndRepositoriesImportMethods['core'])].join(',')}
  } from '@loopback/core';
  import {
    DefaultCrudRepository,
    ${[...new Set(additionalLoopbackCoreAndRepositoriesImportMethods['repositories'])].join(',')}
  } from '@loopback/repository';
  import {MongodbDataSource} from '../datasources';
  import {${_modelImports}} from '../models';
  ${_repositoryImports ? `import {${_repositoryImports}} from '.';` : ''}
  `;

  return code;
};

const setModelImportsByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  let code = ``;

  if (value.optionsApi && value.optionsApi.endpoint) {
    const className = TextTransformation.setIdToClassName(
      TextTransformation.pascalfy(
        TextTransformation.singularize(
          value.optionsApi.endpoint.split("-").join(" ")
        )
      )
    );

    code += `${className},`;
  }

  return code;
};

const setRepositoryImportsByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  const modelName = object.form!.id.replace("Form", "");
  const value = Object.values(element)[0];

  let code = ``;

  if (value.optionsApi && value.optionsApi.endpoint) {
    const className = TextTransformation.setIdToClassName(
      TextTransformation.pascalfy(
        TextTransformation.singularize(
          value.optionsApi.endpoint.split("-").join(" ")
        )
      )
    );

    code += modelName.toLowerCase() !== className.toLowerCase() ? `${className}Repository,` : "";
  }

  return code;
};

const getAdditionalLoopbackCoreAndRepositoriesImportMethods = (
  element: FormElementInterface
) => {

  let additionalLoopbackCoreAndRepositoriesImportMethods = {
    core: [] as string[],
    repositories: [] as string[],
  };

  const value = Object.values(element)[0];

  if (value.optionsApi && value.optionsApi.endpoint) {
    additionalLoopbackCoreAndRepositoriesImportMethods['core'].push('Getter')
    additionalLoopbackCoreAndRepositoriesImportMethods['repositories'] = additionalLoopbackCoreAndRepositoriesImportMethods['repositories'].concat(['repository'])
    if (value.isMultiple) {
      additionalLoopbackCoreAndRepositoriesImportMethods['repositories'] = additionalLoopbackCoreAndRepositoriesImportMethods['repositories'].concat([
        'HasManyThroughRepositoryFactory',
        'Entity',
        'model',
        'property',
      ])
    } else {
      additionalLoopbackCoreAndRepositoriesImportMethods['repositories'] = additionalLoopbackCoreAndRepositoriesImportMethods['repositories'].concat(['BelongsToAccessor'])
    }
  }

  return additionalLoopbackCoreAndRepositoriesImportMethods;
}

export { setRepositoryImports };
