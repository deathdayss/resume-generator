import localization, { Language } from "@/data/localization";
import { Detail, SectionInfo } from "@/data/resumeData";
import { SectionForm } from "../ControlArea/dataType";

export interface UsePDFInstance {
    loading: boolean;
    blob: Blob | null;
    url: string | null;
    error: string | null;
}

interface StringKeyObj {
    [name: string]: any
}

export const changePropsValue = (targetObj: StringKeyObj, repalceObj: StringKeyObj) => {
    const newTargetObj = { ...targetObj }
    for (let key in repalceObj) {
        newTargetObj[key] = { ...newTargetObj[key], ...repalceObj[key] }
    }
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

export const downloadFile = (jsonFile: object, fileName: string) => {

    const json = JSON.stringify(jsonFile, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
}

export const validateJSON = (jsonContent: any) => {
    return true;
}

export const getPdfTitle = (sectionInfos: SectionInfo[], langCode: Language) => {
    let title = localization[langCode].resumeTitle;
    for (const sectionInfo of sectionInfos) {
        if (sectionInfo.id === 'Detail' && (sectionInfo.textData as Detail).personName) {
            title = `${(sectionInfo.textData as Detail).personName}-${localization[langCode].resume}`
        }
    }
    return title;
}

export const setArrayElement = <T>(element: T, index: number, elementArray: T[], setElementArray: (arg: T[]) => void) => {
    const newElementArray = [...elementArray];
    newElementArray[index] = element;
    setElementArray(newElementArray);
}