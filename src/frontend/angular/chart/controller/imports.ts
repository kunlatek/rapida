import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

const setChartControllerImports = (object: MainInterface): string => {
  if (!object.chart) {
    console.info("Only charts set here");
    return ``;
  }

  let code = `
  import { Component, Input, OnChanges, } from "@angular/core";
  import { SnackBarService } from "src/app/modules/shared/services/snackbar.service";
  import { MatDialog } from "@angular/material/dialog";
  import { ${TextTransformation.pascalfy(
    object.chart.id
  )}Service } from "./${TextTransformation.kebabfy(object.chart.id)}.service";
  import { ActivatedRoute, Router } from "@angular/router";
  import { MyErrorHandler } from "../../utils/error-handler";
  import { GenericAnalyticReportComponent } from "../generic-analytic-report/generic-analytic-report.component";
  import { TextTransformation } from "../../../../utils/text.transformation";
  `;

  if (object.chart.line) {
    code += `      
    import { ChartConfiguration, ChartEvent, ChartType } from "chart.js";
    `;
  }

  if (object.chart.bar) {
    code += `      
    import { ChartConfiguration, ChartEvent, ChartType, ChartData } from "chart.js";
    `;
  }

  if (object.chart.pie) {
    code += `      
    import { ChartConfiguration, ChartEvent, ChartType, ChartData } from "chart.js";
    `;
  }

  return code;
};

export { setChartControllerImports };
