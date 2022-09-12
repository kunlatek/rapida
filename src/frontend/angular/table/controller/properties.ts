import { FormElementInterface } from "../../../../interfaces/form";
import { MainInterface } from "../../../../interfaces/main";
import { TableElementInterface } from "../../../../interfaces/table";

const setTableControllerProperties = (object: MainInterface, mainArray: Array<MainInterface> | undefined = undefined,): string => {
  if (!object.table) {
    console.info("Only tables set here");
    return ``;
  }

  let _displayedTableFields = ``;
  let _fieldToLabel = ``;

  object.table.elements.forEach((element: TableElementInterface) => {
    _displayedTableFields += `"${element.row.field}", `;
  });

  object.table.fieldsToLabels?.forEach((element: {label: string, field: string}) => {
    _fieldToLabel += `{label: "${element.label}", field: "${element.field}"}, `;
  });

  if (object.table.formIdToFieldsToLabels) {
    const fieldsToLabelsArray = JSON.parse(JSON.stringify(mainArray));
    const formIdToFieldsToLabels = object.table.formIdToFieldsToLabels;
    fieldsToLabelsArray.forEach((object: any) => {
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          const element = object[key];
          if (key === "form") {
            if(element.id === formIdToFieldsToLabels) {
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
  ${object.table.id}Id: string = "";
  ${object.table.id}DisplayedColumns: string[] = [
    ${_displayedTableFields}
  ];
  ${(object.table.fieldsToLabels || object.table.formIdToFieldsToLabels 
    ? `fieldToLabel: Array<{label: string, field: string}> = [${_fieldToLabel}];` 
    : ``
  )}
  ${object.table.id}DataSource: any = [];
  ${object.table.id}SearchForm: FormGroup;
  isLoading = true;
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
}

export { setTableControllerProperties };
