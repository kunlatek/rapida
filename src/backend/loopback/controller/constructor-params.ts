import { FormElementInterface } from "../../../interfaces/form";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";

const setControllerConstructorParams = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const modelName: string = object.form.id.replace("Form", "");

  let _relatedProperties = ``;
  object.form.elements.forEach((element) => {
    _relatedProperties += setRelatedPropertiesByElement(object, element);
  });
  let code = `
  @repository(${TextTransformation.pascalfy(
    modelName
  )}Repository) public repository: ${TextTransformation.pascalfy(
    modelName
  )}Repository,
                                        
  @inject(RestBindings.Http.REQUEST) private httpRequest: Request,
  @inject(RestBindings.Http.RESPONSE) private httpResponse: Response,

  ${_relatedProperties}
  @inject(SecurityBindings.USER, {optional: true}) private currentUser?: UserProfile,
  `;

  return code;
};

const setRelatedPropertiesByElement = (
  object: MainInterface,
  element: FormElementInterface
) => {
  const validTypes = [
    "checkbox",
    "radio",
    "datalist",
    "fieldset",
    "input",
    "select",
    "slide",
    "textarea",
    "autocomplete",
  ];
  const modelName = object.form!.id.replace("Form", "");
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  let code = ``;

  if (validTypes.includes(type)) {
    if (value.optionsApi) {
      const className = TextTransformation.setIdToClassName(
        TextTransformation.pascalfy(
          TextTransformation.singularize(
            value.optionsApi.endpoint.split("-").join(" ")
          )
        )
      );

      if (value.isMultiple) {
        code += createProperties(modelName, className);
      }
    }
  } else if (type === "tabs") {
    element.tabs?.forEach((tab) => {
      tab.elements.forEach(tabElement => {        
        code += setRelatedPropertiesByElement(
          object, tabElement
        );
      });  
    });
  }

  return code;
};

const createProperties = (
  mainProperty: string,
  secondProperty: string
): string => {
  const mainPropertyPascalfy =
    mainProperty.charAt(0).toUpperCase() + mainProperty.slice(1);

  return `
      @repository(${mainPropertyPascalfy}Has${secondProperty}Repository)
      private ${mainProperty}Has${secondProperty}Repository: ${mainPropertyPascalfy}Has${secondProperty}Repository, 
  `;
};

export { setControllerConstructorParams };
