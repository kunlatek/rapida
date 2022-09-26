import { FormInputTypeEnum } from "../../../enums/form";
import { FormElementInterface } from "../../../interfaces/form";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";

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

import { getAllElements } from "../main";

const setControllerMethods = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const modelName: string = object.form.id.replace("Form", "");

  let _propertiesRelatedFind: string = ``;
  let _storageFile: string = ``;

  const elements: Array<FormElementInterface> = getAllElements(object.form?.elements);

  elements.forEach((element) => {
    _storageFile += setStorageFileByElement(object, element);
  });

  let code = `
  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(modelName)}', action: 'createOne'}})
  @post('/${TextTransformation.plurarize(TextTransformation.kebabfy(modelName))}')
  @response(201, {
    description: '${TextTransformation.pascalfy(modelName)} model instance',
    properties: {
      'statusCode': {type: 'number', default: 200},
      'message': {type: 'string'},
      'tokens': {
        type: 'array',
        items: {
          properties: {
            'authToken': {type: 'string'},
            'refreshAuthToken': {type: 'string'},
          }
        }
      },
      'data': {
        properties: ${setRequestBodyContent(object)}
      }
    }
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            properties: ${setRequestBodyContent(object)}
          },
        },
      },
    }) data: any,
    @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
  
          const createdBy = this.currentUser?.[securityId] as string;
          const ownerId = this.currentUser?.ownerId as string;
          const dataWithoutNullProperties = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
          
          ${_storageFile}
          ${setStorageFileInArrayType(object)}
      
          const dataCreated = await ${TextTransformation.pascalfy(modelName)}Schema.create({
            ...dataWithoutNullProperties, 
            _createdBy: createdBy, 
            _ownerId: ownerId
          });
          
          const tokens = await Autentikigo.refreshToken(this.httpRequest.headers.authorization!)

          return HttpResponseToClient.createHttpResponse({
              data: dataCreated,
              tokens,
              locale,
              request: this.httpRequest,
              response: this.httpResponse,
          })
  
      } catch (err: any) {
  
          return HttpResponseToClient.badRequestErrorHttpResponse({
              logMessage: err.message,
              locale,
              request: this.httpRequest,
              response: this.httpResponse,
          })
  
      }
  }
  
  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(modelName)}', action: 'read'}})
  @get('/${TextTransformation.plurarize(TextTransformation.kebabfy(modelName))}')
  @response(200, {
    description: 'Array of ${TextTransformation.pascalfy(modelName)} model instances',
    properties: {
      'statusCode': {type: 'number', default: 200},
      'message': {type: 'string'},
      'tokens': {
        type: 'array',
        items: {
          properties: {
            'authToken': {type: 'string'},
            'refreshAuthToken': {type: 'string'},
          }
        }
      },
      'data': {
        properties: {
          total: {type: 'number'},
          result: {
            type: 'array',
            items: {
              properties: ${setRequestBodyContent(object)}
            }
          }
        }
      }
    }
  })
  async find(
      @param.query.string('filters') filters?: string,
      @param.query.number('limit') limit?: number,
      @param.query.number('page') page?: number,
      @param.query.string('order_by') orderBy?: string,
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
          let and = [{ _deletedAt: null }]
          if (filters) and.push(JSON.parse(filters))

          const result = await ${TextTransformation.pascalfy(modelName)}Schema
            .find({"$and": and})
            .limit(limit || 100)
            .skip((limit || 100) * (page || 0))
            .sort(orderBy ? { [orderBy]: -1 } : { _createdAt: -1 })
            ${setDeepPopulate(object)};

          const total = await ${TextTransformation.pascalfy(modelName)}Schema.countDocuments({"$and": and});

          const tokens = await Autentikigo.refreshToken(this.httpRequest.headers.authorization!)

          return HttpResponseToClient.okHttpResponse({
              data: {total: total, result},
              tokens,
              locale,
              request: this.httpRequest,
              response: this.httpResponse,
          })
  
      } catch (err: any) {
  
          return HttpResponseToClient.badRequestErrorHttpResponse({
              logMessage: err.message,
              locale,
              request: this.httpRequest,
              response: this.httpResponse,
          })
  
      }
  }
  
  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(modelName)}', action: 'readOne'}})
  @get('/${TextTransformation.plurarize(TextTransformation.kebabfy(modelName))}/{id}')
  @response(200, {
    description: '${TextTransformation.pascalfy(modelName)} model instance',
    properties: {
      'statusCode': {type: 'number', default: 200},
      'message': {type: 'string'},
      'tokens': {
        type: 'array',
        items: {
          properties: {
            'authToken': {type: 'string'},
            'refreshAuthToken': {type: 'string'},
          }
        }
      },
      'data': {
        properties: ${setRequestBodyContent(object)}
      }
    }
  })
  async findById(
      @param.path.string('id') id: string,
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
  
          let data = await ${TextTransformation.pascalfy(modelName)}Schema.findById(id)
          ${setDeepPopulate(object)}
          
          if (!data) throw new Error(serverMessages['httpResponse']['notFoundError'][locale ?? LocaleEnum['pt-BR']]);

          const tokens = await Autentikigo.refreshToken(this.httpRequest.headers.authorization!)
      
          return HttpResponseToClient.okHttpResponse({
              data,
              tokens,
              locale,
              request: this.httpRequest,
              response: this.httpResponse,
          })
  
      } catch (err: any) {
  
          return HttpResponseToClient.badRequestErrorHttpResponse({
              logMessage: err.message,
              locale,
              request: this.httpRequest,
              response: this.httpResponse,
          })
  
      }
  }
  
  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(modelName)}', action: 'updateOne'}})
  @put('/${TextTransformation.plurarize(TextTransformation.kebabfy(modelName))}/{id}')
  @response(200, {description: '${TextTransformation.pascalfy(modelName)} PUT success'})
  async updateById(
      @param.path.string('id') id: string,
      @requestBody({
        content: {
          'application/json': {
            schema: {
              properties: ${setRequestBodyContent(object)}
            },
          },
        },
      }) data: any,
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
          
          const dataWithoutNullProperties = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
          
          ${_storageFile}
          ${setStorageFileInArrayType(object)}
  
          await ${TextTransformation.pascalfy(modelName)}Schema.findByIdAndUpdate(id, dataWithoutNullProperties);
          
          const tokens = await Autentikigo.refreshToken(this.httpRequest.headers.authorization!)
      
          return HttpResponseToClient.noContentHttpResponse({
              tokens,
              locale,
              request: this.httpRequest,
              response: this.httpResponse,
          })
  
      } catch (err: any) {
  
          return HttpResponseToClient.badRequestErrorHttpResponse({
              logMessage: err.message,
              locale,
              request: this.httpRequest,
              response: this.httpResponse,
          })
  
      }
  }
  
  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(modelName)}', action: 'updateOne'}})
  @patch('/${TextTransformation.plurarize(TextTransformation.kebabfy(modelName))}/{id}')
  @response(200, {description: '${TextTransformation.pascalfy(modelName)} PATCH success'})
  async partialUpdateById(
      @param.path.string('id') id: string,
      @requestBody({
        content: {
          'application/json': {
            schema: {
              properties: ${setRequestBodyContent(object)}
            },
          },
        },
      }) data: any,
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
          
          const dataWithoutNullProperties = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
          
          ${_storageFile}
          ${setStorageFileInArrayType(object)}

          await ${TextTransformation.pascalfy(modelName)}Schema.findByIdAndUpdate(id, dataWithoutNullProperties);

          const tokens = await Autentikigo.refreshToken(this.httpRequest.headers.authorization!)
      
          return HttpResponseToClient.noContentHttpResponse({
              tokens,
              locale,
              request: this.httpRequest,
              response: this.httpResponse,
          })
  
      } catch (err: any) {
  
          return HttpResponseToClient.badRequestErrorHttpResponse({
              logMessage: err.message,
              locale,
              request: this.httpRequest,
              response: this.httpResponse,
          })
  
      }
  }
  
  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(modelName)}', action: 'deleteOne'}})
  @del('/${TextTransformation.plurarize(TextTransformation.kebabfy(modelName))}/{id}')
  @response(204, {description: 'Project DELETE success'})
  async deleteById(
      @param.path.string('id') id: string,
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
  
          await ${TextTransformation.pascalfy(modelName)}Schema.findByIdAndUpdate(id, {_deletedAt: new Date()});

          const tokens = await Autentikigo.refreshToken(this.httpRequest.headers.authorization!)

          return HttpResponseToClient.noContentHttpResponse({
              tokens,
              locale,
              request: this.httpRequest,
              response: this.httpResponse,
          })
  
      } catch (err: any) {
  
          return HttpResponseToClient.badRequestErrorHttpResponse({
              logMessage: err.message,
              locale,
              request: this.httpRequest,
              response: this.httpResponse,
          })
  
      }
  }

  /*
  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(modelName)}', action: 'read'}})
  @get('/${TextTransformation.plurarize(TextTransformation.kebabfy(modelName))}/chart')
  @response(200, {
    description: 'Chart label and data',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'Label and data',
          properties: {
            datasets: {
              properties: {
                label: {type: 'array', items: {type: 'string'}},
                data: {type: 'array', items: {type: 'number'}},
              }
            }
          },
        },
      },
    },
  })
  async chart(
    @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
    try {
      const result = await this.repository.find({
        where: {_deletedAt: {eq: null}},
        include: [${_propertiesRelatedFind}],
      });

      const data = await this.chartService.getChartDatasets(result, this.httpRequest.url);

      const tokens = await Autentikigo.refreshToken(this.httpRequest.headers.authorization!)
      
      return HttpResponseToClient.okHttpResponse({
        data,
        tokens,
        locale,
        request: this.httpRequest,
        response: this.httpResponse,
      });
    } catch (err: any) {
      return HttpResponseToClient.badRequestErrorHttpResponse({
        logMessage: err.message,
        locale,
        request: this.httpRequest,
        response: this.httpResponse,
      });
    }
  }

  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(modelName)}', action: 'read'}})
  @get('/${TextTransformation.plurarize(TextTransformation.kebabfy(modelName))}/chart/details')
  @response(200, {
      description: 'Chart details',
      content: {
          'application/json': {
              schema: {
                  type: 'object',
                  title: 'Chard data details',
                  properties: {
                      data: {type: 'array', items: {type: 'any'}},
                  },
              },
          },
      },
  })
  async chartDetails(
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
    try {
      const result = await this.repository.find({
        where: {_deletedAt: {eq: null}},
        include: [${_propertiesRelatedFind}],
      });

      const data = await this.chartService.getChartDetails(result, this.httpRequest.url);

      const tokens = await Autentikigo.refreshToken(this.httpRequest.headers.authorization!)

      return HttpResponseToClient.okHttpResponse({
        data,
        tokens,
        locale,
        request: this.httpRequest,
        response: this.httpResponse,
      });
    } catch (err: any) {
      return HttpResponseToClient.badRequestErrorHttpResponse({
        logMessage: err.message,
        locale,
        request: this.httpRequest,
        response: this.httpResponse,
      });
    }
  }
  */
  `;

  return code;
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
      if(data.${value.name}){
        for (let fileIndex = 0; fileIndex < data.${value.name}!.length; fileIndex++) {
          const file = data.${value.name}![fileIndex];
          if(!file.url){
            const url = await this.storageService.uploadFiles('${TextTransformation.kebabfy(modelName)}', file)
            data.${value.name}![fileIndex] = {
              name: file.fileName,
              url
            }
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
                if(${TextTransformation.singularize(relatedId)}.${elementValue.name}){
                  for (let fileIndex = 0; fileIndex < ${TextTransformation.singularize(relatedId)}.${elementValue.name}!.length; fileIndex++) {
                    const file = ${TextTransformation.singularize(relatedId)}.${elementValue.name}![fileIndex];
                    if(!file.url){
                      const url = await this.storageService.uploadFiles('${TextTransformation.kebabfy(modelName)}', file)
                      ${TextTransformation.singularize(relatedId)}.${elementValue.name}![fileIndex] = {
                        name: file.fileName,
                        url
                      }
                    }
                  }
                }
              `;

            } else if (elementProperty.array) {
              _storageFileToReturn +=
                `
                for(
                  let ${elementProperty.array?.id}Index = 0; 
                  ${elementProperty.array?.id}Index < ${TextTransformation.singularize(relatedId)}?.${elementProperty.array?.id}?.length!; 
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

const setRequestBodyContent = (object: MainInterface): string => {
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

  return `{ ${createProperties(elements)} }`;
};

const setDeepPopulate = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let _deepPopulate = ``;
  let hasPopulatedField: boolean = false;

  const deepPopulate = (elements: Array<FormElementInterface>) => {
    let _deepPopulateCode = ``;

    elements.forEach((element) => {
      const type = Object.keys(element)[0];
      const value = Object.values(element)[0];

      if (value.optionsApi) {
        hasPopulatedField = true;

        _deepPopulateCode += `
          {path: '${value.name}'},`;
      } else if (type === 'array') {

        _deepPopulateCode += `
          {
            path: '${value.id}',
            populate: [
              ${deepPopulate(value.elements)}
            ]
          },`;
      }
    });

    return _deepPopulateCode;
  };

  const elements: Array<FormElementInterface> = getAllElements(object.form.elements);

  _deepPopulate += deepPopulate(elements);

  return hasPopulatedField ?
    `.populate([
      ${_deepPopulate}
    ])
    `
    : '';
};

export { setControllerMethods };
