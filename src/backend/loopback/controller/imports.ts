import { FormElementInterface } from "../../../interfaces/form";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";

const setControllerImports = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const modelName: string = object.form.id.replace("Form", "");
  let _relatedRepositoriesImports: string = ``;

  object.form.elements.forEach((element) => {
    _relatedRepositoriesImports += setRepositoriesImportsByElement(object, element);
  });

  let code = `
  import {authenticate} from '@loopback/authentication';
  import {inject, service} from '@loopback/core';
  import {repository} from '@loopback/repository';
  import {del, get, param, patch, post, put, Request, requestBody, response, Response, RestBindings} from '@loopback/rest';
  import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
  import {LocaleEnum} from '../enums/locale.enum';
  import {HttpDocumentation, HttpResponseToClient} from '../implementations/index';
  import {IHttpResponse} from '../interfaces/http.interface';
  import {${TextTransformation.pascalfy(
    modelName
  )}} from '../models/${TextTransformation.kebabfy(modelName)}.model';
  import {${TextTransformation.pascalfy(
    modelName
  )}Repository} from '../repositories/${TextTransformation.kebabfy(
    modelName
  )}.repository';
  import {ChartService} from '../services';
  import {serverMessages} from '../utils/server-messages';
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
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

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
        code += createRepositoriesImports(modelName, className);
      }
    }
  } else if (type === "tabs") {
    element.tabs?.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        code += setRepositoriesImportsByElement(object, tabElement);
      });
    });
  } else if (type === "array") {
    if (element.array?.elements) {
      element.array?.elements.forEach((arrayElement) => {
        code += setRepositoriesImportsByElement(object, arrayElement);
      });
    }
  }

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
