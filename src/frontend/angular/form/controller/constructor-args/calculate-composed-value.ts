import { ArrayInterface, FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";
import { TextTransformation } from "../../../../../utils/text.transformation";

const setCalculateComposedValue = (
    object: MainInterface,
    formElements: FormElementInterface[],
    array: ArrayInterface | undefined = undefined
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
                element.array.id
            );
        }

        if (element.input && element.input.composedValue) {
            const pascalName: string = TextTransformation.pascalfy(element.input.name);

            let fields = ``;
            element.input.composedValue.fields.forEach((field: string) => fields += `this.${objectId}Form.get('${field}')?.value,`);

            code += `
                const composedValue_${pascalName} = calculate({
                    operator: '${element.input.composedValue.operator}' as MathOperatorEnum,
                    elements: [${fields}],
                    ${element.input.composedValue.roundTo ? `roundTo: ${element.input.composedValue.roundTo},` : ``}
                });
                this.${objectId}Form.get('${element.input.name}')?.setValue(composedValue_${pascalName});
            `;
        }
    });

    return code;
};

export {
    setCalculateComposedValue
};
