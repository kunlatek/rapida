import * as fs from "fs";

import { MainInterface } from "../../../interfaces/main";
import { AppInterface } from "../../../interfaces/quickstart";

const setInvitationConfigs = (object: MainInterface) => {
    if (!object.quickstart?.app) {
        console.info("Only apps set here");
        return ``;
    }

    try {
        const projectPath = `${object.projectPath}-api/src/implementations/send-nodemailer-mail.implementation.ts`;
        const appCodeToSplit = fs.readFileSync(projectPath).toString();
        const appCodeSplitted = appCodeToSplit.split("/*APPS_SPACE*/");
        const appArrayCode = writeInvitationCode(object.quickstart.app);

        let code = ``;

        code = `${appCodeSplitted[0]}/*APPS_SPACE*/${appArrayCode}/*APPS_SPACE*/${appCodeSplitted[2]}`;

        fs.writeFileSync(projectPath, code);
    } catch (error) {
        console.error(error);
    }
};

const writeInvitationCode = (array: AppInterface[]) => {
    let appCode = ``;

    array
        .filter(element => element.permissionEnabled)
        .forEach(element => {
            appCode += `{url: "${element.url}", name: "${element.name}", project: "${element.db}"},`;
        });

    return appCode;
};

export {
    setInvitationConfigs
};
