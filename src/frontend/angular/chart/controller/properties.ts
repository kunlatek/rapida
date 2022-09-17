import { MainInterface } from "../../../../interfaces/main";

const setChartControllerProperties = (object: MainInterface): string => {
  if (!object.chart) {
    console.info("Only charts set here");
    return ``;
  }

  let code = `
  ${object.chart.id}Id: string = '';
  ${object.chart.id}DataSource: any = [];
  ${object.chart.id}SearchForm: FormGroup;
  mainFilter: string = \`start_date=\${
    new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split("T")[0]
  }&finish_date=\${
    new Date().toISOString().split("T")[0]
  }&companies=\${
    JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem('companies')))).map((item: any) => { return item.id; }).join()
  }\`;
  chartFilter: string = "";
  chartFilterObject: any[] = [];
  isLoading = true;
  @Input() chartInput: any = "";
  `;

  if (object.chart.line) {
    code += `
    ${object.chart.id}LineChartData: ChartConfiguration["data"] = {
      datasets: ${JSON.stringify(object.chart.line.datasets)},
      labels: ${JSON.stringify(object.chart.line.labels)},
    };

    ${object.chart.id}LineChartOptions: ChartConfiguration["options"] = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Definir título",
          font: {
            size: 18
          }
        }
      },
      elements: {
        line: {
          tension: ${object.chart.line.tension ? object.chart.line.tension : 0.5
      },
        },
      },
      scales: {
        x: {},
        "y-axis-0": {
          position: "left",
        },
        "y-axis-1": {
          position: "right",
          grid: {
            color: "rgba(255,0,0,0.3)",
          },
          ticks: {
            color: "red",
          },
        },
      },
    };

    ${object.chart.id}LineChartType: ChartType = "line";
    `;
  }

  if (object.chart.bar) {
    code += `
    ${object.chart.id}BarChartData: ChartConfiguration["data"] = {
      datasets: ${JSON.stringify(object.chart.bar.datasets)},
      labels: ${JSON.stringify(object.chart.bar.labels)},
    };

    ${object.chart.id}Background: Array<string> = ${object.chart.bar.backgroundColor
        ? object.chart.bar.backgroundColor
        : `["#1F7AFF", "#85B7FF", "#B8D5FF"]`
      };

    ${object.chart.id}BarChartOptions: ChartConfiguration["options"] = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Definir título",
          font: {
            size: 18
          }
        }
      },
      scales: {
        x: {},
        y: {
          min: 0
        }
      },
    };

    ${object.chart.id}BarChartType: ChartType = "bar";
    `;
  }

  if (object.chart.pie) {
    code += `
    ${object.chart.id
      }PieChartData: ChartData<"pie", number[], string | string[]> = {
      datasets: ${JSON.stringify(object.chart.pie.datasets)},
      labels: ${JSON.stringify(object.chart.pie.labels)},
    };

    ${object.chart.id}Background: Array<string> = ${object.chart.pie.backgroundColor
        ? object.chart.pie.backgroundColor
        : `["#1F7AFF", "#85B7FF", "#B8D5FF"]`
      };

    ${object.chart.id}PieChartOptions: ChartConfiguration["options"] = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Definir título",
          font: {
            size: 18
          }
        }
      },
    };

    ${object.chart.id}PieChartType: ChartType = "pie";
    `;
  }

  return code;
};

export { setChartControllerProperties };
