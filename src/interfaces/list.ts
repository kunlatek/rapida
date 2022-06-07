import { DialogInterface } from "./dialog";
import { FormInterface, ServiceInterface } from "./form";
import { FilterInterface, RequestInterface } from "./request";

export interface ListInterface {
  id: string;
  elements?: ListElementInterface ;
  actions?: FormInterface;
  object?: Array <unknown> ;
  subtitle?: string;
  title?: string;
  service?: ServiceInterface;
}

export interface ListElementInterface {
  titleField?: Array<string>;
  subtitleField?: Array<string>;
  contentField?: Array<string>;
  footerField?: Array<string>;
  filter?: FilterInterface;
}

export interface RowMenuElementInterface {
    action: RequestInterface;
    label: string;
    dialog?: DialogInterface;
    icon?: string;
    validator?: string;
}
