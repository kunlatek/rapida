import { PropertyTypeEnum } from "../enums/property";

export interface ModelInterface {
  id: string;
  name: string;
  properties: PropertyInterface[];
}

export interface PropertyInterface {
  name: string;
  type: PropertyTypeEnum;
  isRequired: boolean;
  arrayItemType?: PropertyTypeEnum;
}
