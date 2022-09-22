import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";

const setControllerImports = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const modelName: string = object.form.id.replace("Form", "");

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
  const ${TextTransformation.pascalfy(modelName)}Schema = require('../mongoose-schemas/${TextTransformation.kebabfy(modelName)}.schema');
  `;

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
