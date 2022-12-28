import { DialogInterface } from "./dialog";
import { FormInterface, ServiceInterface } from "./form";
import { FilterInterface, RequestInterface } from "./request";

export interface TableInterface {
  id: string;
  data: RequestInterface;
  elements: Array<TableElementInterface>;
  fieldsToLabels?: Array<{ label: string; field: string; }>; // Creates XLS according to fields chosen from the related form using label as table column name
  formIdToFieldsToLabels?: string; // Creates XLS using all the fields related to formId
  actions?: FormInterface;
  object?: Array<unknown>;
  subtitle?: string;
  title?: string;
  service?: ServiceInterface;
  infiniteScroll?: boolean;
  filtersToSearch?: [{ label: string; field: string; }]; // Specific filters to search table list content
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
    fieldProperties?: Array<string>; //If field is an object, list properties to show 
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
