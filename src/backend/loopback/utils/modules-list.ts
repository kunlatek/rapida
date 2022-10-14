import * as fs from "fs";

import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";

const setUtilsModulesList = (objectList: Array<MainInterface>): void => {
  let code = `export const modulesList = (project: string) => [
    `;

  for (let objectIndex = 0; objectIndex < objectList.length; objectIndex++) {
    const object: MainInterface = objectList[objectIndex];
    const modelName = object.module!.id;

    code += `{
      'name': '${object.module!.title}',
      'icon': '${object.module!.icon || 'dashboard'}',
      'route': '/${TextTransformation.kebabfy(modelName)}',
      'collection': '${TextTransformation.pascalfy(modelName)}',
      'project': project,
    },`;
  }

  code += `
  ];
    
  export const defaultModulesList = (project: string) => [
    {
      'name': 'Grupo de permissões',
      'icon': 'people',
      'route': '/__permission-group',
      'collection': '__PermissionGroup',
      'project': project,
    },
    {
      'name': 'Convites',
      'icon': 'mail',
      'route': '/__invitation',
      'collection': '__Invitation',
      'project': project,
    },
    {
      'name': 'Usuários relacionados',
      'icon': 'connect_without_contact',
      'route': '/__related-user',
      'collection': '__RelatedUser',
      'project': project,
    },
  ]`;

  setUtilsModuleListArchitectureAndWriteToFile(objectList[0].projectPath, code);
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setUtilsModuleListArchitectureAndWriteToFile = (
  projectPath: string,
  code: string
) => {
  const componentFilePath = `${projectPath}-api/src/utils/modules-list.ts`;

  try {
    fs.writeFileSync(componentFilePath, code);
  } catch (error: any) {
    fs.writeFileSync(componentFilePath, code);
  }
};

export { setUtilsModulesList };
