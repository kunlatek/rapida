import { FormInputTypeEnum } from "../../../enums/form";
import { FormElementInterface } from "../../../interfaces/form";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";
import { getAllElements } from "../main";

const setServiceMethods = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let _storageFile: string = ``;

  const elements: Array<FormElementInterface> = getAllElements(object.form?.elements);

  elements.forEach((element) => {
    _storageFile += setStorageFileByElement(object, element);
  });

  let code = `
    public getSwaggerSchema(): import("@loopback/rest").SchemaObject | import("@loopback/rest").ReferenceObject {
        return ${setSwaggerSchema(object)}
    }

    public swaggerRequestBody() {
        const swaggerObject = this.getSwaggerSchema()

        return {
        content: {
            'multipart/form-data': {
            // Skip body parsing
            'x-parser': 'stream',
            // 'application/json': {
            schema: swaggerObject,
            },
        },
        }
    }

    public swaggerResponseData(description: string, statusCode: number) {
        const swaggerObject = this.getSwaggerSchema()

        return {
            description,
            properties: {
                'statusCode': { type: 'number', default: statusCode },
                'message': { type: 'string' },
                'tokens': {
                    type: 'array',
                    items: {
                        properties: {
                            'authToken': { type: 'string' },
                            'refreshAuthToken': { type: 'string' },
                        }
                    }
                },
                'data': swaggerObject,
            }
        }
    }

    public async manageFiles(data: any, bodyAndFiles: any){

        ${_storageFile}
        ${setStorageFileInArrayType(object)}

        return data
    }
    `;

  return code;
};

const stringTypes = [
  "email",
  "password",
  "tel",
  "text",
  "url",
  "date",
  "datetime-local",
  "month",
  "range",
  "time",
  "url",
  "week",
];
const numberTypes = ["number"];

const booleanTypes = ["slide"];

const setSwaggerSchema = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const createProperties = (
    elements: Array<FormElementInterface>
  ): string => {

    let code = ``;

    for (let elementIndex = 0; elementIndex < elements.length; elementIndex++) {
      const element = elements[elementIndex];

      const type = Object.keys(element)[0];
      const value = Object.values(element)[0];


      const propertyType = value.isMultiple || type === 'array' || value.type === 'file' ?
        'array' :
        (
          stringTypes.includes(value.type || type) ? 'string' :
            (
              numberTypes.includes(value.type || type) ? 'number' :
                (booleanTypes.includes(value.type || type) ? 'boolean' : 'any')
            )
        );

      if (value.isMultiple || value.type === 'file') {

        code += `
          ${value.name}: {
            type: 'array',
            items: ${value.isRequired ? `{ type: '${value.type === 'file' ? 'object' : 'string'}' }` : '{}'}
          },
        `;

      } else if (propertyType === 'array') {

        code += `
          ${value.id}: {
            type: 'array',
            items: {
              properties: {
                ${createProperties(value.elements)}
              }
            }
          },
        `;

      } else {

        code += `
          ${value.name}: ${value.isRequired ? `{ type: '${propertyType}' }` : `{}`},
        `;

      }
    }

    return code;
  };

  const elements: Array<FormElementInterface> = getAllElements(object.form.elements);

  return `{ properties: { ${createProperties(elements)} } }`;
};

const setStorageFileByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  let code = ``;

  const modelName: string = object.form!.id.replace("Form", "");
  const value = Object.values(element)[0];

  if (value.type === FormInputTypeEnum.File) {
    code += `
      data.${value.name} = [
        ...(data.${value.name} || []),
        ...(await this.storageService!.getFilesByFieldname(bodyAndFiles.files || [], '${value.name}') || []),
      ]
      for (let fileIndex = 0; fileIndex < data.${value.name}?.length || 0; fileIndex++) {
        const file = data.${value.name}![fileIndex];
        if(!file.url){
          const url = await this.storageService!.uploadBufferFiles('${TextTransformation.kebabfy(modelName)}', file)
          data.${value.name}![fileIndex] = {
            name: file.originalname,
            url
          }
        }
      }
    `;
  }

  return code;
};

const setStorageFileInArrayType = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const modelName: string = object.form!.id.replace("Form", "");

  let _findRelatedElements = ``;

  let hasFileInArrayType: boolean = false;

  const elements: Array<FormElementInterface> = getAllElements(object.form.elements);

  elements.forEach((element) => {
    const type = Object.keys(element)[0];
    if (type === 'array') {
      const value = Object.values(element)[0];

      const createMultidimensionalArrayStorageFileCode = (
        elements: Array<FormElementInterface>,
        relatedId: string,
      ) => {

        let _storageFileToReturn = ``;
        elements?.forEach((elementProperty: FormElementInterface) => {

          const elementValue = Object.values(elementProperty)[0];

          if (elementValue.type === FormInputTypeEnum.File || elementProperty.array) {

            if (elementValue.type === FormInputTypeEnum.File) {
              hasFileInArrayType = true;

              _storageFileToReturn += `
                ${TextTransformation.singularize(relatedId)}.${elementValue.name} = [
                  ...(${TextTransformation.singularize(relatedId)}.${elementValue.name} || []),
                  ...(await this.storageService!.getFilesByFieldname(bodyAndFiles.files || [], '${elementValue.name}') || []),
                ]
                for (let fileIndex = 0; fileIndex < ${TextTransformation.singularize(relatedId)}.${elementValue.name}!.length; fileIndex++) {
                  const file = ${TextTransformation.singularize(relatedId)}.${elementValue.name}![fileIndex];
                  if(!file.url){
                    const url = await this.storageService!.uploadBufferFiles('${TextTransformation.kebabfy(modelName)}', file)
                    ${TextTransformation.singularize(relatedId)}.${elementValue.name}![fileIndex] = {
                      name: file.originalname,
                      url
                    }
                  }
                }
              `;

            } else if (elementProperty.array) {
              _storageFileToReturn +=
                `
                for(
                  let ${elementProperty.array?.id}Index = 0; 
                  ${elementProperty.array?.id}Index < ${TextTransformation.singularize(relatedId)}?.${elementProperty.array?.id}?.length || 0; 
                  ${elementProperty.array?.id}Index++
                ){
                  
                  const ${TextTransformation.singularize(elementProperty.array?.id)} = ${TextTransformation.singularize(relatedId)}?.${elementProperty.array?.id}![${elementProperty.array?.id}Index];
                  
                  ${createMultidimensionalArrayStorageFileCode(elementProperty.array?.elements!, elementProperty.array?.id!)}
                };
              `;
            }
          }
        });

        return _storageFileToReturn;
      };

      _findRelatedElements +=
        `
        for(let ${value.id}Index = 0; ${value.id}Index < data.${value.id}?.length!; ${value.id}Index++){
          const ${TextTransformation.singularize(value.id)} = data.${value.id}![${value.id}Index];
          
          ${createMultidimensionalArrayStorageFileCode(value.elements, value.id)}
        }
      `;
    }
  });

  return hasFileInArrayType ? _findRelatedElements : '';
};

export {
  setServiceMethods,
};

