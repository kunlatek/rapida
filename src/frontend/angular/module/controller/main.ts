import * as fs from "fs";
import * as chp from "child_process";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import {
  setModuleControllerImports,
  setNgModuleImports,
  setNgModuleDeclarations,
} from "./imports";

/**
 * SET CODE
 * @param object
 * @returns
 */
const setModuleController = (object: MainInterface): string => {
  if (!object.module) {
    console.info("Only modules set here");
    return ``;
  }
  
  let _imports = setModuleControllerImports(object);
  let _ngModuleDeclarations = setNgModuleDeclarations(object);
  let _ngModuleImports = setNgModuleImports(object);

  let code = `
  ${_imports}

  const maskConfig: Partial < IConfig > = {
    validation: false,
  };
  
  @NgModule({
    declarations: [
      ${TextTransformation.pascalfy(object.module.id)}Component,
      ${_ngModuleDeclarations}
    ],
    imports: [
      CommonModule,
      ${TextTransformation.pascalfy(object.module.id)}RoutingModule,
      NgxMaskModule.forRoot(maskConfig),
      SharedModule,
      ${_ngModuleImports}
    ]
  })
  export class ${TextTransformation.pascalfy(object.module.id)}Module { }
  `;

  setModuleControllerArchitectureAndWriteToFile(object, code);
  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setModuleControllerArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  if (!object.module) {
    return ``;
  }

  const filePath = `${
    object.projectPath
  }/src/app/modules/${TextTransformation.kebabfy(
    object.module.id
  )}/${TextTransformation.kebabfy(object.module.id)}.module.ts`;

  try {
    fs.writeFileSync(filePath, code);
    console.info(
      `File ${TextTransformation.kebabfy(object.module.id)} already exists.`
    );
    console.info(`File successfully written in ${filePath}.`);
  } catch (error) {
    console.info(
      `File ${TextTransformation.kebabfy(object.module.id)} doesn't exist.`
    );

    try {
      chp.execSync(
        `ng g module modules/${TextTransformation.kebabfy(
          object.module.id
        )} --routing --routing-scope Child`,
        { cwd: object.projectPath }
      );

      chp.execSync(
        `ng g c modules/${TextTransformation.kebabfy(
          object.module.id
        )} --module modules/${TextTransformation.kebabfy(object.module.id)}`,
        { cwd: object.projectPath }
      );
    } catch (error) {
      console.warn(error);
    }

    fs.writeFileSync(filePath, code);

    setModuleControllerLazyLoad(object);
    setModuleControllerComponentRoute(object);

    console.info(`File successfully created in ${filePath}.`);
  }
};

const setModuleControllerLazyLoad = (object: MainInterface) => {
  if (!object.module) {
    console.info("Only modules set here");
    return ``;
  }

  const projectMainModuleRoutingPath = `${object.projectPath}/src/app/modules/main/main-routing.module.ts`;

  try {
    const file = fs.readFileSync(projectMainModuleRoutingPath);
    const routeCode =
      file
        .toString()
        .search(`path: '${TextTransformation.kebabfy(object.module.id)}'`) >= 0
        ? ""
        : `{path: '${TextTransformation.kebabfy(
            object.module.id
          )}', loadChildren: () => import('../${TextTransformation.kebabfy(
            object.module.id
          )}/${TextTransformation.kebabfy(
            object.module.id
          )}.module').then(m => m.${TextTransformation.setIdToClassName(
            object.module.id
          )}Module)}, `;
    const editRouteCode =
      file
        .toString()
        .search(`path: '${TextTransformation.kebabfy(object.module.id)}'`) >= 0
        ? ""
        : `{path: '${TextTransformation.kebabfy(
            object.module.id
          )}/:id', loadChildren: () => import('../${TextTransformation.kebabfy(
            object.module.id
          )}/${TextTransformation.kebabfy(
            object.module.id
          )}.module').then(m => m.${TextTransformation.setIdToClassName(
            object.module.id
          )}Module)}, `;

    let code = ``;

    code = file
      .toString()
      .replace("children: [", `children: [${routeCode} ${editRouteCode}`);

    fs.writeFileSync(projectMainModuleRoutingPath, code);

    return true;
  } catch (error) {
    console.error(error);
  }
};

const setModuleControllerComponentRoute = (object: MainInterface) => {
  if (!object.module) {
    return ``;
  }

  const moduleRoutingPath = `${
    object.projectPath
  }/src/app/modules/${TextTransformation.kebabfy(
    object.module.id
  )}/${TextTransformation.kebabfy(object.module.id)}-routing.module.ts`;

  try {
    const file = fs.readFileSync(moduleRoutingPath);
    const moduleComponentCode =
      file.toString().search(`const routes: Routes = [];`) >= 0
        ? ""
        : `import { ${TextTransformation.setIdToClassName(
            object.module.id
          )}Component } from './${TextTransformation.kebabfy(
            object.module.id
          )}.component'; const routes: Routes = [{ path: '', component: ${TextTransformation.setIdToClassName(
            object.module.id
          )}Component }];`;
    let code = "";

    code = file
      .toString()
      .replace("const routes: Routes = [];", `${moduleComponentCode}`);

    fs.writeFileSync(moduleRoutingPath, code);

    return true;
  } catch (error) {
    console.error(error);
  }
};

export { setModuleController };
