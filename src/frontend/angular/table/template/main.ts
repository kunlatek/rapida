import * as fs from "fs";
import * as chp from "child_process";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import {
  RowMenuElementInterface,
  TableElementInterface,
} from "../../../../interfaces/table";
import { FormElementInterface } from "../../../../interfaces/form";
import { RequestTypeEnum } from "../../../../enums/request";

/**
 * SET CODE
 * @param object
 * @returns
 */
const setTableTemplate = (object: MainInterface, mainArray: Array<MainInterface> | undefined = undefined,): string => {
  if (!object.table) {
    console.info("Only tables set here");
    return ``;
  }

  let _specificStructure: string = "";
  let _specificStructureOverMenu: string = "";

  const hasTableTitle = object.table.title
    ? `<mat-card-title>${object.table.title}</mat-card-title>`
    : "";

  const hasTableSubtitle = object.table.subtitle
    ? `<mat-card-subtitle>${object.table.subtitle}</mat-card-subtitle>`
    : "";

  object.table?.elements.forEach((element) => {
    _specificStructure += setSpecificStructureOverTableElement(object, element);
    _specificStructureOverMenu += setSpecificStructureOverRowMenu(object, element);
  });
  
  let code = `
  <mat-card>
    <mat-card-header>
      ${hasTableTitle}
      ${hasTableSubtitle}
    </mat-card-header>

    <mat-card-actions>
    <div class="flex-row">
        <form id="${object.table.id}" #${object.table.id}Directive="ngForm" 
        [formGroup]="${object.table.id}SearchForm" 
        (ngSubmit)="${object.table.id}Search(${object.table.id}Directive)">
          <mat-form-field appearance="standard">
            <mat-label>Filtro</mat-label>
            <input matInput formControlName="searchInput" 
            placeholder="Procure qualquer coisa">
          </mat-form-field>
          <button mat-raised-button color="primary">
            <mat-icon>search</mat-icon> Filtrar
          </button>        
        </form>
        <button mat-raised-button color="primary" (click)="createXls(${object.table.id}DataSource)">
          <mat-icon>format_list_bulleted</mat-icon>
          Baixar XLS
        </button>
      </div>
    </mat-card-actions>

    <mat-card-content class="table-container">
    <table mat-table [dataSource]="${object.table.id}DataSource" class="mat-elevation-z8">
      ${_specificStructure}    
      <tr mat-header-row *matHeaderRowDef="${object.table.id}DisplayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: ${object.table.id}DisplayedColumns;"></tr>                                        
    </table>
    <div 
      style="width: 100%; height: 100px; display: flex; align-items: center; justify-content: center; color: #c9c9c9"
      *ngIf="${object.table.id}DataSource.length === 0 && !isLoading">
      <div style="display: flex; flex-direction: column;">
        <img 
          width="50"
          height="50"
          style="filter: invert(60%) sepia(0%) saturate(60%) hue-rotate(88deg) brightness(128%) contrast(119%);"
          src="https://www.svgrepo.com/show/97068/empty-box.svg" alt="">
        <span>No Data</span>
      </div>
    </div> 
    <div *ngIf="isLoading" class="loading">
        <mat-progress-bar color="primary" mode="buffer">
        </mat-progress-bar>
    </div>
    </mat-card-content>
  </mat-card>
  ${_specificStructureOverMenu}
  `;

  setTableTemplateArchitectureAndWriteToFile(object, code);
  return code;
};

const setSpecificStructureOverTableElement = (
  object: MainInterface,
  element: TableElementInterface
): string => {
  if (!object.table) {
    console.info("Only tables set here");
    return ``;
  }

  
  let columnContent = "";
  let code = ``;

  if (element.row.menu) {
    columnContent = `
    <button mat-icon-button class="icon" aria-label="${TextTransformation.pascalfy(
      object.table.id
    )}" [matMenuTriggerFor]="${
      object.table?.id
    }Menu"  [matMenuTriggerData]="{element: element}">
      <mat-icon>${element.row.icon}</mat-icon>
    </button>
    `;
  }

  if (!element.row.menu) {
    if (element.row.fieldProperties) {
      element.row.fieldProperties.forEach((property: string, index: number) => {
        columnContent += `
        ${index > 0 ? " | " :  ""}{{element.${element.row.field}.${property}}}
        `;
      });
    }

    if (!element.row.fieldProperties) {
      columnContent = `
      {{element.${element.row.field}}}
      `;
    }
  }

  code += `
  <ng-container matColumnDef="${element.row.field}">
    <th mat-header-cell *matHeaderCellDef> ${element.column.label} </th>
    <td mat-cell *matCellDef="let element"> ${columnContent} </td>
  </ng-container>
  `;

  return code;
};

const setSpecificStructureOverRowMenu = (
  object: MainInterface,
  element: TableElementInterface
): string => {
  const menuArray: Array<RowMenuElementInterface> = [];
  let code = ``;

  if (element.row.menu) {
    element.row.menu.forEach((menuElement) => {
      menuArray.push(menuElement);
    });

    code += `
    <mat-menu #${object?.table?.id}Menu="matMenu">
      ${setSpecificStructureOverRowMenuItems(menuArray)}
    </mat-menu>
    `;
  }
  
  return code;
}

const setSpecificStructureOverRowMenuItems = (
  rowMenuElements: Array<RowMenuElementInterface>
) => {
  let code = "",
    hasMenuParam = false,
    menuButtonAction = "";

  for (let i = 0; i < rowMenuElements.length; i++) {
    const element = rowMenuElements[i];
    let count = 0,
      menuParam = "";

    if (element.action.type && element.action.type == RequestTypeEnum.Link) {
      menuButtonAction = `[routerLink]="['${element.action.url}'${
        element.action.param ? ", " + element.action.param : ""
      }]"`;

      if (element.action.param) {
        hasMenuParam = true;
        if (count === 0) {
          menuParam = `<ng-template matMenuContent let-${element.action.param}="element.${element.action.param}">`;
        }

        count++;
      }
    }

    if (element.dialog && element.dialog.templateFolder) {
      const dialogTemplateAsPropertyName = TextTransformation.setIdToPropertyName(
        element.dialog?.templateFolder
      );
      menuButtonAction = `(click)="${dialogTemplateAsPropertyName}OpenDialog(${element.action.param})"`;
    }

    code += `
    ${menuParam}<button mat-menu-item ${menuButtonAction}>
      ${element.icon ? `<mat-icon>${element.icon}</mat-icon>` : ""}
      <span>${element.label}</span>
    </button>
    `;
  }

  if (hasMenuParam) {
    code += `</ng-template>`;
  }

  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setTableTemplateArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  if (!object.table) {
    return "";
  }

  const filePath = `${
    object.projectPath
  }/src/app/components/${TextTransformation.kebabfy(
    object.table.id
  )}/${TextTransformation.kebabfy(object.table.id)}.component.html`;

  try {
    fs.writeFileSync(filePath, code);
    console.info(
      `File ${TextTransformation.kebabfy(object.table.id)} already exists.`
    );
    console.info(`File successfully written in ${filePath}.`);
  } catch (error) {
    console.info(
      `File ${TextTransformation.kebabfy(object.table.id)} doesn't exist.`
    );

    try {
      chp.execSync(
        `ng g c components/${TextTransformation.kebabfy(
          object.table.id
        )} --skip-import`,
        { cwd: object.projectPath }
      );
    } catch (error) {
      console.warn(error);
    }

    fs.writeFileSync(filePath, code);

    console.info(`File successfully created in ${filePath}.`);
  }
};

export { setTableTemplate };
