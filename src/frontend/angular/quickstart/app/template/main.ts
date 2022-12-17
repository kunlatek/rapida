import * as fs from "fs";

import { MainInterface } from "../../../../../interfaces/main";
import { AppInterface } from "../../../../../interfaces/quickstart";

const setAppTemplate = (object: MainInterface) => {
  if (!object.quickstart?.app) {
    console.info("Only apps set here");
    return ``;
  }

  try {
    const projectPath = `${object.projectPath}/src/app/modules/main/main.component.html`;
    const appCodeToSplit = fs.readFileSync(projectPath).toString();
    const appCodeSplitted = appCodeToSplit.split("<!-- APPS_SPACE -->");
    const appMenuCode = writeAppCode(object.quickstart.app);

    let code = `
    ${appCodeSplitted[0]}<!-- APPS_SPACE -->
    <button mat-icon-button
            [matMenuTriggerFor]="appMenu"
            aria-label="Example icon-button with a menu">
      <mat-icon>apps</mat-icon>
    </button>
    <!-- APPS_SPACE -->${appCodeSplitted[2]}
    `;

    const appMenuCodeSplitted = code.split("<!-- APPS_SPACE_MENU -->");

    code = `
    ${appMenuCodeSplitted[0]}<!-- APPS_SPACE_MENU -->
    ${appMenuCode}
    <!-- APPS_SPACE_MENU -->${appMenuCodeSplitted[2]}
    `;

    fs.writeFileSync(projectPath, code);
  } catch (error) {
    console.error(error);
  }
};

const writeAppCode = (array: AppInterface[]) => {
  let appCode = `
  <mat-menu #appMenu="matMenu">
  `;
  array.forEach(element => {
    appCode += `
    <a [href]="['${element.url}']" target="_blank" mat-menu-item>
      ${element.icon ? `<mat-icon>${element.icon}</mat-icon>` : ""}
      <span>${element.name}</span>
    </a>
    `;
  });

  appCode += `
  </mat-menu>
  `;

  return appCode;
};

export {
  setAppTemplate
};
