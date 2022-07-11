import { MainInterface } from "../../../interfaces/main";

const setModelConstructorArguments = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let code = `
  super(data);
  `;

  return code;
};

export {
  setModelConstructorArguments
};