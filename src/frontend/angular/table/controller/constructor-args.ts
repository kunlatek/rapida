import { MainInterface } from "../../../../interfaces/main";

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
    this._snackBarService.open(message);
  }
  ${hasInfiniteScroll ? '' : `this._setFiltersParams();`}
  
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
      this._page = +page - 1;
      this._setFiltersParams(true);
    });
  ` : ''}
  `;

  return code;
};

export { setTableControllerConstructorArguments };
