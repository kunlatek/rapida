import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

const setChartControllerConstructorArguments = (
  object: MainInterface
): string => {
  if (!object.chart) {
    console.info("Only charts set here");
    return ``;
  }

  let code = `
  this.set${TextTransformation.pascalfy(object.chart.id)}Service(
      this.mainFilter
  );

  try {
      this._activatedRoute.params.subscribe(async (routeParams) => {
          this.${object.chart.id}Id = routeParams["id"];
      });
  } catch (error: any) {
      const message = this._errorHandler.apiErrorMessage(error.message);
      this._snackBarService.open(message);
  };
  `;

  return code;
};

export { setChartControllerConstructorArguments };
