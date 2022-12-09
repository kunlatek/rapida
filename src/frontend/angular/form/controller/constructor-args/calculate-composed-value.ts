import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";

const setCalculateComposedValue = (
    object: MainInterface,
    formElements: FormElementInterface[],
    arrayId?: string,
): string => {
    const objectId = object.form?.id;

    let code = ``;
    formElements.forEach((element: any) => {
        if (element.tabs) {
            element.tabs.forEach((tabElement: any) => {
                code += setCalculateComposedValue(object, tabElement.elements);
            });
        }

        if (element.array) {
            code += setCalculateComposedValue(
                object,
                element.array.elements,
                element.array.id,
            );
        }

        if (element.input && element.input.composedValue) {
            const pascalName: string = TextTransformation.pascalfy(element.input.name);

            if (!arrayId) {
                let fields = ``;
                element.input.composedValue.fields.forEach((field: string) => fields += `this.${objectId}Form.get('${field}')?.value,`);

                code += `
                    const composedValue${pascalName} = calculate({
                        operator: '${element.input.composedValue.operator}' as MathOperatorEnum,
                        elements: [${fields}],
                        ${element.input.composedValue.roundTo ? `roundTo: ${element.input.composedValue.roundTo},` : ``}
                    });
                    this.${objectId}Form.get('${element.input.name}')?.setValue(composedValue${pascalName});
                `;
            } else {
                let fields = ``;
                element.input.composedValue.fields.forEach((field: string) => fields += `'${field}',`);

                code += `
                    const composedValue${pascalName} = calculateArray({ array: [...form.${arrayId}], fieldsArray: [${fields}], composedField: '${element.input.name}', operator: '${element.input.composedValue.operator}' as MathOperatorEnum, ${element.input.composedValue.roundTo ? `roundTo: ${element.input.composedValue.roundTo},` : ``}  })
                    if (composedValue${pascalName} !== this.${objectId}Form.get('${arrayId}')?.value)
                        this.${objectId}Form.get('${arrayId}')?.setValue([...composedValue${pascalName}]);
                `;
            }

        }
    });

    return code;
};

export {
    setCalculateComposedValue
};
