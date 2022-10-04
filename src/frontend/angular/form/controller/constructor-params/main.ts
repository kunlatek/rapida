import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";

const setFormControllerConstructorParams = (
  object: MainInterface
): string => {
  if (!object.form) {
    return "";
  }

  const objectId = object.form.id;
  const objectIdPascal = TextTransformation.pascalfy(object.form.id);

  const code = `
  private _formBuilder: FormBuilder,
  private _activatedRoute: ActivatedRoute,
  private _router: Router,
  private _snackbar: MatSnackBar,
  private _${objectId}Service: ${objectIdPascal}Service,
  private _errorHandler: MyErrorHandler,
  `;

  return code;
};

export {
  setFormControllerConstructorParams
};
