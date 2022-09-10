import { MainInterface } from "../../../../interfaces/main";
import { TextTransformation } from "../../../../utils/text.transformation";

const setTableControllerConstructorArguments = (
  { table }: MainInterface
): string => {
  if (!table) {
    console.info("Only tables set here");
    return ``;
  }
  const hasInfiniteScroll = table.infiniteScroll;
  const code = `
  this.${table.id}SearchForm = this._formBuilder.group({
    searchInput: [null, []],
  });
  try {
    this._activatedRoute.params.subscribe(async (routeParams) => {
      this.${table.id}Id = routeParams["id"];
    });
  } catch (error: any) {
    const message = this._errorHandler.apiErrorMessage(error.message);
    this.sendErrorMessage(message);
  }
  ${hasInfiniteScroll ? '' : `this.set${TextTransformation.pascalfy(table.id)}Service();`}
  
  ${hasInfiniteScroll ? `
  this.dataSource = new InfiniteScrollTableDataSource();
  this.dataSource.page$.subscribe((page: string) => {
      if (!page) {
        return;
      }
      if (this._pageCache.has(+page)) {
        return;
      }
      this._pageCache.add(+page);
      this.set${TextTransformation.pascalfy(
    table.id
  )}Service(page);
    });
  ` : ''}
  `;

  return code;
};

export { setTableControllerConstructorArguments };
