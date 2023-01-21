import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TableElementInterface } from "../../../../interfaces/table";

const setTableControllerProperties = ({ table }: MainInterface, mainArray: Array<MainInterface> | undefined): string => {
  if (!table) {
    console.info("Only tables set here");
    return ``;
  }

  const hasInfiniteScroll = table.infiniteScroll;

  let _displayedTableFields = ``;
  let _fieldToLabel = ``;

  table.elements.forEach((element: TableElementInterface) => {
    _displayedTableFields += `"${element.row.field}", `;
  });

  table.fieldsToLabels?.forEach((element: { label: string, field: string; }) => {
    _fieldToLabel += `{label: "${element.label}", field: "${element.field}"}, `;
  });

  if (table.formIdToFieldsToLabels) {
    const fieldsToLabelsArray = JSON.parse(JSON.stringify(mainArray));
    const formIdToFieldsToLabels = table.formIdToFieldsToLabels;
    fieldsToLabelsArray.forEach((object: any) => {
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          const element = object[key];
          if (key === "form") {
            if (element.id === formIdToFieldsToLabels) {
              for (let i = 0; i < element.elements.length; i++) {
                const e = element.elements[i];
                _fieldToLabel += setFieldToLabel(e);
              }
            }
          }
        }
      }
    });
  }

  let code = `
  ${table.id}Id: string = "";
  ${table.id}DisplayedColumns: string[] = [
    ${_displayedTableFields}
  ];
  ${(table.fieldsToLabels || table.formIdToFieldsToLabels
      ? `fieldToLabel: Array<{label: string, field: string}> = [${_fieldToLabel}];`
      : ``
    )}
  dataSource: ${hasInfiniteScroll ? 'InfiniteScrollTableDataSource' : ' any = []'};
  dataSourceShimmer: any[];
  ${table.id}SearchForm: FormGroup;
  isLoading = true;
  isCreatingXlsLoading = false;
  private _page!: number;
  ${hasInfiniteScroll ? `
  ITEM_SIZE = 50;
  @Input() _moduleRelated!: string;
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewPort!: CdkVirtualScrollViewport;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;

  offset!: number;

  private _pageCache = new Set<number>();
  
  `: ''}
  `;

  return code;
};

const setFieldToLabel = (
  element: FormElementInterface,
): string => {
  const formElements = [
    "input",
    "autocomplete",
    "button",
    "checkbox",
    "radio",
    "select",
    "slide",
  ];
  const type = Object.keys(element)[0];
  const value = Object.values(element)[0];

  let result = ``;

  if (formElements.includes(type)) {
    if (value.label && value.name) {
      result += `{label: "${value.label}", field: "${value.name}"}, `;
    }
  }

  if (element.array) {
    for (let i = 0; i < element.array.elements.length; i++) {
      const arrayElement = element.array.elements[i];
      result += setFieldToLabel(arrayElement);
    }
  }

  if (element.tabs) {
    for (let i = 0; i < element.tabs.length; i++) {
      const tab = element.tabs[i];
      for (let i = 0; i < tab.elements.length; i++) {
        const tabElement = tab.elements[i];
        result += setFieldToLabel(tabElement);
      }
    }
  }

  return result;
};

export { setTableControllerProperties };
