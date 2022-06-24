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
const stringTypes = [
  "email",
  "password",
  "tel",
  "text",
  "url",
  "date",
  "datetime-local",
  "month",
  "range",
  "time",
  "url",
  "week",
];
const numberTypes = ["number"];
const setModelImports = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }
  let _importsDefault: string = ``;
  let _importsRelatedRepositories: string = ``;

  object.form.elements.forEach((element) => {
    _importsDefault += setImportsDefaultByElement(object, element);
    _importsRelatedRepositories += setImportsRelatedRepositoriesByElement(object, element);
  });

  let code = `
  import {belongsTo, hasMany, model, property} from '@loopback/repository';
  import {${_importsDefault}__Default} from '.';
  import {${_importsRelatedRepositories}} from '../repositories/';
  `;

  return code;
};

const setImportsDefaultByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  const modelName = object.form!.id.replace("Form", "");
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  let code = ``;

  if (validTypes.includes(type)) {
    if (value.optionsApi) {
      const propertyName = TextTransformation.setIdToClassName(
        TextTransformation.pascalfy(
          TextTransformation.singularize(
            value.optionsApi.endpoint.split("-").join(" ")
          )
        )
      );
      const modelNameClass = TextTransformation.setIdToClassName(modelName);

      code += modelNameClass !== propertyName ? `${propertyName}, ` : "";
    }
  } else if (type === "tabs") {
    element.tabs?.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        code += setImportsDefaultByElement(object, tabElement);
      });
    });
  }

  return code;
};

const setImportsRelatedRepositoriesByElement = (
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
      const modelNameClass = TextTransformation.setIdToClassName(modelName);

      if (value.isMultiple) {
        code += `${modelNameClass}Has${className}`;
      }
    }
  } else if (type === "tabs") {
    element.tabs?.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        code += setImportsRelatedRepositoriesByElement(object, tabElement);
      });
    });
  }

  return code;
};

export { setModelImports };
