import { RouterTypeEnum } from "../../../enums/form";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";


const setControllerMethods = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const entityName: string = object.form.id.replace("Form", "");
  const modelName: string = TextTransformation.pascalfy(entityName);
  const routeName: string = TextTransformation.plurarize(TextTransformation.kebabfy(entityName));

  let code = `
  ${object.publicRoutes?.includes(RouterTypeEnum.Create) ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${modelName}', action: 'POST'}})`
    }
  @post('/${routeName}')
  @response(201, getSwaggerResponseSchema())
  async create(
    @requestBody(getSwaggerRequestBodySchema(${entityName}Schema, ['_id', '_createdBy', '_ownerId']))
    data: I${modelName}
  ): Promise<IHttpResponse> {
    try {
      const dataCreated = await this.${entityName}Repository.create({
        ...data,
        _createdBy: this.user?.userId,
        _ownerId: this.user?.userId,
      });

      return createHttpResponse({
        data: dataCreated,
        request: this.httpRequest,
        response: this.httpResponse,
      });
    } catch(err) {
      const errorData = {
        request: this.httpRequest,
        response: this.httpResponse,
        message: err.message,
      }
      if(err.statusCode === 404) return notFoundErrorHttpResponse(errorData);
      else return badRequestErrorHttpResponse(errorData);
    }
  }
  
  ${object.publicRoutes?.includes(RouterTypeEnum.Read) ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${modelName}', action: 'GET'}})`
    }
  @response(200, getSwaggerResponseSchema(${entityName}Schema, true))
  async findAll(
    @param.query.string('filters') filters?: any,
    @param.query.number('limit') limit?: number,
    @param.query.number('page') page?: number,
  ): Promise<IHttpResponse> {
    try {
      const data = await this.${entityName}Repository.findAll(
        filters ?? {},
        limit ?? 100,
        page ?? 0,
      );

      return okHttpResponse({
        data,
        request: this.httpRequest,
        response: this.httpResponse,
      });
    } catch(err) {
      const errorData = {
        message: err.message,
        request: this.httpRequest,
        response: this.httpResponse,
      }
      if(err.statusCode === 404) return notFoundErrorHttpResponse(errorData);
      else return badRequestErrorHttpResponse(errorData);
    }
  }
  
  ${object.publicRoutes?.includes(RouterTypeEnum.ReadOne) ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${modelName}', action: 'GET'}})`
    }
  @get('/${routeName}/{id}')
  @response(200, getSwaggerResponseSchema(${entityName}Schema, false))
  async findOne(
    @param.path.string('id') id: string,
  ): Promise<IHttpResponse> {
    try {
      const data = await this.${entityName}Repository.findById(id);

      return okHttpResponse({
        data,
        request: this.httpRequest,
        response: this.httpResponse,
      });
    } catch(err) {
      const errorData = {
        message: err.message,
        request: this.httpRequest,
        response: this.httpResponse,
      }
      if(err.statusCode === 404) return notFoundErrorHttpResponse(errorData);
      else return badRequestErrorHttpResponse(errorData);
    }
  }
  
  ${object.publicRoutes?.includes(RouterTypeEnum.Update) ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${modelName}', action: 'PUT'}})`
    }
  @put('/${routeName}/{id}')
  @response(200, getSwaggerResponseSchema(${entityName}Schema, false))
  async replace(
    @param.path.string('id') id: string,
    @requestBody(getSwaggerRequestBodySchema(${entityName}Schema, ['_id', '_createdBy', '_ownerId']))
    data: I${modelName}
  ): Promise<IHttpResponse> {
    try {
      const dataUpdated = await this.${entityName}Repository.replaceById(id, data)

      return okHttpResponse({
        data: dataUpdated,
        request: this.httpRequest,
        response: this.httpResponse,
      });
    } catch(err) {
      const errorData = {
        message: err.message,
        request: this.httpRequest,
        response: this.httpResponse,
      }
      if(err.statusCode === 404) return notFoundErrorHttpResponse(errorData);
      else return badRequestErrorHttpResponse(errorData);
    }
  }
  
  ${object.publicRoutes?.includes(RouterTypeEnum.Update) ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${modelName}', action: 'PATCH'}})`
    }
  @patch('/${routeName}/{id}')
  @response(200, getSwaggerResponseSchema(${entityName}Schema, false))
  async update(
    @param.path.string('id') id: string,
    @requestBody(getSwaggerRequestBodySchema(${entityName}Schema, ['_id', '_createdBy', '_ownerId']))
    data: Partial<I${modelName}>
  ): Promise<IHttpResponse> {
    try {
      const dataUpdated = await this.${entityName}Repository.updateById(id, data)

      return okHttpResponse({
        data: dataUpdated,
        request: this.httpRequest,
        response: this.httpResponse,
      });
    } catch(err) {
      const errorData = {
        message: err.message,
        request: this.httpRequest,
        response: this.httpResponse,
      }
      if(err.statusCode === 404) return notFoundErrorHttpResponse(errorData);
      else return badRequestErrorHttpResponse(errorData);
    }
  }
  
  ${object.publicRoutes?.includes(RouterTypeEnum.Delete) ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${modelName}', action: 'DELETE'}})`
    }
  @del('/${routeName}/{id}')
  @response(200, getSwaggerResponseSchema())
  async delete(
    @param.path.string('id') id: string
  ): Promise<IHttpResponse> {
    try {
      await this.${entityName}Repository.deleteById(id);

      return okHttpResponse({
        request: this.httpRequest,
        response: this.httpResponse,
      })
    } catch(err) {
      const errorData = {
        message: err.message,
        request: this.httpRequest,
        response: this.httpResponse,
      }
      if(err.statusCode === 404) return notFoundErrorHttpResponse(errorData);
      else return badRequestErrorHttpResponse(errorData);
    }
  }
  `;

  return code;
};

export { setControllerMethods };
