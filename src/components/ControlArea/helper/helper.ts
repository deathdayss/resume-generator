import { SectionForm } from "../dataType";

export const changeFormIndex = (arr: SectionForm[], oldIndex: number, newIndex: number) => {
    const newArr: SectionForm[] = [];
    const minIndex = Math.min(oldIndex, newIndex);
    const maxIndex = Math.max(oldIndex, newIndex);
    for (let i = 0; i < arr.length; ++i) {
        let nextForm;
        if (i < minIndex || i > maxIndex) {
            nextForm = arr[i];
        }
        else if (i === newIndex) {
            nextForm = arr[oldIndex];
            nextForm = { ...nextForm, index: i };
        }
        else if (i >= minIndex) {
            nextForm = arr[oldIndex <= newIndex ? i + 1 : i - 1];
            nextForm = { ...nextForm, index: i };
        }
        if (nextForm) {
            newArr.push(nextForm);
        }
        else {
            throw new Error("changeIndex undefined nextForm");
        }
    }
    return newArr;
}

export const changeFormPropValue = (sectionForm: SectionForm, sectionForms: SectionForm[], propName: string, propValue: any) => {
    const newSectionForms = [...sectionForms];
    newSectionForms[sectionForm.index] = {...sectionForm, [propName]: propValue};
    return newSectionForms;
}