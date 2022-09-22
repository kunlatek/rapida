import { FormElementInterface } from "../../../interfaces/form";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";
import { getAllElements } from "../main";

const setControllerImports = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const modelName: string = object.form.id.replace("Form", "");
  let _relatedRepositoriesImports: string = ``;

  const elements: Array<FormElementInterface> = getAllElements(object.form?.elements);

  elements.forEach((element) => {
    _relatedRepositoriesImports += setRepositoriesImportsByElement(object, element);
  });

  let code = `
  import {authenticate} from '@loopback/authentication';
  import {inject, service} from '@loopback/core';
  import {repository} from '@loopback/repository';
  import {del, get, param, patch, post, put, Request, requestBody, response, Response, RestBindings} from '@loopback/rest';
  import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
  import {LocaleEnum} from '../enums/locale.enum';
  import {HttpDocumentation, HttpResponseToClient, Autentikigo} from '../implementations/index';
  import {IHttpResponse} from '../interfaces/http.interface';
  import {${TextTransformation.pascalfy(
    modelName
  )}} from '../models/${TextTransformation.kebabfy(modelName)}.model';
  import {${TextTransformation.pascalfy(
    modelName
  )}Repository} from '../repositories/${TextTransformation.kebabfy(
    modelName
  )}.repository';
  import {ChartService, StorageService} from '../services';
  import {serverMessages} from '../utils/server-messages';
  import {getRelatedElement, getRelatedElements} from '../utils/general-functions';
  ${_relatedRepositoriesImports ? `import {${_relatedRepositoriesImports}} from '../repositories';` : ''}
  `;

  return code;
};

const setRepositoriesImportsByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  let code = ``;
  const modelName = object.form!.id.replace("Form", "");
  const value = Object.values(element)[0];

  // if (value.optionsApi && value.optionsApi.endpoint) {
  //   const className = TextTransformation.setIdToClassName(
  //     TextTransformation.pascalfy(
  //       TextTransformation.singularize(
  //         value.optionsApi.endpoint.split("-").join(" ")
  //       )
  //     )
  //   );

  //   if (value.isMultiple) {
  //     code += createRepositoriesImports(modelName, className);
  //   }
  // }

  return code;
};

const createRepositoriesImports = (
  mainProperty: string,
  secondProperty: string
): string => {
  const mainPropertyCamelCase =
    mainProperty.charAt(0).toUpperCase() + mainProperty.slice(1);
  return `${mainPropertyCamelCase}Has${secondProperty}Repository, `;
};

export { setControllerImports };
