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
  import {del, get, param, patch, post, put, Request, requestBody, response, Response, RestBindings} from '@loopback/rest';
  import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
  import {LocaleEnum} from '../enums/locale.enum';
  import {HttpDocumentation, HttpResponseToClient, Autentikigo} from '../implementations/index';
  import {IHttpResponse} from '../interfaces/http.interface';
  import {ChartService, StorageService, ${TextTransformation.pascalfy(modelName)}Service} from '../services';
  import {serverMessages} from '../utils/server-messages';
  const ${TextTransformation.pascalfy(modelName)}Schema = require('../mongoose-schemas/${TextTransformation.kebabfy(modelName)}.schema');
  import { convertStringFieldsToDate } from '../utils/date-manipulation-functions';
  import { removeObjAttr } from '../utils/general-functions';
  const fetch = require('node-fetch');
  `;

  return code;
};

export { setControllerImports };
