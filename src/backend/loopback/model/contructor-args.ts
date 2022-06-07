import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";

const setModelConstructorArguments = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const modelName: string = object.form.id.replace("Form", "");
  
  let code = `
  super(data);
  `;

  return code;
};

export {
  setModelConstructorArguments
};