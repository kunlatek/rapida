import { MainInterface } from "../../../interfaces/main";

const setServiceConstructorParams = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let code = `
  @service(StorageService) private storageService?: StorageService,
  `;

  return code;
};

export { setServiceConstructorParams };
