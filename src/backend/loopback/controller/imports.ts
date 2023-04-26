import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";

const setControllerImports = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const entityName: string = object.form.id.replace("Form", "");
  const modelName: string = TextTransformation.pascalfy(entityName);

  let code = `
  import {authenticate} from '@loopback/authentication';
  import {inject} from '@loopback/core';
  import {repository} from '@loopback/repository';
  import {Request, Response, RestBindings, api, del, get, param, patch, post, put, requestBody, response} from '@loopback/rest';
  import {SecurityBindings, UserProfile} from '@loopback/security';
  import {I${modelName}} from '../../domain/entities';
  import {I${modelName}Repository} from '../../domain/repositories';
  import {${modelName}Repository} from '../../repositories';
  import {${entityName}Schema} from '../../repositories/mongo/api/schemas/${TextTransformation.kebabfy(entityName)}.schema';
  import {getSwaggerRequestBodySchema, getSwaggerResponseSchema} from '../../utils/general.util';
  import {IHttpResponse, badRequestErrorHttpResponse, createHttpResponse, notFoundErrorHttpResponse, okHttpResponse} from '../../utils/http-response.util';
  
  `;

  return code;
};

export { setControllerImports };
