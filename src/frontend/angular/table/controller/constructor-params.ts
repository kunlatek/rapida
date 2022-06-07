import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

const setTableControllerConstructorParams = (object: MainInterface): string => {
  if (!object.table) {
    console.info("Only tables set here");
    return ``;
  }

  let code = `
  private _formBuilder: FormBuilder,
  private _activatedRoute: ActivatedRoute,
  private _router: Router,
  private _dialog: MatDialog,
  private _snackbar: MatSnackBar,
  private _errorHandler: MyErrorHandler,
  private _${object.table.id}Service: ${TextTransformation.pascalfy(
    object.table.id
  )}Service,
  `;

  return code;
};

export { setTableControllerConstructorParams };
