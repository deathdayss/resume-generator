import { SectionForm } from "../ControlArea/dataType";

export const changePropsValue = (targetObj: { [name: string]: any }, repalceObj: { [name: string]: any }) => {
    const newTargetObj = { ...targetObj }
    for (let key in repalceObj) {
        newTargetObj[key] = { ...newTargetObj[key], ...repalceObj[key] }
    }
    console.log('newTargetObj', newTargetObj)
    return newTargetObj;
}

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

export const changeAllPropsValue = (sectionForms: SectionForm[], valueObj: object, condition?: (sectionForm: SectionForm) => boolean) => {
    let newSectionForms = [];
    for (const form of sectionForms) {
        let addForm = form;
        if (!condition || condition(form)) {
            addForm = { ...form, ...valueObj }
        }
        newSectionForms.push(addForm);
    }
    return newSectionForms;
}

export const changeFormPropValue = (sectionForm: SectionForm, sectionForms: SectionForm[], valueObj: object) => {
    const newSectionForms = [...sectionForms];
    newSectionForms[sectionForm.index] = { ...sectionForm, ...valueObj };
    return newSectionForms;
}