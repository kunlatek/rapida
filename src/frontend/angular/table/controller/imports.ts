import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TableElementInterface } from "../../../../interfaces/table";
import { TextTransformation } from "../../../../utils/text.transformation";

let _hasArray: boolean = false;
let _hasDialog: boolean = false;
let _hasRemoveConfirmationDialog: boolean = false;

const setTableControllerImports = (object: MainInterface): string => {
  if (!object.table) {
    console.info("Only tables set here");
    return ``;
  }

  object.table.elements.forEach((element) => {
    verifyTableElement(object, element);
  });

  const code = `
  import { Component, } from "@angular/core";
  import { ActivatedRoute, Router } from "@angular/router";
  import { MatSnackBar } from "@angular/material/snack-bar";
  ${_hasDialog ? `import { MatDialog } from "@angular/material/dialog";` : ``}
  ${
    _hasRemoveConfirmationDialog
      ? `import { RemoveConfirmationDialogComponent } from "../remove-confirmation-dialog/remove-confirmation-dialog.component";`
      : ``
  }
  import exportFromJSON from "export-from-json";
  import { MyErrorHandler } from "../../utils/error-handler";
  import { ${TextTransformation.pascalfy(
    object.table.id
  )}Service } from "./${TextTransformation.kebabfy(object.table.id)}.service";
  import { FormBuilder, FormGroupDirective, FormGroup, ${
    _hasArray ? `FormArray,` : ``
  } } from "@angular/forms";
  `;

  return code;
};

const verifyTableElement = (
  object: MainInterface,
  element: TableElementInterface
) => {
  if (!object.table) {
    console.info("Only tables set here");
    return ``;
  }

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
