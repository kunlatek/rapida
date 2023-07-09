import { FormInputTypeEnum } from "../../../../../enums/form";
import { FormElementInterface } from "../../../../../interfaces/form";
import { MainInterface } from "../../../../../interfaces/main";

const setWysiwygConfig = (
    object: MainInterface
) => {
    if (!object.form) {
        return "";
    }

    if (hasWysiwyg(object.form.elements)) {
        return `config = {
            placeholder: '',
            tabsize: 2,
            height: 200,
            with: '100%',
            toolbar: [
            ['misc', ['codeview', 'undo', 'redo']],
            // ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
            ['fontsize', ['fontname', 'fontsize', 'color']],
            ['para', ['ul', 'ol', 'paragraph', 'height']],
            ['insert', ['table', 'picture', 'link', 'video', 'hr']]
            ],
            fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
        };`;
    }

    return ``;
};

const hasWysiwyg = (
    elements: Array<FormElementInterface>
): boolean => {
    let hasWysiwygFlag = false;

    elements.every((element: FormElementInterface) => {
        if (element.input?.type === FormInputTypeEnum.Wysiwyg) {
            hasWysiwygFlag = true;
            return false;
        }

        if (element.array) {
            hasWysiwygFlag = hasWysiwyg(element.array.elements);
            return !hasWysiwygFlag;
        }

        return true;
    });

    return hasWysiwygFlag;
};

export {
    setWysiwygConfig
};
