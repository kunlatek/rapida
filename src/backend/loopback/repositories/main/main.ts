import * as fs from "fs";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";
import { setRepositoryImports } from "./imports";
import { setSeedModules } from "./modules";

const repositoryMain = (object: MainInterface): string => {
  const entityName: string = object.form!.id.replace("Form", "");
  const modelName: string = TextTransformation.pascalfy(entityName);

  let _imports: string = setRepositoryImports(object);

  let code = `
  ${_imports}

  if(mongoose.connection.readyState === 0){
    mongoose.connect(
      process.env.MONGO_URL ?? 'mongodb://localhost:27017/kunlatek',
      { dbName: process.env.DB! }
    ).then(() => console.log('Mongoose: Connected to db!!'))
  }

  export class ${modelName}Repository implements I${modelName}Repository {
    async create(data: I${modelName}): Promise<${modelName}> {
      const dataCreated = await ${modelName}MongoModel.create(data);
      return new ${modelName}(dataCreated);
    }

    async findAll(filters: any, limit: number, page: number): Promise<${modelName}[]> {
      return (await ${modelName}MongoModel
        .find(filters)
        // .populate(getPopulateObjFromSchema('modules', moduleSchema))
        .skip(page * limit)
        .limit(limit)
      ).map((data: any) => new ${modelName}(data));
    }

    async findById(id: string): Promise<${modelName}> {
      const data = await ${modelName}MongoModel
        .findById(id)
        //.populate(getPopulateObjFromSchema('modules', moduleSchema))
        .orFail(new HttpErrors[404]('${modelName} not found'));

      return new ${modelName}(data);
    }

    async updateById(id: string, dataToUpdate: Partial<I${modelName}>): Promise<${modelName}> {
      const data = await ${modelName}MongoModel
        .findByIdAndUpdate(id, dataToUpdate, {new: true})
        //.populate(getPopulateObjFromSchema('modules', moduleSchema))
        .orFail(new HttpErrors[404]('${modelName} not found'));

      return new ${modelName}(data);
    }

    async replaceById(id: string, dataToUpdate: I${modelName}): Promise<${modelName}> {
      const data = await ${modelName}MongoModel
        .findOneAndReplace({_id: id}, dataToUpdate, {new: true})
        //.populate(getPopulateObjFromSchema('modules', moduleSchema))
        .orFail(new HttpErrors[404]('${modelName} not found'));

      return new ${modelName}(data);
    }

    async deleteById(id: string): Promise<void> {
      await ${modelName}MongoModel.findByIdAndDelete(id);
    }
  }
  `;

  setDomainEntityArchitectureAndWriteToFile(object, code);

  setSeedModules(object);

  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setDomainEntityArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  const componentFilePath = `${object.projectPath}-api/src/repositories/mongo/api/${TextTransformation.kebabfy(object.form?.id.replace("Form", "")!)}.repository.ts`;
  const componentIndexFilePath = `${object.projectPath}-api/src/repositories/index.ts`;

  try {
    fs.writeFileSync(componentFilePath, code);
    fs.appendFile(componentIndexFilePath, `export * from './mongo/api/${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)}.repository';`, () => { });

    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} already exists.`);
    console.info(`File successfully written in ${componentFilePath}.`);
  } catch (error: any) {
    console.info(`File ${TextTransformation.kebabfy(object.form?.id.replace("Form", '')!)} doesn't exist.`);

    fs.writeFileSync(componentFilePath, code);

    console.info(`File successfully created in ${componentFilePath}.`);
  }
};

export { repositoryMain };
