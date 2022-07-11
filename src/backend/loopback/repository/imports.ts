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
  "text",
  "autocomplete",
];

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

  object.form.elements.forEach((element) => {
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

  if (validTypes.includes(type)) {
    if (value.optionsApi) {
      const className = TextTransformation.setIdToClassName(
        TextTransformation.pascalfy(
          TextTransformation.singularize(
            value.optionsApi.endpoint.split("-").join(" ")
          )
        )
      );

      code += `${className},`;
    }
  } else if (type === "tabs") {
    element.tabs?.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        code += setModelImportsByElement(object, tabElement);
      });
    });
  }

  return code;
};

const setRepositoryImportsByElement = (
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

      code += modelName.toLowerCase() !== className.toLowerCase() ? `${className}Repository,` : "";
    }
  } else if (type === "tabs") {
    element.tabs?.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        code += setRepositoryImportsByElement(object, tabElement);
      });
    });
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

  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  if (validTypes.includes(type) && value.optionsApi) {
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
  } else if (type === "tabs") {
    element.tabs?.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        additionalLoopbackCoreAndRepositoriesImportMethods['core'] = additionalLoopbackCoreAndRepositoriesImportMethods['core'].concat(getAdditionalLoopbackCoreAndRepositoriesImportMethods(tabElement)['core']);
        additionalLoopbackCoreAndRepositoriesImportMethods['repositories'] = additionalLoopbackCoreAndRepositoriesImportMethods['repositories'].concat(getAdditionalLoopbackCoreAndRepositoriesImportMethods(tabElement)['repositories']);
      });
    });
  }

  return additionalLoopbackCoreAndRepositoriesImportMethods;
}

export { setRepositoryImports };
