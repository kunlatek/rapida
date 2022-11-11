import { RouterTypeEnum } from "../../../enums/form";
import { FormElementInterface } from "../../../interfaces/form";
import { MainInterface } from "../../../interfaces/main";
import { TextTransformation } from "../../../utils/text.transformation";

import { getAllElements } from "../main";

const setControllerMethods = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  const modelName: string = object.form.id.replace("Form", "");

  let _propertiesRelatedFind: string = ``;

  let code = `
  ${object.publicRoutes?.includes(RouterTypeEnum.Create) ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(modelName)}', action: 'createOne'}})`
    }
  @post('/${TextTransformation.plurarize(TextTransformation.kebabfy(modelName))}')
  @response(201, new ${TextTransformation.pascalfy(modelName)}Service().swaggerResponseData('${TextTransformation.pascalfy(modelName)} model instance', 201))
  async create(
    @requestBody(new ${TextTransformation.pascalfy(modelName)}Service().swaggerRequestBody()) request: Request,
    @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {

        const bodyAndFiles: any = await this.storageService.getBodyAndFiles(request, this.httpResponse)
        let data = bodyAndFiles.body;
  
        const createdBy = this.currentUser?.[securityId] as string || '';
        const ownerId = this.currentUser?.ownerId as string || '';

        data = await this.${modelName}Service.manageFiles(data, bodyAndFiles);
    
        const dataCreated = await ${TextTransformation.pascalfy(modelName)}Schema.create({
          ...data, 
          _createdBy: createdBy, 
          _ownerId: ownerId
        });
        
        const tokens = ${object.publicRoutes?.includes(RouterTypeEnum.Create) ? `{};` : `await Autentikigo.refreshToken(this.httpRequest.headers.authorization!);`}

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
  
  ${object.publicRoutes?.includes(RouterTypeEnum.Read) ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(modelName)}', action: 'read'}})`
    }
  @get('/${TextTransformation.plurarize(TextTransformation.kebabfy(modelName))}')
  @response(200, new ${TextTransformation.pascalfy(modelName)}Service().swaggerResponseData('Array of ${TextTransformation.pascalfy(modelName)} model instance', 200))
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

          let result = await ${TextTransformation.pascalfy(modelName)}Schema
            .find({"$and": and})
            .limit(limit || 100)
            .skip((limit || 100) * (page || 0))
            .sort(orderBy ? { [orderBy]: -1 } : { _createdAt: -1 })
            ${setDeepPopulate(object)};
          result = JSON.parse(JSON.stringify(result))

          ${setSeveralExternalApiDataFound(object)}

          const total = await ${TextTransformation.pascalfy(modelName)}Schema.countDocuments({"$and": and});

          const tokens = ${object.publicRoutes?.includes(RouterTypeEnum.Read) ? `{};` : `await Autentikigo.refreshToken(this.httpRequest.headers.authorization!);`}

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
  
  ${object.publicRoutes?.includes(RouterTypeEnum.ReadOne) ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(modelName)}', action: 'readOne'}})`
    }
  @get('/${TextTransformation.plurarize(TextTransformation.kebabfy(modelName))}/{id}')
  @response(200, new ${TextTransformation.pascalfy(modelName)}Service().swaggerResponseData('${TextTransformation.pascalfy(modelName)} model instance', 200))
  async findById(
      @param.path.string('id') id: string,
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
  
          const dataFound = await ${TextTransformation.pascalfy(modelName)}Schema.findById(id)
          ${setDeepPopulate(object)}
          
          if (!dataFound) throw new Error(serverMessages['httpResponse']['notFoundError'][locale ?? LocaleEnum['pt-BR']]);

          const temp = JSON.stringify(dataFound);
          let data = JSON.parse(temp);

          ${setExternalApiDataFound(object)}

          const tokens = ${object.publicRoutes?.includes(RouterTypeEnum.ReadOne) ? `{};` : `await Autentikigo.refreshToken(this.httpRequest.headers.authorization!);`}
      
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
  
  ${object.publicRoutes?.includes(RouterTypeEnum.Update) ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(modelName)}', action: 'updateOne'}})`
    }
  @put('/${TextTransformation.plurarize(TextTransformation.kebabfy(modelName))}/{id}')
  @response(200, new ${TextTransformation.pascalfy(modelName)}Service().swaggerResponseData('${TextTransformation.pascalfy(modelName)} PUT success', 200))
  async updateById(
      @param.path.string('id') id: string,
      @requestBody(new ${TextTransformation.pascalfy(modelName)}Service().swaggerRequestBody()) request: Request,
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
          
        const bodyAndFiles: any = await this.storageService.getBodyAndFiles(request, this.httpResponse)
        let data = bodyAndFiles.body;
        
        data = await this.${modelName}Service.manageFiles(data, bodyAndFiles);

        await ${TextTransformation.pascalfy(modelName)}Schema.findByIdAndUpdate(id, data);
        
        const tokens = ${object.publicRoutes?.includes(RouterTypeEnum.Update) ? `{};` : `await Autentikigo.refreshToken(this.httpRequest.headers.authorization!);`}
    
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
  
  ${object.publicRoutes?.includes(RouterTypeEnum.Update) ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(modelName)}', action: 'updateOne'}})`
    }
  @patch('/${TextTransformation.plurarize(TextTransformation.kebabfy(modelName))}/{id}')
  @response(200, new ${TextTransformation.pascalfy(modelName)}Service().swaggerResponseData('${TextTransformation.pascalfy(modelName)} PATCH success', 200))
  async partialUpdateById(
      @param.path.string('id') id: string,
      @requestBody(new ${TextTransformation.pascalfy(modelName)}Service().swaggerRequestBody()) request: Request,
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
          
        const bodyAndFiles: any = await this.storageService.getBodyAndFiles(request, this.httpResponse)
        let data = bodyAndFiles.body;
          
        data = await this.${modelName}Service.manageFiles(data, bodyAndFiles);

        await ${TextTransformation.pascalfy(modelName)}Schema.findByIdAndUpdate(id, data);

        const tokens = ${object.publicRoutes?.includes(RouterTypeEnum.Update) ? `{};` : `await Autentikigo.refreshToken(this.httpRequest.headers.authorization!);`}
    
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
  
  ${object.publicRoutes?.includes(RouterTypeEnum.Delete) ?
      `` :
      `@authenticate({strategy: 'autentikigo', options: {collection: '${TextTransformation.pascalfy(modelName)}', action: 'deleteOne'}})`
    }
  @del('/${TextTransformation.plurarize(TextTransformation.kebabfy(modelName))}/{id}')
  @response(204, new ${TextTransformation.pascalfy(modelName)}Service().swaggerResponseData('${TextTransformation.pascalfy(modelName)} DELETE success', 204))
  async deleteById(
      @param.path.string('id') id: string,
      @param.query.string('locale') locale?: LocaleEnum,
  ): Promise<IHttpResponse> {
      try {
  
        await ${TextTransformation.pascalfy(modelName)}Schema.findByIdAndUpdate(id, {_deletedAt: new Date()});

        const tokens = ${object.publicRoutes?.includes(RouterTypeEnum.Delete) ? `{};` : `await Autentikigo.refreshToken(this.httpRequest.headers.authorization!);`}

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

      if (value.optionsApi && !value.optionsApi.externalEndpoint) {
        hasPopulatedField = true;

        let deepPopulateOverPopulate = ``;
        if (value.optionsApi.populate) deepPopulateOverPopulate += `populate: [${setDeepPopulateOverPopulate(value.optionsApi.populate)}],`;

        _deepPopulateCode += `
          {path: '${value.name}', ${deepPopulateOverPopulate}},`;
      } else if (type === 'array') {

        _deepPopulateCode += `
          {
            path: '${value.id}',
            populate: [
              ${deepPopulate(value.elements)}
            ],
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

const setDeepPopulateOverPopulate = (populateArray: string[]) => {

  const createDeepPopulateOverPopulate = (populateArrayOverPopulate: string[]): string => {
    let code = ``;

    for (let populateIndex = 0; populateIndex < populateArrayOverPopulate.length; populateIndex++) {
      const element = populateArrayOverPopulate[populateIndex];
      if (element.includes('.')) {
        const childPopulateArray = element.split('.');
        const childPath = childPopulateArray.shift();
        code += `{path: '${childPath}', populate: [${createDeepPopulateOverPopulate([childPopulateArray.join('.')])}],},`;
      } else {
        code += `{path: '${element}',},`;
      }
    }

    return code;
  };

  return `
  [
    ${createDeepPopulateOverPopulate(populateArray)}
  ],`;
};

const setExternalApiDataFound = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let _externalApiData = ``;
  let hasExternalApiDataField: boolean = false;

  const deepExternalApiData = (elements: Array<FormElementInterface>, parent: string) => {
    let _deepExternalApiCode = ``;

    elements.forEach((element) => {

      const type = Object.keys(element)[0];
      const value = Object.values(element)[0];

      if (value.optionsApi && value.optionsApi.externalEndpoint) {
        hasExternalApiDataField = true;

        let arrayOfFields = (typeof value.optionsApi.labelField === 'string' ? [value.optionsApi.labelField] : value.optionsApi.labelField).map((el: string) => el.split('.')).flat();
        arrayOfFields = [...new Set(arrayOfFields)];

        _deepExternalApiCode += `
          const ${value.name}Fetched = await (await fetch('${value.optionsApi.externalEndpoint}/' + ${parent}.${value.name})).json()
          ${parent}.${value.name} = (({ ${value.optionsApi.valueField} ${arrayOfFields.reduce((prev: string, current: string) => prev += `, ${current}`, '')} }) => ({ ${value.optionsApi.valueField} ${arrayOfFields.reduce((prev: string, current: string) => prev += `, ${current}`, '')} }))(${value.name}Fetched?.data)
        `;
      } else if (type === 'array') {

        _deepExternalApiCode += `
          let ${element.array?.id} = ${parent}.${element.array?.id};
          for(
            let ${element.array?.id}Index = 0; 
            ${element.array?.id}Index < ${element.array?.id}?.length || 0; 
            ${element.array?.id}Index++
          ){

            let ${TextTransformation.singularize(element.array!.id)} = ${element.array?.id}[${element.array?.id}Index];

            ${deepExternalApiData(element.array?.elements!, TextTransformation.singularize(element.array!.id))}
          };
        `;
      }
    });

    return _deepExternalApiCode;
  };

  const elements: Array<FormElementInterface> = getAllElements(object.form.elements);

  _externalApiData += deepExternalApiData(elements, 'data');

  return hasExternalApiDataField ?
    `${_externalApiData}`
    : '';
};

const setSeveralExternalApiDataFound = (object: MainInterface): string => {
  if (!object.form) {
    console.info("Only forms set here");
    return ``;
  }

  let _externalApiData = ``;
  let hasExternalApiDataField: boolean = false;

  const deepExternalApiData = (elements: Array<FormElementInterface>, parent: string) => {
    let _deepExternalApiCode = ``;

    elements.forEach((element) => {

      const type = Object.keys(element)[0];
      const value = Object.values(element)[0];

      if (value.optionsApi && value.optionsApi.externalEndpoint) {
        hasExternalApiDataField = true;

        let arrayOfFields = (typeof value.optionsApi.labelField === 'string' ? [value.optionsApi.labelField] : value.optionsApi.labelField).map((el: string) => el.split('.')).flat();
        arrayOfFields = [...new Set(arrayOfFields)];

        _deepExternalApiCode += `
          const ${value.name}Fetched_ids = result?.reduce((prev: string, current: any) => prev += \`"\${current.${value.name}}",\`, '')
          const ${value.name}Fetched = await (await fetch(\`${value.optionsApi.externalEndpoint}?${value.optionsApi.rawQuery ? value.optionsApi.rawQuery : ""}filters={"_id":{"$in":[\${${value.name}Fetched_ids.slice(0, -1)}]}}\`)).json()
          const ${value.name} = ${value.name}Fetched?.data?.result.map((el: any) => {
            return (({ ${value.optionsApi.valueField} ${arrayOfFields.reduce((prev: string, current: string) => prev += `, ${current}`, '')} }) => ({ ${value.optionsApi.valueField} ${arrayOfFields.reduce((prev: string, current: string) => prev += `, ${current}`, '')} }))(el);
          })
          result = result.map((resultData: any) => {
            return {
              ...resultData,
              ${value.name}: (${value.name} || []).find((el: any) => el._id === resultData.${value.name})
            }
          })
        `;
      } else if (type === 'array') {

        // TODO: get external data deeper
        // _deepExternalApiCode += `
        //   let ${element.array?.id} = ${parent}.${element.array?.id};
        //   for(
        //     let ${element.array?.id}Index = 0; 
        //     ${element.array?.id}Index < ${element.array?.id}?.length || 0; 
        //     ${element.array?.id}Index++
        //   ){

        //     let ${TextTransformation.singularize(element.array!.id)} = ${element.array?.id}[${element.array?.id}Index];

        //     ${deepExternalApiData(element.array?.elements!, TextTransformation.singularize(element.array!.id))}
        //   };
        // `;
      }
    });

    return _deepExternalApiCode;
  };

  const elements: Array<FormElementInterface> = getAllElements(object.form.elements);

  _externalApiData += deepExternalApiData(elements, 'data');

  return hasExternalApiDataField ?
    `${_externalApiData}`
    : '';
};

export { setControllerMethods };
