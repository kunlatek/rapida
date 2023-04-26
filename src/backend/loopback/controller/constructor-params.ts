import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";

const setControllerConstructorParams = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const entityName: string = object.form.id.replace("Form", "");
  const modelName: string = TextTransformation.pascalfy(entityName);


  let code = `
  @inject(RestBindings.Http.REQUEST) private httpRequest: Request,
  @inject(RestBindings.Http.RESPONSE) private httpResponse: Response,

  @repository(${modelName}Repository) private ${entityName}Repository: I${modelName}Repository,

  @inject(SecurityBindings.USER, {optional: true}) private user?: UserProfile,
  `;

  return code;
};

export { setControllerConstructorParams };
