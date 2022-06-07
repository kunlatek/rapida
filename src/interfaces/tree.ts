import { RequestTypeEnum } from "../enums/request";
import { RequestInterface } from "./request";

export interface TreeInterface {
    id: string;
    elements: Array <TreeElementInterface> ;
}

export interface TreeElementInterface {
    id: string;
    nodes: TreeNodeInterface;
}

export interface TreeNodeInterface {
    type: RequestTypeEnum;
    url?: string;
    object?: Array <TreeNodeObjectInterface> ;
}

export interface TreeNodeObjectInterface {
    name: string;
    children?: Array <TreeNodeObjectInterface> ;
    menu?: Array <{
        label: string;
        icon?: string;
        action: RequestInterface;
        validator?: string;
    }> ;
}