import { MainInterface } from "../../../../interfaces/main";
import { TableElementInterface } from "../../../../interfaces/table";
import { TextTransformation } from "../../../../utils/text.transformation";

let _hasDialog = false;
let _hasRemoveConfirmationDialog = false;

const setTableControllerConstructorParams = (object: MainInterface): string => {
  if (!object.table) {
    console.info("Only tables set here");
    return ``;
  }

  object.table.elements.forEach((element) => {
    verifyTableElement(object, element);
  });

  const code = `
  private _formBuilder: FormBuilder,
  private _activatedRoute: ActivatedRoute,
  private _router: Router,
  ${_hasDialog ? `private _dialog: MatDialog,` : ``}
  private _snackbar: MatSnackBar,
  private _errorHandler: MyErrorHandler,
  private _${object.table.id}Service: ${TextTransformation.pascalfy(
    object.table.id
  )}Service,
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

  const code = ``;

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

export { setTableControllerConstructorParams };
