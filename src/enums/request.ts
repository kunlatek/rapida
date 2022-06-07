export enum FilterTypeEnum {
    Api = 'API',
    Object = 'OBJECT',
}

export enum FilterComparisonOperatorEnum {
    Equal = 'eq',
    Greater = 'gt',
    GreaterOrEqual = 'gte',
    InArray = 'in',
    Less = 'lt',
    LessOrEqual = 'lte',
    NotEqual = 'ne',
    NotInArray = 'nin',
}

export enum FilterLogicalOperatorEnum {
    And = 'and',
    Not = 'not',
    Nor = 'nor',
    Or = 'or',
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