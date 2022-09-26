import { MainInterface } from "../../../interfaces/main";

const setControllerConstructorParams = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }


  let code = `
  @service(ChartService) private chartService: ChartService,
  @service(StorageService) private storageService: StorageService,
                                        
  @inject(RestBindings.Http.REQUEST) private httpRequest: Request,
  @inject(RestBindings.Http.RESPONSE) private httpResponse: Response,

  @inject(SecurityBindings.USER, {optional: true}) private currentUser?: UserProfile,
  `;

  return code;
};

export { setControllerConstructorParams };
