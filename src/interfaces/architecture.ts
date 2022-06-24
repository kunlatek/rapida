import { ComponentCodeTypeEnum } from "../enums/architecture";
import { ModuleInterface } from "./module";

export interface CreateProjectComponentPathAndFile {
    projectPath: string;
    componentPath: string;
    componentCode: string;
    componentCodeType: ComponentCodeTypeEnum;
    module?: ModuleInterface;
}

export interface CreateCrudPathAndFile {
    projectPath: string;
}