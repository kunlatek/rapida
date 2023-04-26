import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

const setRepositoryImports = (object: MainInterface): string => {
    if (!object.form) {
        console.info("Only forms set here");
        return ``;
    }

    const entityName: string = object.form.id.replace("Form", "");
    const modelName: string = TextTransformation.pascalfy(entityName);

    let code = `
    import {HttpErrors} from '@loopback/rest';
    import mongoose from 'mongoose';
    import {${modelName}, I${modelName}} from '../../../domain/entities';
    import {I${modelName}Repository} from '../../../domain/repositories';
    import {${modelName}MongoModel} from './schemas/${TextTransformation.kebabfy(entityName)}.schema';
    `;

    return code;
};

export { setRepositoryImports };
