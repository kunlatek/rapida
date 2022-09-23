import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { getAllElements } from "../../main";

const setModelImports = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }
  let _importsDefault: string = ``;
  let _importsRelatedRepositories: string = ``;

  let additionalLoopbackRepositoriesImportMethods: string[] = [];

  const elements: Array<FormElementInterface> = getAllElements(object.form?.elements);

  elements.forEach((element) => {
    _importsDefault += setImportsDefaultByElement(object, element);
    _importsRelatedRepositories += setImportsRelatedRepositoriesByElement(object, element);

    additionalLoopbackRepositoriesImportMethods = [...additionalLoopbackRepositoriesImportMethods, ...getAdditionalLoopbackRepositoriesImportMethods(element)];
  });

  additionalLoopbackRepositoriesImportMethods = [...new Set(additionalLoopbackRepositoriesImportMethods)];

  _importsDefault = [
    ...new Set(`${_importsDefault}`.split(",").map((el) => el.trim())),
  ].join(",");

  let code = `
  import {model, property, Entity, ${additionalLoopbackRepositoriesImportMethods.join(',')}} from '@loopback/repository';
  import {${_importsDefault}__Default} from '.';
  ${_importsRelatedRepositories ? `import {${_importsRelatedRepositories}} from '../repositories/';` : ""}
  `;

  return code;
};

const setImportsDefaultByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  const modelName = object.form!.id.replace("Form", "");
  const value = Object.values(element)[0];

  let code = ``;

  // if (value.optionsApi && value.optionsApi.endpoint) {
  //   const propertyName = TextTransformation.setIdToClassName(
  //     TextTransformation.pascalfy(
  //       TextTransformation.singularize(
  //         value.optionsApi.endpoint.split("-").join(" ")
  //       )
  //     )
  //   );
  //   const modelNameClass = TextTransformation.setIdToClassName(modelName);

  //   code += modelNameClass !== propertyName ? `${propertyName}, ` : "";
  // }

  return code;
};

const setImportsRelatedRepositoriesByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  const modelName = object.form!.id.replace("Form", "");
  const value = Object.values(element)[0];

  let code = ``;

  // if (value.optionsApi && value.optionsApi.endpoint) {
  //   const className = TextTransformation.setIdToClassName(
  //     TextTransformation.pascalfy(
  //       TextTransformation.singularize(
  //         value.optionsApi.endpoint.split("-").join(" ")
  //       )
  //     )
  //   );
  //   const modelNameClass = TextTransformation.setIdToClassName(modelName);

  //   if (value.isMultiple) {
  //     code += `${modelNameClass}Has${className}`;
  //   }
  // }

  return code;
};

const getAdditionalLoopbackRepositoriesImportMethods = (
  element: FormElementInterface
) => {

  // let additionalLoopbackRepositoriesImportMethods = [];
  let additionalLoopbackRepositoriesImportMethods = [[]];

  const value = Object.values(element)[0];

  // if (value.optionsApi && value.optionsApi.endpoint) {
  //   if (value.isMultiple) additionalLoopbackRepositoriesImportMethods.push('hasMany')
  //   else additionalLoopbackRepositoriesImportMethods.push('belongsTo');
  // }

  return additionalLoopbackRepositoriesImportMethods.flat();
};

export { setModelImports };
