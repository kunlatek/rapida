import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";

const setFormControllerConstructorParams = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const code = `
  private _formBuilder: FormBuilder,
  private _activatedRoute: ActivatedRoute,
  private _router: Router,
  private _snackbar: MatSnackBar,
  private _${object.form.id}Service: ${TextTransformation.pascalfy(
    object.form.id
  )}Service,
  private _errorHandler: MyErrorHandler,
  `;

  return code;
};

export { setFormControllerConstructorParams };