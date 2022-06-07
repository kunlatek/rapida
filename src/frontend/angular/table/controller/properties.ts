import { MainInterface } from "../../../../interfaces/main";
import { TableElementInterface } from "../../../../interfaces/table";

const setTableControllerProperties = (object: MainInterface): string => {
  if (!object.table) {
    console.info("Only tables set here");
    return ``;
  }

  let _displayedTableFields = ``;

  object.table.elements.forEach((element: TableElementInterface) => {
    _displayedTableFields += `"${element.row.field}", `;
  });

  let code = `
  ${object.table.id}Id: string = "";
  ${object.table.id}DisplayedColumns: string[] = [
    ${_displayedTableFields}
  ];
  ${object.table.id}DataSource: any = [];
  ${object.table.id}SearchForm: FormGroup;
  isLoading = true;
  `;

  return code;
};

export { setTableControllerProperties };
