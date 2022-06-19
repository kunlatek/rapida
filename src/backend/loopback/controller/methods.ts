import { FormElementInterface } from "../../../interfaces/form";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";

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

const setControllerMethods = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const modelName: string = object.form.id.replace("Form", "");

  let _propertiesRelatedFind: string = ``;
  let _createRelated: string = ``;
  let _deleteRelated: string = ``;

  object.form.elements.forEach((element) => {
    _propertiesRelatedFind += setPropertiesToFindByElement(element);
    _createRelated += setCreateAllMethodsByElement(object, element);
    _deleteRelated += setDeleteAllMethodsByElement(object, element);
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
      
          const dataCreated = await this.repository.create({...dataWithoutNullProperties, _createdBy: createdBy, _ownerId: ownerId});
          
          const dataToWorkInRelation = data;
          const idToWorkInRelation = dataCreated._id;
          ${_createRelated}
          return HttpResponseToClient.createHttpResponse({
              data: dataCreated,
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
      
          return HttpResponseToClient.okHttpResponse({
              data: {total: total?.count, result},
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
  
          const data = await this.repository.findOne({
              where: {and: [{_id: id}, {_deletedAt: {eq: null}}]},
              include: [${_propertiesRelatedFind}],
          });
          if (!data) throw new Error(serverMessages['httpResponse']['notFoundError'][locale ?? LocaleEnum['pt-BR']]);
      
          return HttpResponseToClient.okHttpResponse({
              data,
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
          let dataToWorkInRelation = await this.repository.findById(id);
          ${_deleteRelated}
          const dataWithoutNullProperties = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
  
          await this.repository.updateById(id, dataWithoutNullProperties);
          const idToWorkInRelation = dataToWorkInRelation._id;
          dataToWorkInRelation = JSON.parse(JSON.stringify(data));
          ${_createRelated}
      
          return HttpResponseToClient.noContentHttpResponse({
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
          let dataToWorkInRelation = await this.repository.findById(id);
          ${_deleteRelated}
          const dataWithoutNullProperties = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
  
          await this.repository.updateById(id, dataWithoutNullProperties);
;
          const idToWorkInRelation = dataToWorkInRelation._id;
          dataToWorkInRelation = JSON.parse(JSON.stringify(data));
          ${_createRelated}
      
          return HttpResponseToClient.noContentHttpResponse({
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
      
          return HttpResponseToClient.noContentHttpResponse({
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

      return HttpResponseToClient.okHttpResponse({
        data,
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

      return HttpResponseToClient.okHttpResponse({
        data,
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

  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  if (validTypes.includes(type)) {
    if (value.optionsApi) {
      const propertyName = TextTransformation.setIdToPropertyName(
        TextTransformation.pascalfy(
          TextTransformation.singularize(
            value.optionsApi.endpoint.split("-").join(" ")
          )
        )
      );
      code += `'${propertyName}',`;
    }
  } else if (type === "tabs") {
    element.tabs?.forEach((tab) => {
      tab.elements.forEach((element) => {
        code += setPropertiesToFindByElement(element);
      });
    });
  }

  return code;
};

const setCreateAllMethodsByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  let code = ``;

  const modelName: string = object.form!.id.replace("Form", "");
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

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
        code += createCreateAllMethods(modelName, className, value.name);
      }
    }
  } else if (type === "tabs") {
    element.tabs?.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        code += setCreateAllMethodsByElement(object, tabElement);
      });
    });
  }

  return code;
};

const setDeleteAllMethodsByElement = (
  object: MainInterface,
  element: FormElementInterface
): string => {
  let code = ``;

  const modelName: string = object.form!.id.replace("Form", "");
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

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
        code += createDeleteAllMethods(modelName, className, value.name);
      }
    }
  } else if (type === "tabs") {
    element.tabs?.forEach((tab) => {
      tab.elements.forEach((tabElement) => {
        code += setDeleteAllMethodsByElement(object, tabElement);
      });
    });
  }

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
      await this.${mainPropertyCamelCase}Has${secondProperty}Repository.createAll(
          ((dataToWorkInRelation.${relatedPropertyName} || []) as any[]).map(${secondPropertyCamelCase} => {
              return {
                  ${mainPropertyCamelCase}Id: idToWorkInRelation, 
                  ${secondPropertyCamelCase}${mainPropertyCamelCase === secondPropertyCamelCase ? "Related" : ""
    }Id: ${secondPropertyCamelCase},
              };
          })
      ); 
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
      await this.${mainPropertyCamelCase}Has${secondProperty}Repository.deleteAll({
          or: ((dataToWorkInRelation.${relatedPropertyName} || []) as any[]).map(${secondPropertyCamelCase} => {
              return {${secondPropertyCamelCase}Id: ${secondPropertyCamelCase}._id};
          })
      }); 
  `;
};

export { setControllerMethods };
