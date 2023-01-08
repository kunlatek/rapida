import { MainInterface } from "../../../../interfaces/main";
import { TableElementInterface } from "../../../../interfaces/table";
import { TextTransformation } from "../../../../utils/text.transformation";

let _hasRemoveConfirmationDialog: boolean = false;

const setTableControllerMethods = ({ table }: MainInterface): string => {
  if (!table) {
    console.info("Only tables set here");
    return ``;
  }

  const hasInfiniteScroll = table.infiniteScroll;
  let _methods = ``;

  table.elements.forEach((element) => {
    verifyTableElement(element);
  });

  let code = `
  ${_methods}

  _setFiltersParams(isPagination = false) {
    this.isLoading = true;
    let httpParams = new HttpParams();
    const valueToSearch = this.${table.id}SearchForm.value.searchInput;
    if (this._page) {
      httpParams = httpParams.append('page', this._page);
    }
    if (valueToSearch) {
      const filtersToAppend = this._setSearchFilters(valueToSearch);
      httpParams = httpParams.append('filters', filtersToAppend);
    }
    httpParams = httpParams.append('order_by', '_createdAt DESC');
    this.set${TextTransformation.pascalfy(
    table.id
  )}Service(httpParams, isPagination);
  }
  
  private _setSearchFilters(valueToSearch: string) {
    const filters = this.${table.id
    }DisplayedColumns.filter((col) => col !== 'actions').reduce((previous: any, current) => {
      if (current !== "undefined") {
        const param = {
          [current]: {
            $regex: valueToSearch,
            $options: "i"
          }
        };
        previous.$or.push(param);
      }
      return previous;
    }, {
      $or: []
    });

    return JSON.stringify(filters);
  }

  set${TextTransformation.pascalfy(
      table.id
    )}Service = async (params: HttpParams, isPagination: boolean) => {
    try {
      this.isLoading = true;
      // const result: any = await lastValueFrom(this._${table.id}Service.getAll(params));
      const result: any = await this._${table.id}Service.getAll(params);
      const currentData = ${hasInfiniteScroll
      ? "this.dataSource.matTableDataSource.data"
      : "this.dataSource"
    }
        let newData = [...result.data.result];
        if (isPagination) {
          newData = [...currentData,...newData];
          ${hasInfiniteScroll
      ? "this.dataSource.pages = (result.data.total / 50) + 1"
      : ""
    };
        }
        ${hasInfiniteScroll
      ? "this.dataSource.matTableDataSource.data"
      : "this.dataSource"
    } = newData;
        this.isLoading = false;
    } catch (error: any) {
      if (error.logMessage === "jwt expired") {
          await this.refreshToken();
          this._setFiltersParams();
        } else {
          const message = this._errorHandler.apiErrorMessage(error.message);
          this.isLoading = false;
          this.sendErrorMessage(message);
        }
    }
  };

  ${_hasRemoveConfirmationDialog
      ? `
    removeConfirmationDialogOpenDialog = (id: string) => {
      const removeConfirmationDialogDialogRef = this._dialog.open(
        RemoveConfirmationDialogComponent,
        { data: { id: id } }
      );
      removeConfirmationDialogDialogRef
        .afterClosed()
        .subscribe(async (res: any) => {
          if (res) {
            try {
              const routeToGo =
                this.${table.id}Id !== ""
                  ? this._router.url.split(\`/\${this.${table.id}Id}\`)[0]
                  : this._router.url;
              this.isLoading = true;
              // await lastValueFrom(this._${table.id}Service.delete(res.id));
              await this._${table.id}Service.delete(res.id);
              this.redirectTo(routeToGo);
              this.isLoading = false;
            } catch (error: any) {
              const message = this._errorHandler.apiErrorMessage(
                error.message
              );
              this.sendErrorMessage(message);
            }
          }
        });
    };
    `
      : ``
    }

  ${table.service?.hasAuthorization
      ? `
    refreshToken = async () => {
      try {
        // const res: any = await lastValueFrom(this._${table.id}Service.refreshToken());
        const res: any = await this._${table.id}Service.refreshToken();
        if (res) {
          sessionStorage.setItem("token", res?.data.authToken);
          sessionStorage.setItem("refreshToken", res?.data.authRefreshToken);
        }
      } catch (error: any) {
        const message = this._errorHandler.apiErrorMessage(error.message);
        this.isLoading = false;
        this.sendErrorMessage(message);
        sessionStorage.clear();
        this._router.navigate(["/"]);
      }
    };
    `
      : ""
    }

  ${_hasRemoveConfirmationDialog
      ? `
      
      redirectTo = async (uri: string) => {
        try {
          await this._router.navigateByUrl('/main', { skipLocationChange: true });
          this._router.navigate([uri]);
        } catch (error: any) {
          const message = this._errorHandler.apiErrorMessage(error.message);
          this.sendErrorMessage(message);
        }
      };
      `
      : ``
    }

  ${table.fieldsToLabels || table.formIdToFieldsToLabels
      ? `
      createXls = async () => {
        let httpParams = new HttpParams();
        this.isCreatingXlsLoading = true;
        httpParams = httpParams.append('no_limit', 'true');
        const valueToSearch = this.${table.id}SearchForm.value.searchInput;

        if (valueToSearch) {
          const filtersToAppend = this._setSearchFilters(valueToSearch);
          httpParams = httpParams.append('filters', filtersToAppend);
        }

        const objects: any = await this._${table.id}Service.getAll(httpParams);
        this.isCreatingXlsLoading = false;
        let data = objects.data.result.map((object: any) => {
          for (const key in object) {
            let newStringToObject: string = '';
            if (Object.prototype.hasOwnProperty.call(object, key)) {
              let element = object[key];
              if (typeof element === 'object') {
                newStringToObject += this.treatPopulatedPropertyToXls(element);
              }
            }

            if (newStringToObject && newStringToObject != '') {
              object[key] = newStringToObject;
            }
          }

          return this.setNewObject(object);
        });
        const fileName = \`${table.title
        ? table.title + "-${Date.now()}"
        : "download-${Date.now()}"
      }\`;
        const exportType = exportFromJSON.types.xls;

        exportFromJSON({ data, fileName, exportType });        
      };

      treatPopulatedPropertyToXls = (newObject: any): string => {
        let newStringToObject: string = "";
        if (!Array.isArray(newObject)) {
          for (const newKey in newObject) {
            if (Object.prototype.hasOwnProperty.call(newObject, newKey)) {
              const newElement = newObject[newKey];
              if ((typeof newElement === "string") && (newKey.substring(0, 1) !== "_")) {
                newStringToObject += \`\${newElement} | \`;
              }
            }
          }
        }

        if (Array.isArray(newObject)) {
          newObject.forEach(newObjectElement => {
            for (const newKey in newObjectElement) {
              if (Object.prototype.hasOwnProperty.call(newObjectElement, newKey)) {
                const newElement = newObjectElement[newKey];
                if ((typeof newElement === "string") && (newKey.substring(0, 1) !== "_")) {
                  newStringToObject += \`\${newElement} | \`;
                }
              }
            }
          });
        }

        return newStringToObject;
      };

      setNewObject = (object: any) => {
        const newObject: any = {};
        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            const value = object[key];
            this.fieldToLabel.map(property => {
              let propertyLabel = "";
              if (property.field === key) {            
                propertyLabel = property.label;
                newObject[propertyLabel] = value;
              }
            })
          }
        }
        
        return newObject;
      };
      `
      : ``
    }
  
  sendErrorMessage = (errorMessage: string) => {
    this._snackbar.open(errorMessage, undefined, { duration: 4 * 1000 });
  };
  ${hasInfiniteScroll
      ? `
  ngOnInit() {
    this._initSorting();
    this.dataSource.attach(this.viewPort);

    this.viewPort.scrolledIndexChange
      .pipe(
        map(() => (this.viewPort?.getOffsetToRenderedContentStart() || 0) * -1),
        distinctUntilChanged(),
      )
      .subscribe(offset => (this.offset = offset));

    this.viewPort.renderedRangeStream.subscribe(range => {
      this.offset = range.start * -this.ITEM_SIZE;
    });
  }

  private _initSorting() {
    this.dataSource.matTableDataSource.sort = this.matSort;

    const originalSortingDataAccessor = this.dataSource.matTableDataSource
      .sortingDataAccessor;

    this.dataSource.matTableDataSource.sortingDataAccessor = (
      data: any,
      sortHeaderId: string
    ) => {

      return originalSortingDataAccessor(data, sortHeaderId);
    };
  }`
      : ""
    }
  `;

  return code;
};

const verifyTableElement = (element: TableElementInterface) => {
  let code = ``;

  if (element.row.menu) {
    element.row.menu.forEach((menuElement) => {
      if (menuElement.dialog) {
        if (menuElement.dialog?.id === "removeConfirmationDialog") {
          _hasRemoveConfirmationDialog = true;
        }
      }
    });
  }

  return code;
};

export { setTableControllerMethods };
