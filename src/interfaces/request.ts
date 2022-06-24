import { ActionVerbEnum, FilterComparisonOperatorEnum, FilterLogicalOperatorEnum, FilterTypeEnum, RequestTypeEnum } from "../enums/request";

export interface RequestInterface {
    type: RequestTypeEnum;
    verb?: ActionVerbEnum;
    url?: string;
    body?: unknown;
    param?: string;
}

export interface FilterWhereInterface {
    attribute?: string;
    comparison?: FilterComparisonOperatorEnum;
    logical?: FilterLogicalOperatorEnum;
    value?: string;
}

export interface FilterInterface {
    type: FilterTypeEnum;
    where?: Array < FilterWhereInterface > ;
}