import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";

const setModelConstructorParams = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const modelName: string = object.form.id.replace("Form", "");
  
  let code = `
  data?: Partial<${TextTransformation.pascalfy(modelName)}>
  `;

  return code;
};

export {
  setModelConstructorParams
};