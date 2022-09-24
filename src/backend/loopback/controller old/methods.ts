import { FormInputTypeEnum } from "../../../enums/form";
import { FormElementInterface } from "../../../interfaces/form";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";
import { getAllElements } from "../main";

const setGetRelatedElementsInArrayType = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let _findRelatedElements = ``;

  const elements: Array<FormElementInterface> = getAllElements(object.form.elements);

  elements.forEach((element) => {
    const type = Object.keys(element)[0];
    const value = Object.values(element)[0];

    if (value.optionsApi) {
      const parentCollection = TextTransformation.setIdToClassName(TextTransformation.pascalfy(TextTransformation.singularize(value.optionsApi.endpoint?.split('-').join(' ') || '')));

      _findRelatedElements +=
        `
        data.${value.name} = 
        ${value.isMultiple ?
          `await getRelatedElements('${parentCollection}', data?.${value.name} || [])`
          :
          `await getRelatedElement('${parentCollection}', data?.${value.name})`
        }
      `;
    } else if (type === 'array') {

      const createMultidimensionalArrayFindRelatedCode = (
        elements: Array<FormElementInterface>,
        relatedId: string,
        isFirstArray: boolean,
      ) => {

        let _findRelatedElementsToReturn = ``;
        elements?.forEach((elementProperty: FormElementInterface) => {

          const relatedValue = Object.values(elementProperty)[0];

          if (relatedValue.optionsApi || elementProperty.array) {

            if (relatedValue.optionsApi) {
              const collection = TextTransformation.setIdToClassName(TextTransformation.pascalfy(TextTransformation.singularize(relatedValue.optionsApi.endpoint?.split('-').join(' ') || '')));

              _findRelatedElementsToReturn +=
                `
                ${TextTransformation.singularize(relatedId)}.${relatedValue.name} = 
                ${relatedValue.isMultiple ?
                  `await getRelatedElements('${collection}', ${isFirstArray ? 'data' : TextTransformation.singularize(relatedId)}?.${relatedValue.name} || [])`
                  :
                  `await getRelatedElement('${collection}', ${isFirstArray ? 'data' : TextTransformation.singularize(relatedId)}?.${relatedValue.name})`
                }
              `;
            } else if (elementProperty.array) {
              _findRelatedElementsToReturn +=
                `
                for(
                  let ${elementProperty.array?.id}Index = 0; 
                  ${elementProperty.array?.id}Index < ${TextTransformation.singularize(relatedId)}?.${elementProperty.array?.id}?.length!; 
                  ${elementProperty.array?.id}Index++
                ){
                  
                  const ${TextTransformation.singularize(elementProperty.array?.id)} = ${TextTransformation.singularize(relatedId)}?.${elementProperty.array?.id}![${elementProperty.array?.id}Index];
                  
                  ${createMultidimensionalArrayFindRelatedCode(elementProperty.array?.elements!, elementProperty.array?.id!, false)}
                };
              `;
            }
          }
        });

        return _findRelatedElementsToReturn;
      };

      _findRelatedElements +=
        `
        for(let ${value.id}Index = 0; ${value.id}Index < data.${value.id}?.length!; ${value.id}Index++){
          const ${TextTransformation.singularize(value.id)} = data.${value.id}![${value.id}Index];
          
          ${createMultidimensionalArrayFindRelatedCode(value.elements, value.id, false)}
        }
      `;
    }
  });

  return _findRelatedElements;
};

const setControllerMethods = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const modelName: string = object.form.id.replace("Form", "");

  let _propertiesRelatedFind: string = ``;
  let _createRelated: string = ``;
  let _deleteRelated: string = ``;
  let _storageFile: string = ``;

  const elements: Array<FormElementInterface> = getAllElements(object.form?.elements);

  elements.forEach((element) => {
    _propertiesRelatedFind += setPropertiesToFindByElement(element);
    _createRelated += setCreateAllMethodsByElement(object, element);
    _deleteRelated += setDeleteAllMethodsByElement(object, element);
    _storageFile += setStorageFileByElement(object, element);
  });

  let code = `
  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(
    modelName
  )}', action: 'createOne'}})
  @post('/${TextTransformation.plurarize(
    TextTransformation.kebabfy(modelName)
  )}')
  @response(200, {
      description: '${TextTransformation.pascalfy(modelName)} model instance',
      properties: HttpDocumentation.createDocResponseSchemaForFindOneResult(${TextTransformation.pascalfy(
    modelName
  )})
  })
  async create(
      @requestBody({
          content: HttpDocumentation.createDocRequestSchema(${TextTransformation.pascalfy(
    modelName
  )})
      }) data: ${TextTransformation.pascalfy(modelName)},
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
  
          const createdBy = this.currentUser?.[securityId] as string;
          const ownerId = this.currentUser?.ownerId as string;
          const dataWithoutNullProperties = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
          
          ${_storageFile}
          ${setStorageFileInArrayType(object)}
      
          const dataCreated = await this.repository.create({...dataWithoutNullProperties, _createdBy: createdBy, _ownerId: ownerId});
          
          // const dataToWorkInRelation = data;
          // const idToWorkInRelation = dataCreated._id;
          ${_createRelated}
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
  
  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(
    modelName
  )}', action: 'read'}})
  @get('/${TextTransformation.plurarize(
    TextTransformation.kebabfy(modelName)
  )}')
  @response(200, {
      description: 'Array of ${TextTransformation.pascalfy(
    modelName
  )} model instances',
      properties: HttpDocumentation.createDocResponseSchemaForFindManyResults(${TextTransformation.pascalfy(
    modelName
  )})
  })
  async find(
      @param.query.number('limit') limit?: number,
      @param.query.number('page') page?: number,
      @param.query.string('order_by') orderBy?: string,
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
  
          const filters = HttpDocumentation.createFilterRequestParams(this.httpRequest.url);
      
          const result = await this.repository.find({...filters, include: [${_propertiesRelatedFind}]});
      
          const total = await this.repository.count(filters['where']);

          const tokens = await Autentikigo.refreshToken(this.httpRequest.headers.authorization!)

          return HttpResponseToClient.okHttpResponse({
              data: {total: total?.count, result},
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
  
  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(
    modelName
  )}', action: 'readOne'}})
  @get('/${TextTransformation.plurarize(
    TextTransformation.kebabfy(modelName)
  )}/{id}')
  @response(200, {
      description: '${TextTransformation.pascalfy(modelName)} model instance',
      properties: HttpDocumentation.createDocResponseSchemaForFindOneResult(${TextTransformation.pascalfy(
    modelName
  )})
  })
  async findById(
      @param.path.string('id') id: string,
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
  
          let data = await this.repository.findOne({
              where: {and: [{_id: id}, {_deletedAt: {eq: null}}]},
              include: [${_propertiesRelatedFind}],
          });
          if (!data) throw new Error(serverMessages['httpResponse']['notFoundError'][locale ?? LocaleEnum['pt-BR']]);

          ${setGetRelatedElementsInArrayType(object)}

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
  
  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(
    modelName
  )}', action: 'updateOne'}})
  @put('/${TextTransformation.plurarize(
    TextTransformation.kebabfy(modelName)
  )}/{id}')
  @response(200, {description: '${TextTransformation.pascalfy(
    modelName
  )} PUT success'})
  async updateById(
      @param.path.string('id') id: string,
      @requestBody({
          content: HttpDocumentation.createDocRequestSchema(${TextTransformation.pascalfy(
    modelName
  )})
      }) data: ${TextTransformation.pascalfy(modelName)},
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
          // let dataToWorkInRelation = await this.repository.findById(id);
          ${_deleteRelated}
          
          const dataWithoutNullProperties = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
          
          ${_storageFile}
          ${setStorageFileInArrayType(object)}
  
          await this.repository.updateById(id, dataWithoutNullProperties);
          
          // const idToWorkInRelation = dataToWorkInRelation._id;
          //dataToWorkInRelation = JSON.parse(JSON.stringify(data));
          ${_createRelated}
          
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
  
  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(
    modelName
  )}', action: 'updateOne'}})
  @patch('/${TextTransformation.plurarize(
    TextTransformation.kebabfy(modelName)
  )}/{id}')
  @response(200, {description: '${TextTransformation.pascalfy(
    modelName
  )} PATCH success'})
  async partialUpdateById(
      @param.path.string('id') id: string,
      @requestBody({
          content: HttpDocumentation.createDocRequestSchema(${TextTransformation.pascalfy(
    modelName
  )})
      }) data: ${TextTransformation.pascalfy(modelName)},
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
          // let dataToWorkInRelation = await this.repository.findById(id);
          ${_deleteRelated}
          
          const dataWithoutNullProperties = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
          
          ${_storageFile}
          ${setStorageFileInArrayType(object)}
  
          await this.repository.updateById(id, dataWithoutNullProperties);

          // const idToWorkInRelation = dataToWorkInRelation._id;
          // dataToWorkInRelation = JSON.parse(JSON.stringify(data));
          ${_createRelated}

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
  
  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(
    modelName
  )}', action: 'deleteOne'}})
  @del('/${TextTransformation.plurarize(
    TextTransformation.kebabfy(modelName)
  )}/{id}')
  @response(204, {description: 'Project DELETE success'})
  async deleteById(
      @param.path.string('id') id: string,
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
  
          const dataToDelete = await this.repository.findById(id);
      
          await this.repository.updateById(id, {...dataToDelete, _deletedAt: new Date()});

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

  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(
    modelName
  )}', action: 'read'}})
  @get('/${TextTransformation.plurarize(
    TextTransformation.kebabfy(modelName)
  )}/chart')
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

  @authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(
    modelName
  )}', action: 'read'}})
  @get('/${TextTransformation.plurarize(
    TextTransformation.kebabfy(modelName)
  )}/chart/details')
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
  `;

  return code;
};

const setPropertiesToFindByElement = (
  element: FormElementInterface
): string => {
  let code = ``;

  const value = Object.values(element)[0];

  // if (value.optionsApi && value.optionsApi.endpoint) {
  //   const propertyName = TextTransformation.setIdToPropertyName(
  //     TextTransformation.pascalfy(
  //       TextTransformation.singularize(
  //         value.optionsApi.endpoint.split("-").join(" ")
  //       )
  //     )
  //   );
  //   if (value.isMultiple)
  //     code += `'${propertyName}',`;
  //   else
  //     code += `'${value.name.slice(0, -2)}',`;
  // }

  return code;
};

const setCreateAllMethodsByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  let code = ``;

  const modelName: string = object.form!.id.replace("Form", "");
  const value = Object.values(element)[0];

  // if (value.optionsApi && value.optionsApi.endpoint) {
  //   const className = TextTransformation.setIdToClassName(
  //     TextTransformation.pascalfy(
  //       TextTransformation.singularize(
  //         value.optionsApi.endpoint.split("-").join(" ")
  //       )
  //     )
  //   );
  //   if (value.isMultiple) {
  //     code += createCreateAllMethods(modelName, className, value.name);
  //   }
  // }

  return code;
};

const setDeleteAllMethodsByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  let code = ``;

  const modelName: string = object.form!.id.replace("Form", "");
  const value = Object.values(element)[0];

  // if (value.optionsApi && value.optionsApi.endpoint) {
  //   const className = TextTransformation.setIdToClassName(
  //     TextTransformation.pascalfy(
  //       TextTransformation.singularize(
  //         value.optionsApi.endpoint.split("-").join(" ")
  //       )
  //     )
  //   );
  //   if (value.isMultiple) {
  //     code += createDeleteAllMethods(modelName, className, value.name);
  //   }
  // }

  return code;
};

const createCreateAllMethods = (
  mainProperty: string,
  secondProperty: string,
  relatedPropertyName: string
): string => {
  const mainPropertyCamelCase =
    mainProperty.charAt(0).toLowerCase() + mainProperty.slice(1);
  const secondPropertyCamelCase =
    secondProperty.charAt(0).toLowerCase() + secondProperty.slice(1);

  return `
      if(dataToWorkInRelation.${relatedPropertyName} && (dataToWorkInRelation.${relatedPropertyName}.length > 0)){
        await this.${mainPropertyCamelCase}Has${secondProperty}Repository.createAll(
            (dataToWorkInRelation.${relatedPropertyName} as any[]).map(${secondPropertyCamelCase} => {
                return {
                    ${mainPropertyCamelCase}Id: idToWorkInRelation, 
                    ${secondPropertyCamelCase}${mainPropertyCamelCase === secondPropertyCamelCase ? "Related" : ""}Id: ${secondPropertyCamelCase},
                };
            })
        ); 
      }
  `;
};

const createDeleteAllMethods = (
  mainProperty: string,
  secondProperty: string,
  relatedPropertyName: string
): string => {
  const mainPropertyCamelCase =
    mainProperty.charAt(0).toLowerCase() + mainProperty.slice(1);
  const secondPropertyCamelCase =
    secondProperty.charAt(0).toLowerCase() + secondProperty.slice(1);

  return `
      if(dataToWorkInRelation.${relatedPropertyName} && (dataToWorkInRelation.${relatedPropertyName}.length > 0)){
        await this.${mainPropertyCamelCase}Has${secondProperty}Repository.deleteAll({ ${mainPropertyCamelCase}Id: id }) 
      }
  `;
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

  const elements: Array<FormElementInterface> = getAllElements(object.form.elements);

  elements.forEach((element) => {
    const type = Object.keys(element)[0];
    if (type === 'array') {
      const value = Object.values(element)[0];
      const relatedType = TextTransformation.setIdToClassName(value.id);

      const createMultidimensionalArrayStorageFileCode = (
        elements: Array<FormElementInterface>,
        relatedId: string,
        isFirstArray: boolean,
      ) => {

        let _storageFileToReturn = ``;
        elements?.forEach((elementProperty: FormElementInterface) => {

          const elementValue = Object.values(elementProperty)[0];

          if (elementValue.type === FormInputTypeEnum.File || elementProperty.array) {

            if (elementValue.type === FormInputTypeEnum.File) {
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
                  
                  ${createMultidimensionalArrayStorageFileCode(elementProperty.array?.elements!, elementProperty.array?.id!, false)}
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
          
          ${createMultidimensionalArrayStorageFileCode(value.elements, value.id, true)}
        }
      `;
    }
  });

  return _findRelatedElements;
};

export { setControllerMethods };
