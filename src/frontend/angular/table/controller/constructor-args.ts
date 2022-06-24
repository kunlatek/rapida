import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

const setTableControllerConstructorArguments = (
  object: MainInterface
): string => {
  if (!object.table) {
    console.info("Only tables set here");
    return ``;
  }

  const code = `
  this.${object.table.id}SearchForm = this._formBuilder.group({
    searchInput: [null, []],
  });
  try {
    this._activatedRoute.params.subscribe(async (routeParams) => {
      this.${object.table.id}Id = routeParams["id"];
    });
  } catch (error: any) {
    const message = this._errorHandler.apiErrorMessage(error.error.message);
    this.sendErrorMessage(message);
  }
  this.set${TextTransformation.pascalfy(object.table.id)}Service();
  `;

  return code;
};

export { setTableControllerConstructorArguments };
