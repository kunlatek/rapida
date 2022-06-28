/* eslint-disable no-var */

import { ArrayFeaturesInterface } from "../frontend/angular/form/controller/methods/interfaces";

declare global {
  var _arrayLayer: Array<ArrayFeaturesInterface>;
  var _arraysInAFlow: Array<ArrayFeaturesInterface>;
  var _hasCondition: boolean;
  var _hasConditionInArray: boolean;
  var _conditionMethods: Array<string>;
  var _conditionProperties: Array<string>;
}

export {};