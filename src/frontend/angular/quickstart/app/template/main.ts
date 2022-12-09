import * as fs from "fs";

import { MainInterface } from "../../../../../interfaces/main";
import { AppInterface } from "../../../../../interfaces/quickstart";

const setAppTemplate = (object: MainInterface) => {
  if (!object.quickstart?.app) {
    console.info("Only apps set here");
    return ``;
  }
  const appCodeToSplit = fs.readFileSync(`${object.projectPath}/src/app/modules/main/main.component.html`).toString();

  const appCodeSplitted = appCodeToSplit.split("<!-- APPS_SPACE -->");
  const appMenuCodeSplitted = appCodeToSplit.split("<!-- APPS_SPACE_MENU -->");


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

  code = `
  ${appMenuCodeSplitted[0]}<!-- APPS_SPACE_MENU -->
  ${appMenuCode}
  <!-- APPS_SPACE_MENU -->${appMenuCodeSplitted[2]}
  `;

  console.log(code);
};

const writeAppCode = (array: AppInterface[]) => {
  let appCode = `
  <mat-menu #appMenu="matMenu">
  `;
  array.forEach(element => {
    appCode += `
    <button mat-menu-item>
      ${element.icon ? `<mat-icon>${element.icon}</mat-icon>` : ""}
      <span>${element.name}</span>
    </button>
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
