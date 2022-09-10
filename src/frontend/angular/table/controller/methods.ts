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
  
  ${table.id}Search(${table.id}Directive: FormGroupDirective) {
    this.isLoading = true;
    const filter = \`?filter={"or":[\${
      this.${table.id}DisplayedColumns.map(
        (element: string) => {
          if (element !== "undefined") {
            return \`{"\${element}":{"like": "\${
              this.${table.id}SearchForm.value.searchInput
            }", "options": "i"}}\`;
          }
          return "";
        }
      )
    }]}\`;

    this.set${TextTransformation.pascalfy(
    table.id
  )}Service(filter.replace("},]", "}]"));

    this.${table.id}SearchForm.reset();
    ${table.id}Directive.resetForm();
  };

  set${TextTransformation.pascalfy(
    table.id
  )}Service = (filter: string = "") => {
    this._${table.id}Service
      .getAll(filter)
      .then((result: any) => {
        ${hasInfiniteScroll ? `
        this.dataSource.matTableDataSource.data = [...this.dataSource.matTableDataSource.data,...result.data.result];
        this.dataSource.pages = (result.data.total/50) + 1;
        `
      : `this.${table.id}DataSource = result.data.result;`}
        this.isLoading = false;
      })
      .catch(async (err: any) => {
        if (err.error.logMessage === "jwt expired") {
          await this.refreshToken();
          this.set${TextTransformation.pascalfy(table.id)}Service();
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
