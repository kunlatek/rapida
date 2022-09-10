import { MainInterface } from "../../../../interfaces/main";
import { TableElementInterface } from "../../../../interfaces/table";

const setTableControllerProperties = ({ table }: MainInterface): string => {
  if (!table) {
    console.info("Only tables set here");
    return ``;
  }

  const hasInfiniteScroll = table.infiniteScroll;

  let _displayedTableFields = ``;

  table.elements.forEach((element: TableElementInterface) => {
    _displayedTableFields += `"${element.row.field}", `;
  });

  let code = `
  ${table.id}Id: string = "";
  ${table.id}DisplayedColumns: string[] = [
    ${_displayedTableFields}
  ];
  ${table.id}DataSource: any = [];
  ${table.id}SearchForm: FormGroup;
  isLoading = true;
  ${hasInfiniteScroll ? `
  dataSource: InfiniteScrollTableDataSource;
  ITEM_SIZE = 50;

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewPort!: CdkVirtualScrollViewport;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;

  offset!: number;

  private _pageCache = new Set<number>();

  `: ''}
  `;

  return code;
};

export { setTableControllerProperties };
