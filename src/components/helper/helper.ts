import localization, { Language } from "@/data/localization";
import { Detail, initialSectionInfos, SectionInfo } from "@/data/resumeData";
import globalFontFamily from "@/fonts";
import { initialSectionForms, SectionForm } from "../ControlArea/dataType";
import { initialFormStyles } from "../PdfDocument/docStyles";

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

export const changeArrayIndex = <T>(arr: T[], oldIndex: number, newIndex: number, varyIndex: boolean = false) => {
    if (oldIndex === newIndex) {
        return arr;
    }
    const newArr: T[] = [];
    const minIndex = Math.min(oldIndex, newIndex);
    const maxIndex = Math.max(oldIndex, newIndex);
    for (let i = 0; i < arr.length; ++i) {
        let nextForm;
        if (i < minIndex || i > maxIndex) {
            nextForm = arr[i];
        }
        else if (i === newIndex) {
            nextForm = arr[oldIndex];
            if (varyIndex) {
                nextForm = { ...nextForm, index: i };
            }
        }
        else if (i >= minIndex) {
            nextForm = arr[oldIndex <= newIndex ? i + 1 : i - 1];
            if (varyIndex) {
                nextForm = { ...nextForm, index: i };
            }
        }
        if (nextForm !== undefined) {
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

export const textDataSpecialKeys = { visa: 'null', phone: 'null', email: 'null', GPA: 'null' }

export const validateJSON = (jsonContent: any) => {
    if (!jsonContent.sectionInfos
        || !jsonContent.styleArgs
        || !validateFormStyle(jsonContent.styleArgs, initialFormStyles)
        || !validateSectionInfoData(jsonContent.sectionInfos, textDataSpecialKeys)
    ) {
        return false;
    }
    return true;
}

export const getPdfTitle = (sectionInfos: SectionInfo[], langCode: Language) => {
    let title = localization[langCode].resumeTitle;
    for (const sectionInfo of sectionInfos) {
        if (sectionInfo.id === 'Detail' && (sectionInfo.textData as Detail).personName) {
            title = `${(sectionInfo.textData as Detail).personName}-${localization[langCode].resume}`
        }
    }
    title = title.replaceAll(' ', '-');
    return title;
}

export const setArrayElement = <T>(element: T, index: number, elementArray: T[], setElementArray: (arg: T[]) => void) => {
    const newElementArray = [...elementArray];
    newElementArray[index] = element;
    setElementArray(newElementArray);
}

const validateShallowKey = (obj: any, delegate: any) => {
    if (Object.prototype.toString.call(obj) !== Object.prototype.toString.call(delegate)) {
        return false;
    }
    if (obj instanceof Array) {
        for (const element of obj) {
            if (!validateShallowKey(element, delegate[0])) {
                console.log('3rd if')
                return false;
            }
        }
    }
    else if (obj instanceof Object) {
        for (const key in obj) {
            if (!(key in delegate)) {
                console.log('1st if', key, obj, delegate)
                return false;
            }
        }
        for (const key in delegate) {
            if (!(key in obj)) {
                console.log('2nd if')
                return false;
            }
        }
    }
    return true;
}

const validateObj = (obj: any, delegate: any, spectialKey: any = {}) => {
    const keyValidation = validateShallowKey(obj, delegate);
    if (!keyValidation) {
        return false;
    }
    if (obj instanceof Array) {
        for (const element of obj) {
            if (!validateObj(element, delegate[0], spectialKey)) {
                console.log('invalid Array', element, obj, delegate[0])
                return false;
            }
        }
    }
    else if (obj instanceof Object) {
        for (const key in obj) {
            if (key in spectialKey) {
                const typeStr = Object.prototype.toString.call(obj[key]);
                if (typeStr.substring(8, typeStr.length - 1).toLocaleLowerCase() === spectialKey[key]) {
                    console.log('continue key', key)
                    continue;
                }
            }
            const isValid = validateObj(obj[key], delegate[key], spectialKey);
            if (!isValid) {
                console.log('invalid Object', key, obj, delegate)
                return false;
            }
        }
    }
    return true;
}

const validateSectionInfoData = (sectionInfos: SectionInfo[], spectialKey: any = {}) => {
    let copyInitial = [...initialSectionInfos]
    for (const sectionInfo of sectionInfos) {
        let findId = false;
        for (let i = 0; i < copyInitial.length; ++i) {
            if (sectionInfo.id === copyInitial[i].id) {
                if (findId) {
                    return false;
                }
                const isValid = validateObj(sectionInfo, copyInitial[i], spectialKey);
                if (!isValid) {
                    return false;
                }
                copyInitial.splice(i, 1);
                findId = true;
                --i;
            }
        }
        if (!findId) {
            return false;
        }
    }
    return true;
}


export const validateSectionFormData = (sectionForms: SectionForm[], spectialKey: any = {}) => {
    console.log('validateSectionInfoData', sectionForms, spectialKey);
    if (sectionForms.length !== initialSectionForms.length) {
        return false;
    }
    sectionForms = [...sectionForms]
    for (const sectionForm of initialSectionForms) {
        let findId = false;
        for (let i = 0; i < sectionForms.length; ++i) {
            if (sectionForm.id === sectionForms[i].id) {
                if (findId) {
                    return false;
                }
                const isValid = validateObj(sectionForms[i], sectionForm, spectialKey);
                if (!isValid) {
                    return false;
                }
                sectionForms.splice(i, 1);
                findId = true;
                --i;
            }
        }
        if (!findId) {
            return false;
        }
    }
    return true;
}

export const validateFormStyle = (formStyle: any, delegate: any) => {
    const keyValidation = validateShallowKey(formStyle, delegate);
    if (!keyValidation) {
        return false;
    }
    if (formStyle instanceof Object) {
        for (const key in formStyle) {
            let isValid = true;
            if (key === 'padding' && typeof formStyle[key] === 'string') {
                if (isNaN(formStyle[key].substring(0, formStyle[key].length - 2))) {
                    isValid = false;
                }
            }
            else if (key === 'fontFamily') {
                if (!(formStyle[key] in globalFontFamily)) {
                    isValid = false;
                }
            }
            else if (typeof formStyle[key] === 'string') {
                if (isNaN(formStyle[key])) {
                    isValid = false;
                }
            }
            isValid = validateFormStyle(formStyle[key], delegate[key]);
            if (!isValid) {
                return false;
            }
        }
    }
    return true;
}