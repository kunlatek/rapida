import { MainInterface } from "../../../../interfaces/main";
import { TableElementInterface } from "../../../../interfaces/table";
import { TextTransformation } from "../../../../utils/text.transformation";

let _hasRemoveConfirmationDialog: boolean = false;

const setTableControllerMethods = (object: MainInterface): string => {
  if (!object.table) {
    console.info("Only tables set here");
    return ``;
  }

  let _methods = ``;

  object.table.elements.forEach((element) => {
    verifyTableElement(object, element);
  });

  let code = `
  ${_methods}
  
  ${object.table.id}Search(${object.table.id}Directive: FormGroupDirective) {
    this.isLoading = true;
    const filter = \`?filter={"or":[\${
      this.${object.table.id}DisplayedColumns.map(
        (element: string) => {
          if (element !== "undefined") {
            return \`{"\${element}":{"like": "\${
              this.${object.table.id}SearchForm.value.searchInput
            }", "options": "i"}}\`;
          }
          return "";
        }
      )
    }]}\`;

    this.set${TextTransformation.pascalfy(
      object.table.id
    )}Service(filter.replace("},]", "}]"));

    this.${object.table.id}SearchForm.reset();
    ${object.table.id}Directive.resetForm();
  };

  set${TextTransformation.pascalfy(
    object.table.id
  )}Service = (filter: string = "") => {
    this._${object.table.id}Service
      .getAll(filter)
      .then((result: any) => {
        this.${object.table.id}DataSource = result.data.result;
        this.isLoading = false;
      })
      .catch(async (err: any) => {
        if (err.error.logMessage === "jwt expired") {
          await this.refreshToken();
          this.set${TextTransformation.pascalfy(object.table.id)}Service();
        } else {
          const message = this._errorHandler.apiErrorMessage(err.error.message);
          this.isLoading = false;
          this.sendErrorMessage(message);
        }
      });
  };

  ${
    _hasRemoveConfirmationDialog
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
                this.${object.table.id}Id !== ""
                  ? this._router.url.split(\`/\${this.${object.table.id}Id}\`)[0]
                  : this._router.url;
              this.isLoading = true;
              await this._${object.table.id}Service.delete(res.id);
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

  ${
    object.table.service?.hasAuthorization
      ? `
    refreshToken = async () => {
      try {
        const res: any = await this._${object.table.id}Service.refreshToken();
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

  ${
    _hasRemoveConfirmationDialog
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
  `;

  return code;
};

const verifyTableElement = (
  object: MainInterface,
  element: TableElementInterface
) => {
  if (!object.table) {
    console.info("Only tables set here");
    return ``;
  }

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
