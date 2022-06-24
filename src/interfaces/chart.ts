import { DialogInterface } from "./dialog";
import { FormInterface, ServiceInterface } from "./form";
import { RequestInterface } from "./request";

export interface ChartInterface {
  id: string;
  menu?: Array<ChartMenuInterface>;
  title?: string;
  subtitle?: string;
  bar?: ChartBarInterface;
  bubble?: ChartBubbleInterface;
  doughnut?: ChartDoughnutInterface;
  pie?: ChartPieInterface;
  line?: ChartLineInterface;
  polarArea?: ChartPolarAreaInterface;
  radar?: ChartRadarInterface;
  scatter?: ChartScatterInterface;
  service?: ServiceInterface;
  actions?: FormInterface;
};

// https://www.chartjs.org/docs/latest/charts/bar.html

export interface ChartBarInterface {
  labels: Array<string>;
  datasets: Array<ChartBarDatasetInterface>;
  collection: string;
  collectionGroupedBy: Array<string>; // Max of two props. First prop would create axis label 
                                      // and if it has a second prop, it would create bar label
  backgroundColor?: Array<string>; // Default: 'rgba(0, 0, 0, 0.1)'
  borderColor?: Array<String>;
  borderWidth?: number;
  barPercentage?: number;
  barThickness?: number | string;
  maxBarThickness?: number;
  minBarLength?: number;
};

// https://www.chartjs.org/docs/latest/charts/bubble.html
export interface ChartBubbleInterface {
  datasets: Array<ChartBubbleDatasetInterface>;
};

// https://www.chartjs.org/docs/latest/charts/doughnut.html
export interface ChartDoughnutInterface {
  labels: Array<string>;
  datasets: Array<ChartDoughnutDatasetInterface>;
};

export interface ChartPieInterface {
  labels: Array<string>;
  datasets: Array<ChartPieDatasetInterface>;
  backgroundColor?: Array<string>; // Default: 'rgba(0, 0, 0, 0.1)'
  borderAlign?: Enumerator<'center'|'inner'>;
  borderColor?: Array<String>;
  borderWidth?: number;
  borderJoinStyle?: Enumerator<'round'|'bevel'|'miter'>;
  borderRadius?: number | object;
  circumference?: number;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  hoverBoderJoinStyle?: Enumerator<'round'|'bevel'|'miter'>;
  hoverBorderWidth?: number;
  hoverOffset?: number;
};

// https://www.chartjs.org/docs/latest/charts/line.html
export interface ChartLineInterface {
  labels: Array<string>;
  tension?: number;
  datasets: Array<ChartLineDatasetInterface>;
};

// https://www.chartjs.org/docs/latest/charts/polar.html
export interface ChartPolarAreaInterface {
  labels: Array<string>;
  datasets: Array<ChartPolarAreaDatasetInterface>;
};

// https://www.chartjs.org/docs/latest/charts/radar.html
export interface ChartRadarInterface {
  labels: Array<string>;
  datasets: Array<ChartRadarDatasetInterface>;
};

// https://www.chartjs.org/docs/latest/charts/scatter.html
export interface ChartScatterInterface {
  labels: Array<string>;
  datasets: Array<ChartScatterDatasetInterface>;
};

export interface ChartBarApiInterface {
  endpoint: string;
  labelField: string;
  valueField: string;
  paramsToFilter: Array<string>;
  todo?: string;
};

export interface ChartBarDatasetInterface {
  data?: Array<number>;
  label?: string;
  base?: number;
};

export interface ChartBubbleDatasetInterface {
  data: [{
    x: number;
    y: number;
    r: number; // Bubble radius in pixels (not scaled).
  }];
  label?: string;
  backgroundColor?: string; // Default: 'rgba(0, 0, 0, 0.1)'
  borderColor?: Array<String>;
  borderWidth?: number;
};

export interface ChartLineDatasetInterface {
  data: Array<number>;
  label?: string;
  backgroundColor?: Array<string>; // Default: 'rgba(0, 0, 0, 0.1)'
  borderAlign?: Enumerator<'center' | 'inner'>;
  borderColor?: Array<String>;
  borderDash?: Array<number>;
  borderDashOffset?: number;
  borderJoinStyle?: Enumerator<'round'|'bevel'|'miter'>;
  borderWidth?: number;
  fill?: boolean;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  hoverBoderJoinStyle?: Enumerator<'round'|'bevel'|'miter'>;
  hoverBorderWidth?: number;
  order?:number;
};

export interface ChartDoughnutDatasetInterface {
  data: Array<number>;
  label?: string;
  backgroundColor?: Array<string>; // Default: 'rgba(0, 0, 0, 0.1)'
  borderAlign?: Enumerator<'center'|'inner'>;
  borderColor?: Array<String>;
  borderWidth?: number;
  borderJoinStyle?: Enumerator<'round'|'bevel'|'miter'>;
  borderRadius?: number | object;
  circumference?: number;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  hoverBoderJoinStyle?: Enumerator<'round'|'bevel'|'miter'>;
  hoverBorderWidth?: number;
  hoverOffset?: number;
};

export interface ChartPieDatasetInterface {
  data: Array<number>;
  label?: string;
};

export interface ChartPolarAreaDatasetInterface {
  data: Array<number>;
  label?: string;
  backgroundColor?: Array<string>; // Default: 'rgba(0, 0, 0, 0.1)'
  borderAlign?: Enumerator<'center' | 'inner'>;
  borderColor?: Array<String>;
  borderJoinStyle?: Enumerator<'round'|'bevel'|'miter'>;
  borderWidth?: number;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  hoverBoderJoinStyle?: Enumerator<'round'|'bevel'|'miter'>;
  hoverBorderWidth?: number;
};

export interface ChartRadarDatasetInterface {
  data: Array<number>;
  label?: string;
  backgroundColor?: Array<string>; // Default: 'rgba(0, 0, 0, 0.1)'
  borderCapStyle?: string; 
  borderColor?: Array<string>;
  borderDash?: Array<string>;
  borderDashOffset?: number;
  borderJoinStyle?: Enumerator<'round'|'bevel'|'miter'>;
  borderWidth?: number;
  fill?: boolean;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  hoverBoderJoinStyle?: Enumerator<'round'|'bevel'|'miter'>;
  hoverBorderWidth?: number;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  pointHoverBackgroundColor?: string;
  pointHoverBorderColor?: string;
};

export interface ChartScatterDatasetInterface {
  data: [{
    x: number;
    y: number;
  }];
  label?: string;
  backgroundColor?: Array<string>; // Default: 'rgba(0, 0, 0, 0.1)'
};

export interface ChartMenuInterface {
  action: RequestInterface;
  label: string;
  dialog?: DialogInterface;
  icon?: string;
  validator?: string;
}