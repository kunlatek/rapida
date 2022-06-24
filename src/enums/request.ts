export enum FilterTypeEnum {
    Api = 'API',
    Object = 'OBJECT',
}

export enum FilterComparisonOperatorEnum {
    Equal = '===',
    Greater = '>',
    GreaterOrEqual = '>=',
    InArray = 'in',
    Less = '<',
    LessOrEqual = '<=',
    NotEqual = '!==',
    NotInArray = 'nin',
}

export enum FilterLogicalOperatorEnum {
    And = '&&',
    Not = 'not',
    Nor = 'nor',
    Or = '||',
}

export enum RequestTypeEnum {
    Api = 'API',
    Object = 'OBJECT',
    Link = 'LINK',
    Dialog = 'DIALOG',
}

export enum ActionVerbEnum {
    Post = 'POST',
    Get = 'GET',
    Patch = 'PATCH',
    Put = 'PUT',
    Delete = 'DELETE',
}