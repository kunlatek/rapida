import * as fs from "fs";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

const setSeedModules = (object: MainInterface): void => {
    if (!object.form) {
        console.info("Only forms set here");
        return;
    }

    const entityName: string = object.form.id.replace("Form", "");
    const modelName: string = TextTransformation.pascalfy(entityName);
    const routeName: string = TextTransformation.kebabfy(entityName);

    let code = `
    ,{
        "name": "${modelName}",
        "description": "${modelName}",
        "collectionName": "${modelName}",
        "route": "${routeName}"
    }
    `;

    setSeedModuleArchitectureAndWriteToFile(object, code);
};

const setSeedModuleArchitectureAndWriteToFile = (
    object: MainInterface,
    code: string
) => {
    const filePath = `${object.projectPath}-api/src/utils/seed/Module.json`;
    fs.appendFile(filePath, code, () => { });
};

export { setSeedModules };
