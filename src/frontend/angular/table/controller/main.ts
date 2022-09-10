import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { FileType } from "../../core/file-type";
import { writeToFile } from "../../core/write-to-file";
import { setTableControllerConstructorArguments } from "./constructor-args";
import { setTableControllerConstructorParams } from "./constructor-params";
import { setTableControllerImports } from "./imports";
import { setTableControllerMethods } from "./methods";
import { setTableControllerProperties } from "./properties";

/**
 * SET CODE
 * @param object
 * @returns
 */
const setTableController = (object: MainInterface): string => {
  if (!object.table) {
    console.info("Only tables set here");
    return ``;
  }
  const hasInfiniteScroll = object.table.infiniteScroll;
  let _imports: string = setTableControllerImports(object);
  let _properties: string = setTableControllerProperties(object);
  let _constructorParams: string = setTableControllerConstructorParams(object);
  let _constructorArguments: string = setTableControllerConstructorArguments(
    object
  );
  let _methods: string = setTableControllerMethods(object);

  let code = `
  ${_imports}

  @Component({
    selector: "app-${TextTransformation.kebabfy(object.table.id)}",
    templateUrl: "./${TextTransformation.kebabfy(
    object.table.id
  )}.component.html",
    styleUrls: ["./${TextTransformation.kebabfy(
    object.table.id
  )}.component.scss"],
  })
  export class ${TextTransformation.pascalfy(object.table.id)}Component ${hasInfiniteScroll ? `implements OnInit` : ''}{
    ${_properties}
    
    constructor(
      ${_constructorParams}
    ) {
      ${_constructorArguments}      
    }

    ${_methods}
  }
  `;

  writeToFile({
    id: object.table.id,
    projectPath: object.projectPath,
    code,
    type: FileType.COMPONENT,
  });

  return code;
};

export { setTableController };
