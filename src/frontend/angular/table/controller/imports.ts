import { MainInterface } from "../../../../interfaces/main";
import { TableElementInterface } from "../../../../interfaces/table";
import { TextTransformation } from "../../../../utils/text.transformation";

let _hasArray: boolean = false;
let _hasDialog: boolean = false;
let _hasRemoveConfirmationDialog: boolean = false;

const setTableControllerImports = ({ table }: MainInterface): string => {
  if (!table) {
    console.info("Only tables set here");
    return ``;
  }

  const hasInfiniteScroll = table.infiniteScroll;

  table.elements.forEach((element) => {
    verifyTableElement(element);
  });

  const code = `
  import { Component, ViewChild, OnInit } from "@angular/core";
  import { ActivatedRoute, Router } from "@angular/router";
  import { MatSnackBar } from "@angular/material/snack-bar";
  import { MyErrorHandler } from "../../utils/error-handler";
  ${_hasDialog ? `import { MatDialog } from "@angular/material/dialog";` : ``}
  ${_hasRemoveConfirmationDialog
      ? `import { RemoveConfirmationDialogComponent } from "../remove-confirmation-dialog/remove-confirmation-dialog.component";`
      : ``
    }
  import { ${TextTransformation.pascalfy(
      table.id
    )}Service } from "./${TextTransformation.kebabfy(table.id)}.service";
  import { FormBuilder, FormGroupDirective, FormGroup, ${_hasArray ? `FormArray,` : ``
    } } from "@angular/forms";
  ${hasInfiniteScroll ?
      `import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
      import { MatSort } from "@angular/material/sort";
      import { distinctUntilChanged, map } from "rxjs/operators";
      import { InfiniteScrollTableDataSource } from "./${TextTransformation.kebabfy(table.id)}-infinite-scroll.service";` : ''} 
  `;

  return code;
};

const verifyTableElement = (element: TableElementInterface) => {
  let code = ``;

  if (element.row.menu) {
    element.row.menu.forEach((menuElement) => {
      if (menuElement.dialog) {
        _hasDialog = true;
        if (menuElement.dialog?.id === "removeConfirmationDialog") {
          _hasRemoveConfirmationDialog = true;
        }
      }
    });
  }

  return code;
};

export { setTableControllerImports };
