import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

const setChartControllerConstructorParams = (object: MainInterface): string => {
  if (!object.chart) {
    console.info("Only charts set here");
    return ``;
  }

  const code = `
  private _router: Router,
  private _formBuilder: FormBuilder,
  private _activatedRoute: ActivatedRoute,
  private _${object.chart.id}Service: ${TextTransformation.pascalfy(
    object.chart.id
  )}Service,
  private _errorHandler: MyErrorHandler,
  private _snackbar: MatSnackBar,
  private _dialog: MatDialog,
  `;

  return code;
};

export { setChartControllerConstructorParams };
