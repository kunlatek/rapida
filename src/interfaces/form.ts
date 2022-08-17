import {
  ConditionEnum,
  FormAttributeEnum,
  FormButtonTypeEnum,
  FormEncTypeEnum,
  FormInputTypeEnum,
  FormMethodEnum,
  FormTargetEnum,
  ServiceFunctionsEnum,
} from "../enums/form";
import {
  FilterComparisonOperatorEnum,
  FilterLogicalOperatorEnum,
} from "../enums/request";
import { DialogInterface } from "./dialog";

export interface FormInterface {
  elements: Array<FormElementInterface>;
  id: string;
  title: string;
  label?: string;
  actions?: Array<FormElementInterface>;
  subtitle?: string;
  attributes?: FormAttributeEnum;
  service?: ServiceInterface;
  todo?: string;
}
export interface ServiceInterface {
  baseUrl: string;
  endpoint: string;
  methods: Array<ServiceFunctionsEnum>;
  hasAuthorization: boolean;
}
export interface FormElementInterface {
  array?: ArrayInterface;
  autocomplete?: AutocompleteInterface;
  button?: ButtonInterface;
  checkbox?: CheckboxInterface;
  radio?: RadioInterface;
  datalist?: DatalistInterface;
  elementReplicaId?: string; // id de element de onde devem ser utilizados os valores do atributo elements
  fieldset?: FieldsetInterface;
  input?: InputInterface;
  label?: LabelInterface;
  legend?: LegendInterface;
  optgroup?: OptgroupInterface;
  option?: OptionInterface;
  output?: OutputInterface;
  select?: SelectInterface;
  slide?: SlideInterface;
  tabs?: Array<FormInterface>;
  textarea?: TextareaInterface;
}

export interface ArrayInterface {
  elements: Array<FormElementInterface>;
  id: string;
  title: string;
  conditions?: ConditionInterface;
  todo?: string;
}

export interface ButtonInterface {
  type: FormButtonTypeEnum;
  label: string;
  name?: string;
  dialog?: DialogInterface;
  tooltip?: string;
  isAutofocus?: boolean;
  isDisabled?: boolean;
  isFormNoValidate?: boolean;
  icon?: string;
  value?: string;
  form?: string;
  formAction?: string;
  formEnctype?: FormEncTypeEnum;
  formMethod?: FormMethodEnum;
  formTarget?: FormTargetEnum;
  todo?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DatalistInterface {
  // TO-DO
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FieldsetInterface {
  // TO-DO
}

export interface InputInterface {
  type: FormInputTypeEnum;
  label: string;
  name: string;
  placeholder?: string;
  tooltip?: string;
  conditions?: ConditionInterface;
  mask?: string; // Over ngx-mask patterns
  isAutoFocus?: boolean; // Specifies that an <input> element should automatically get focus when the page loads
  isChecked?: boolean; // Specifies that an <input> element should be pre-selected when the page loads (for type="checkbox" or type="radio")
  isDisabled?: boolean;
  isFormNoValidate?: boolean;
  isMultipleLines?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  accept?: string; // Specifies a filter for what file types the user can pick from the file input dialog box (only for type="file")
  alt?: string;
  autocomplete?: "on" | "off";
  dirname?: string;
  form?: string;
  formEnctype?: FormEncTypeEnum;
  formMethod?: FormMethodEnum;
  formTarget?: FormTargetEnum;
  height?: number; // Specifies the height of an <input> element (only for type="image")
  list?: string; // 	Refers to a <datalist> element that contains pre-defined options for an <input> element
  max?: number | Date;
  maxLength?: number;
  min?: number | Date;
  minLength?: number;
  pattern?: RegExp;
  size?: number;
  src?: string; // Specifies the URL of the image to use as a submit button (only for type="image")
  step?: number | any; // Specifies the interval between legal numbers in an input field
  validators?: Array<string>;
  value?: string;
  width?: number;
  todo?: string;
}

export interface SlideInterface {
  label: string;
  name: string;
  isTriggerToCondition?: boolean;
  conditions?: ConditionInterface;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LabelInterface {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LegendInterface {}

export interface OptgroupInterface {
  label: string;
  options?: Array<OptionInterface>;
  isDisabled?: boolean;
}

export interface OptionInterface {
  label: string;
  value: any;
  isDisabled?: boolean;
  isSelected?: boolean;
  todo?: string;
}

export interface OptionApiInterface {
  endpoint: string;
  labelField: string;
  valueField: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  todo?: string;
}

export interface AutocompleteApiInterface {
  endpoint: string;
  labelField: string;
  valueField: string;
  paramsToFilter: Array<string>;
  isDisabled?: boolean;
  isSelected?: boolean;
  todo?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OutputInterface {}

export interface SelectInterface {
  type: FormInputTypeEnum;
  name: string;
  label: string;
  tooltip?: string;
  isTriggerToCondition?: boolean;
  conditions?: ConditionInterface;
  optgroups?: Array<OptgroupInterface>;
  optionsObject?: Array<OptionInterface>;
  optionsApi?: OptionApiInterface;
  size?: number;
  validators?: Array<string>;
  isAutofocus?: boolean;
  isDisabled?: boolean;
  isMultiple?: boolean;
  isRequired?: boolean;
  todo?: string;
}

export interface AutocompleteInterface {
  type: FormInputTypeEnum;
  name: string;
  label: string;
  placeholder?: string;
  tooltip?: string;
  conditions?: ConditionInterface;
  optgroups?: Array<OptgroupInterface>;
  optionsApi: AutocompleteApiInterface;
  size?: number;
  validators?: Array<string>;
  isAutofocus?: boolean;
  isDisabled?: boolean;
  isMultiple?: boolean;
  isRequired?: boolean;
  todo?: string;
}

export interface CheckboxInterface {
  name: string;
  label: string;
  conditions?: ConditionInterface;
  optgroups?: Array<OptgroupInterface>;
  optionsObject?: Array<OptionInterface>;
  optionsApi?: OptionApiInterface;
  size?: number;
  validators?: Array<string>;
  isAutofocus?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isChecked?: boolean;
  todo?: string;
  isMultiple: boolean;
}

export interface RadioInterface {
  name: string;
  label: string;
  conditions?: ConditionInterface;
  optgroups?: Array<OptgroupInterface>;
  optionsObject?: Array<OptionInterface>;
  optionsApi?: OptionApiInterface;
  size?: number;
  validators?: Array<string>;
  isAutofocus?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  todo?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TextareaInterface {}

export interface ConditionInterface {
  type: ConditionEnum;
  elements: Array<ConditionElementInterface>;
}

export interface ConditionElementInterface {
  key: string;
  value: any;
  array?: string;
  comparisonOperator?: FilterComparisonOperatorEnum;
  logicalOperator?: FilterLogicalOperatorEnum;
}
