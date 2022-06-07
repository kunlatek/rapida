import { DialogInterface } from "./dialog";
import { FormInterface, ServiceInterface } from "./form";
import { FilterInterface, RequestInterface } from "./request";

export interface TableInterface {
  id: string;
  data: RequestInterface;
  elements: Array<TableElementInterface>;
  actions?: FormInterface;
  object?: Array<unknown>;
  subtitle?: string;
  title?: string;
  service?: ServiceInterface;
}

export interface TableElementInterface {
  column: {
    label: string;
    comment?: string;
    sort?: boolean;
  };
  row: {
    comment?: string;
    field?: string;
    filter?: FilterInterface;
    icon?: string;
    menu?: Array<RowMenuElementInterface>;
    type?: string;
  };
}

export interface RowMenuElementInterface {
  action: RequestInterface;
  label: string;
  dialog?: DialogInterface;
  icon?: string;
  validator?: string;
}
