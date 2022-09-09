import * as fs from "fs";
import * as chp from "child_process";
import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

let _specificStructure: string = "";

/**
 * SET CODE
 * @param object
 * @returns
 */
const setChartTemplate = (object: MainInterface, mainArray: Array<MainInterface> | undefined = undefined,): string => {
  if (!object.chart) {
    console.info("Only charts set here");
    return ``;
  }

  const hasChartTitle = object.chart.title
    ? `<mat-card-title>${object.chart.title}</mat-card-title>`
    : "";

  const hasChartSubtitle = object.chart.subtitle
    ? `<mat-card-subtitle>${object.chart.subtitle}</mat-card-subtitle>`
    : "";

  _specificStructure += setSpecificStructure(object);

  let code = `
  <mat-card *ngIf="${object.chart.id}DataSource.datasets && ${object.chart.id}DataSource?.datasets?.length > 0">
    <mat-card-header>
      ${hasChartTitle}
      ${hasChartSubtitle}
    </mat-card-header>

    <mat-card-content>
      <div *ngIf="isLoading" class="loading">
        <mat-progress-bar color="primary" mode="buffer">
        </mat-progress-bar>
      </div>
      ${_specificStructure}
    </mat-card-content>
  </mat-card>
  `;

  setChartTemplateArchitectureAndWriteToFile(object, code);
  return code;
};

// SET SPECIFIC STRUCTURE
const setSpecificStructure = (object: MainInterface) => {
  if (!object.chart) {
    console.info("Only charts set here");
    return ``;
  }
  let code = ``;

  if (object.chart.bar) {
    code += `
    <div *ngIf="!isLoading">
      <canvas baseChart width="300" height="300"
              [data]="${object.chart.id}BarChartData"
              [options]="${object.chart.id}BarChartOptions"
              [type]="${object.chart.id}BarChartType"
              (chartClick)="${object.chart.id}BarChartClicked($event)">
      </canvas>
    </div>
    `;
  }

  if (object.chart.bubble) {
    code += `
    <div *ngIf="!isLoading">
      <canvas baseChart width="300" height="300"
              [data]="${object.chart.id}BubbleChartData"
              [options]="${object.chart.id}BubbleChartOptions"
              [type]="${object.chart.id}BubbleChartType"
              [legend]="true">
      </canvas>
    </div>
    `;
  }

  if (object.chart.doughnut) {
    code += `
    <div *ngIf="!isLoading">
      <canvas baseChart width="300" height="300"
              [data]="${object.chart.id}DoughnutChartData"
              [type]="${object.chart.id}DoughnutChartType">
      </canvas>
    </div>
    `;
  }

  if (object.chart.line) {
    code += `
    <div *ngIf="!isLoading">
      <canvas baseChart width="300" height="300"
              [data]="${object.chart.id}LineChartData"
              [options]="${object.chart.id}LineChartOptions"
              [type]="${object.chart.id}LineChartType"
              (chartClick)="${object.chart.id}LineChartClicked($event)">
      </canvas>
    </div>
    `;
  }

  if (object.chart.pie) {
    code += `
    <div *ngIf="!isLoading">
      <canvas baseChart width="300" height="300"
              [data]="${object.chart.id}PieChartData"
              [options]="${object.chart.id}PieChartOptions"
              [type]="${object.chart.id}PieChartType"
              (chartClick)="${object.chart.id}PieChartClicked($event)">
      </canvas>
    </div>
    `;
  }

  if (object.chart.polarArea) {
    code += `
    <div *ngIf="!isLoading">
      <canvas baseChart width="300" height="300"
          [data]="${object.chart.id}PolarAreaChartData"
          [options]="${object.chart.id}PolarAreaChartOptions"
          [type]="${object.chart.id}PolarAreaChartType">
      </canvas>
    </div>
    `;
  }

  if (object.chart.radar) {
    code += `
    <div *ngIf="!isLoading">
      <canvas baseChart width="300" height="300"
              [data]="${object.chart.id}RadarChartData"
              [options]="${object.chart.id}RadarChartOptions"
              [type]="${object.chart.id}RadarChartType">
      </canvas>
    </div>
    `;
  }

  if (object.chart.scatter) {
    code += `
    <div *ngIf="!isLoading">
      <canvas baseChart width="300" height="300"
              [data]="${object.chart.id}ScatterChartData"
              [options]="${object.chart.id}ScatterChartOptions"
              [type]="${object.chart.id}ScatterChartType">
      </canvas>
    </div>
    `;
  }

  return code;
};

/**
 * JOIN CODE AND ARCHITECTURE
 * @param object
 * @param code
 */
const setChartTemplateArchitectureAndWriteToFile = (
  object: MainInterface,
  code: string
) => {
  if (!object.chart) {
    return "";
  }

  const filePath = `${
    object.projectPath
  }/src/app/components/${TextTransformation.kebabfy(
    object.chart.id
  )}/${TextTransformation.kebabfy(object.chart.id)}.component.html`;

  try {
    fs.writeFileSync(filePath, code);
    console.info(
      `File ${TextTransformation.kebabfy(object.chart.id)} already exists.`
    );
    console.info(`File successfully written in ${filePath}.`);
  } catch (error) {
    console.info(
      `File ${TextTransformation.kebabfy(object.chart.id)} doesn't exist.`
    );

    try {
      chp.execSync(
        `ng g c components/${TextTransformation.kebabfy(
          object.chart.id
        )} --skip-import`,
        { cwd: object.projectPath }
      );
    } catch (error) {
      console.warn(error);
    }

    fs.writeFileSync(filePath, code);

    console.info(`File successfully created in ${filePath}.`);
  }
};

export { setChartTemplate };
