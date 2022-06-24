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

const setRepositoryImports = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }
  const modelName = object.form.id.replace("Form", "");

  let _modelImports: string = ``;
  let _repositoryImports: string = ``;

  object.form.elements.forEach((element) => {
    _modelImports += setModelImportsByElement(object, element);
    _repositoryImports += setRepositoryImportsByElement(object, element);
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
  import {Getter, inject} from '@loopback/core';
  import {BelongsToAccessor, DefaultCrudRepository, HasManyThroughRepositoryFactory, repository, Entity, model, property} from '@loopback/repository';
  import {MongodbDataSource} from '../datasources';
  import {${_modelImports}} from '../models';
  import {${_repositoryImports}} from '.';
  `;

  return code;
};

const setModelImportsByElement = (
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

export { setRepositoryImports };
