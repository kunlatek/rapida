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
    let httpParams = new HttpParams();
    const valueToSearch = this.${table.id}SearchForm.value.searchInput;
    if (this._page) {
      httpParams = httpParams.append('page', this._page);
    }
    if (valueToSearch) {
      const filtersToAppend = this._setSearchFilters(valueToSearch);
      httpParams = httpParams.append('filter', filtersToAppend);
    }
    this.set${TextTransformation.pascalfy(table.id)}Service(httpParams, isPagination);
  }
  
  private _setSearchFilters(valueToSearch: string) {
    const filters = this.${table.id}DisplayedColumns.filter((col) => col !== 'actions').reduce((previous: any, current) => {
      const param = {
        [current]: {
          like: valueToSearch,
        }
      };
      previous.or.push(param);
      return previous;
    }, {
      or: []
    });

    return JSON.stringify(filters);
  }

  set${TextTransformation.pascalfy(
    table.id
  )}Service = (params: HttpParams, isPagination: boolean) => {
    this._${table.id}Service
      .getAll(params)
      .then((result: any) => {
        const currentData = ${hasInfiniteScroll ? 'this.dataSource.matTableDataSource.data' : 'this.dataSource'}
        let newData = [...result.data.result];
        if (isPagination) {
          newData = [...newData, ...currentData];
          ${hasInfiniteScroll ? 'this.dataSource.pages = (result.data.total / 50) + 1' : ''};
        }
        ${hasInfiniteScroll ? 'this.dataSource.matTableDataSource.data' : 'this.dataSource'} = newData;
        this.isLoading = false;
      })
      .catch(async (err: any) => {
        if (err.error.logMessage === "jwt expired") {
          await this.refreshToken();
          this._setFiltersParams();
        } else {
          const message = this._errorHandler.apiErrorMessage(err.error.message);
          this.isLoading = false;
          this.sendErrorMessage(message);
        }
      });
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
    redirectTo = (uri: string) => {
      this._router
        .navigateByUrl("/main", { skipLocationChange: true })
        .then(() => {
          this._router.navigate([uri]);
        });
    };
    `
      : ``
    }

  sendErrorMessage = (errorMessage: string) => {
    this._snackbar.open(errorMessage, undefined, { duration: 4 * 1000 });
  };
  ${hasInfiniteScroll ? `
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
      // console.log(range);
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
  }`: ''}
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
