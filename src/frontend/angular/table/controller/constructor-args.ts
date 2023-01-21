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
    this.sendErrorMessage(message);
  }
  ${hasInfiniteScroll ? '' : `this._setFiltersParams();`}
  
  this.dataSourceShimmer = new Array(10).fill(1).map(el => {return  {${table.elements.filter(el => el.row.field !== 'actions').reduce((prev, current) => prev += `${current.row.field}:null, `, '')}}});
  
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
