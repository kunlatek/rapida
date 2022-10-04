import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";

const setControllerConstructorParams = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const modelName: string = object.form.id.replace("Form", "");


  let code = `
  @service(ChartService) private chartService: ChartService,
  @service(StorageService) private storageService: StorageService,
  @service(${TextTransformation.pascalfy(modelName)}Service) private ${modelName}Service: ${TextTransformation.pascalfy(modelName)}Service,
                                        
  @inject(RestBindings.Http.REQUEST) private httpRequest: Request,
  @inject(RestBindings.Http.RESPONSE) private httpResponse: Response,

  @inject(SecurityBindings.USER, {optional: true}) private currentUser?: UserProfile,
  `;

  return code;
};

export { setControllerConstructorParams };
