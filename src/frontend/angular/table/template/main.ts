import { RequestTypeEnum } from "../../../../enums/request";
import { MainInterface } from "../../../../interfaces/main";
import {
  RowMenuElementInterface,
  TableElementInterface,
  TableInterface
} from "../../../../interfaces/table";
import { TextTransformation } from "../../../../utils/text.transformation";
import { FileType } from "../../core/file-type";
import { writeToFile } from "../../core/write-to-file";

/**
 * SET CODE
 * @param object
 * @returns
 */
const setTableTemplate = ({ table, projectPath }: MainInterface): string => {
  if (!table) {
    console.info("Only tables set here");
    return ``;
  }

  const hasInfiniteScroll = table.infiniteScroll;
  let _specificStructure: string = "";
  let _specificStructureOverMenu: string = "";

  const hasTableTitle = table.title
    ? `<mat-card-title>${table.title}</mat-card-title>`
    : "";

  const hasTableSubtitle = table.subtitle
    ? `<mat-card-subtitle>${table.subtitle}</mat-card-subtitle>`
    : "";

  table?.elements.forEach((element) => {
    _specificStructure += setSpecificStructureOverTableElement(table, element);
    _specificStructureOverMenu += setSpecificStructureOverRowMenu(
      table,
      element
    );
  });

  let code = `
  <mat-card>
    <mat-card-header>
      ${hasTableTitle}
      ${hasTableSubtitle}
    </mat-card-header>

    <mat-card-actions>
      <div class="flex-row">
        <form id="${table.id}" #${table.id}Directive="ngForm" 
        [formGroup]="${table.id}SearchForm" 
        (ngSubmit)="_setFiltersParams()">
          <mat-form-field appearance="standard">
            <mat-label>Filtro</mat-label>
            <input matInput formControlName="searchInput" 
            placeholder="Procure qualquer coisa">
          </mat-form-field>
          <button mat-raised-button color="primary">
            <mat-icon>search</mat-icon> Filtrar
          </button>
        </form>
        ${table.fieldsToLabels || table.formIdToFieldsToLabels
      ? `
      <button mat-raised-button color="primary" (click)="createXls()">
        <mat-icon>format_list_bulleted</mat-icon>
        Baixar XLS
      </button>
      `
      : ``
    }
      </div>
    </mat-card-actions>

    <mat-card-content class="${hasInfiniteScroll ? '' : 'table-container'}">
    ${hasInfiniteScroll
      ? `<cdk-virtual-scroll-viewport #viewPort
                             [itemSize]="ITEM_SIZE"
                             matSort>`
      : ""
    }
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" *ngIf="!isLoading">
      ${_specificStructure}    
      <tr mat-header-row *matHeaderRowDef="${table.id}DisplayedColumns${hasInfiniteScroll ? ";sticky: true" : ""
    }" ${hasInfiniteScroll ? '[style.top.px]="offset"' : ""}></tr>
      <tr mat-row *matRowDef="let row; columns: ${table.id
    }DisplayedColumns;"></tr>                                        
    </table>
    ${hasInfiniteScroll ? `</cdk-virtual-scroll-viewport>` : ""}
    <div 
      style="width: 100%; height: 100px; display: flex; align-items: center; justify-content: center; color: #c9c9c9"
      *ngIf="${hasInfiniteScroll
      ? "!this.dataSource.matTableDataSource.data.length"
      : "!this.dataSource.length"
    } && !isLoading">
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

  writeToFile({
    id: table.id,
    projectPath: projectPath,
    code,
    type: FileType.TEMPLATE,
  });

  return code;
};

const setSpecificStructureOverTableElement = (
  table: TableInterface,
  element: TableElementInterface
): string => {
  if (!table) {
    console.info("Only tables set here");
    return ``;
  }

  let columnContent = "";
  let code = ``;

  if (element.row.menu) {
    columnContent = `
    <button mat-icon-button class="icon" aria-label="${TextTransformation.pascalfy(
      table.id
    )}" [matMenuTriggerFor]="${table?.id
      }Menu"  [matMenuTriggerData]="{element: element}">
      <mat-icon>${element.row.icon}</mat-icon>
    </button>
    `;
  }

  if (!element.row.menu) {
    if (element.row.fieldProperties) {
      element.row.fieldProperties.forEach((property: string, index: number) => {
        columnContent += `
        ${index > 0 ? " | " : ""}{{element.${element.row.field}.${property}}}
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
    <th mat-header-cell *matHeaderCellDef ${table.infiniteScroll ? '[style.top.px]="offset"' : ""
    }> ${element.column.label} </th>
    <td mat-cell *matCellDef="let element"> ${columnContent} </td>
  </ng-container>
  `;

  return code;
};

const setSpecificStructureOverRowMenu = (
  table: TableInterface,
  element: TableElementInterface
): string => {
  const menuArray: Array<RowMenuElementInterface> = [];
  let code = ``;

  if (element.row.menu) {
    element.row.menu.forEach((menuElement) => {
      menuArray.push(menuElement);
    });

    code += `
    <mat-menu #${table?.id}Menu="matMenu">
      ${setSpecificStructureOverRowMenuItems(menuArray)}
    </mat-menu>
    `;
  }

  return code;
};

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
      menuButtonAction = `[routerLink]="['${element.action.url}'${element.action.param ? ", " + element.action.param : ""
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

export { setTableTemplate };
