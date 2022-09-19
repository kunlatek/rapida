import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

const setChartControllerMethods = (object: MainInterface): string => {
  if (!object.chart) {
    console.info("Only charts set here");
    return ``;
  }

  let code = `
  ngOnChanges(): void {
    if (this.chartInput && this.chartInput.time !== "3") {
      this.mainFilter = \`\${
        this.chartInput.time
      }&companies=\${
        ((this.chartInput?.companies 
          && this.chartInput?.companies?.length < 1
        ) === null) 
        ? JSON.parse(
          JSON.parse(JSON.stringify(sessionStorage.getItem('companies')))
          ).map((item: any) => { return item.id; }).join()
        : this.chartInput.companies.join()
      }\`;
      this.set${TextTransformation.kebabfy(
    object.chart.id
  )}Service(this.mainFilter);
    }

    if (this.chartInput?.time === "3") {
      this.mainFilter = \`start_date=\${
        this.chartInput.startDate
      }&finish_date=\${
        this.chartInput.finishDate
      }&companies=\${
        ((this.chartInput?.companies 
          && this.chartInput?.companies?.length < 1
        ) === null) 
        ? JSON.parse(JSON.parse(
          JSON.stringify(sessionStorage.getItem('companies')))
          ).map((item: any) => { return item.id; }).join()
        : this.chartInput.companies.join()
      }\`;
      this.set${TextTransformation.kebabfy(
    object.chart.id
  )}Service(this.mainFilter)
    }
  }
  `;

  if (object.chart.line) {
    code += `
    ${object.chart.id}LineChartClicked = ({
      event,
      active,
    }: {
      event?: ChartEvent;
      active?: any;
    }): void => {
      this.chartFilterObject = this.${object.chart.id
      }DataSource.identifiers[active[0].index];
      this.chartFilter = "";
      for (const key in this.chartFilterObject) {
        if (Object.prototype.hasOwnProperty.call(this.chartFilterObject, key)) {
          const element = this.chartFilterObject[key];
          this.chartFilter += \`&\${key}=\${element}\`
        }
      }
      
      this.${object.chart.id}OpenDialog();
    };

    set${TextTransformation.kebabfy(
        object.chart.id
      )}Service = (filter: string = '') => {
      this.isLoading = true;
      this._${object.chart.id}Service.getAll(filter)
      .then((result: any) => {
        if (result.datasets) {
          result.datasets.map((object: any, index: number) => {
            for (const key in object) {
              if (Object.prototype.hasOwnProperty.call(object, key)) {
                const element = object[key];
                
                object.backgroundColor = this.${object.chart.id
      }Background[index];
                object.hoverBackgroundColor = this.${object.chart.id
      }Background[index];
              }
            }

            result.datasets.push(object);
          });

          this.${object.chart.id}DataSource = result;
        } else {
          this.${object.chart.id}DataSource = [];
        }
        this.isLoading = false;
        this.${object.chart.id}BarChartData.datasets = this.${object.chart.id
      }DataSource.datasets;
        this.${object.chart.id}BarChartData.labels = this.${object.chart.id
      }DataSource.labels;
      })
      .catch(async err => {
        if (err.error.logMessage === 'jwt expired') {
          await this.refreshToken();
          this.set${TextTransformation.kebabfy(object.chart.id)}Service();
        } else {
          const message = this._errorHandler.apiErrorMessage(err.error.message);
          this.isLoading = false;
          this._snackBarService.open(message);
        };
      });
    };
    `;
  }

  if (object.chart.bar) {
    code += `
    ${object.chart.id}BarChartClicked = ({
      event,
      active,
    }: {
      event?: ChartEvent;
      active?: any;
    }): void => {
      this.chartFilterObject = this.${object.chart.id}DataSource.identifiers[active[0].index];
      this.chartFilter = "";
      for (const key in this.chartFilterObject) {
        if (Object.prototype.hasOwnProperty.call(this.chartFilterObject, key)) {
          const element = this.chartFilterObject[key];
          this.chartFilter += \`&\${key}=\${element}\`
        }
      }
      
      this.${object.chart.id}OpenDialog();
    };
    `;

    if (object.chart.bar.datasets.length < 1) {
      code += `
      set${TextTransformation.kebabfy(
        object.chart.id
      )}Service = (filter: string = '') => {
        this.isLoading = true;
        this._${object.chart.id}Service.getAll(filter)
        .then((result: any) => {
          if (result.datasets) {
            result.datasets.map((object: any, index: number) => {
              for (const key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                  const element = object[key];
                  
                  object.backgroundColor = this.${object.chart.id
        }Background[index];
                  object.hoverBackgroundColor = this.${object.chart.id
        }Background[index];
                }
              }
  
              result.datasets.push(object);
            });
  
            this.${object.chart.id}DataSource = result;
          } else {
            this.${object.chart.id}DataSource = [];
          }
          this.isLoading = false;
          this.${object.chart.id}BarChartData.datasets = this.${object.chart.id
        }DataSource.datasets;
          this.${object.chart.id}BarChartData.labels = this.${object.chart.id
        }DataSource.labels;
        })
        .catch(async err => {
          if (err.error.logMessage === 'jwt expired') {
            await this.refreshToken();
            this.set${TextTransformation.kebabfy(object.chart.id)}Service();
          } else {
            const message = this._errorHandler.apiErrorMessage(err.error.message);
            this.isLoading = false;
            this._snackBarService.open(message);
          };
        });
      };
      `;
    }
  }

  if (object.chart.pie) {
    code += `
    ${object.chart.id}PieChartClicked = ({
      event,
      active,
    }: {
      event?: ChartEvent;
      active?: any;
    }): void => {
      this.chartFilterObject = this.${object.chart.id}DataSource.identifiers[active[0].index];
      this.chartFilter = "";
      for (const key in this.chartFilterObject) {
        if (Object.prototype.hasOwnProperty.call(this.chartFilterObject, key)) {
          const element = this.chartFilterObject[key];
          this.chartFilter += \`&\${key}=\${element}\`
        }
      }
      
      this.${object.chart.id}OpenDialog();
    };
    `;

    if (object.chart.pie.datasets.length < 1) {
      code += `
      set${TextTransformation.pascalfy(
        object.chart.id
      )}Service = (filter: string = '') => {
        this.isLoading = true;
        this._${object.chart.id}Service.getAll(filter)
        .then((result: any) => {
          if (result.datasets) {
            result.datasets.map((object: any, index: number) => {
              for (const key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                  const element = object[key];
                  
                  object.backgroundColor = this.${object.chart.id
        }Background[index];
                  object.hoverBackgroundColor = this.${object.chart.id
        }Background[index];
                  object.hoverBorderColor = this.${object.chart.id
        }Background[index];
                }
              }
  
              result.datasets.push(object);
            });
  
            this.${object.chart.id}DataSource = result;
          } else {
            this.${object.chart.id}DataSource = [];
          }
          
          this.isLoading = false;
          this.${object.chart.id}PieChartData.datasets = this.${object.chart.id
        }DataSource.datasets;
          this.${object.chart.id}PieChartData.labels = this.${object.chart.id
        }DataSource.labels;
        })
        .catch(async err => {
          if (err.error.logMessage === 'jwt expired') {
            await this.refreshToken();
            this.set${TextTransformation.pascalfy(object.chart.id)}Service();
          } else {
            const message = this._errorHandler.apiErrorMessage(err.error.message);
            this.isLoading = false;
            this._snackBarService.open(message);
          };
        });
      };
      `;
    }
  }

  return code;
};

export { setChartControllerMethods };
