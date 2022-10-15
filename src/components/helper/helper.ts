import { initialSectionInfos, Period, SectionData, SectionInfo } from "@/data/docData";
import { initialStylesData } from "@/data/docStyles";
import { SectionForms } from "@/data/formData";
import localization, { languageManager } from "@/data/localization";
import globalFontFamily from "@/fonts";
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

const validateShallowKey = (obj: any, delegate: any) => {
    if (Object.prototype.toString.call(obj) !== Object.prototype.toString.call(delegate)) {
        return false;
    }
    if (obj instanceof Array) {
        for (const element of obj) {
            if (!validateShallowKey(element, delegate[0])) {
                return false;
            }
        }
    }
    else if (obj instanceof Object) {
        for (const key in obj) {
            if (!(key in delegate)) {
                return false;
            }
        }
        for (const key in delegate) {
            if (!(key in obj)) {
                return false;
            }
        }
    }
    return true;
}

const validateObj = (obj: any, delegate: any, rules: any = {}, spectialKey: any = {}) => {
    const keyValidation = validateShallowKey(obj, delegate);
    if (!keyValidation) {
        return false;
    }
    if (obj instanceof Array) {
        for (const element of obj) {
            if (!validateObj(element, delegate[0], rules, spectialKey)) {
                return false;
            }
        }
    }
    else if (obj instanceof Object) {
        for (const key in obj) {
            if (key in spectialKey) {
                const typeStr = Object.prototype.toString.call(obj[key]);
                if (typeStr.substring(8, typeStr.length - 1).toLocaleLowerCase() === spectialKey[key]) {
                    continue;
                }
            }
            if (key in rules && !rules[key](obj[key])) {
                return false;
            }
            const isValid = validateObj(obj[key], delegate[key], rules, spectialKey);
            if (!isValid) {
                return false;
            }
        }
    }
    return true;
}

const validateSectionInfoData = (sectionInfos: SectionInfo<SectionData>[], initialSectionInfos: any[], rules: any = {}, spectialKey: any = {}) => {
    let copyInitial = [...initialSectionInfos]
    for (const sectionInfo of sectionInfos) {
        let findId = false;
        for (let i = 0; i < copyInitial.length; ++i) {
            if (sectionInfo.id === copyInitial[i].id) {
                if (findId) {
                    return false;
                }
                const isValid = validateObj(sectionInfo, copyInitial[i], rules, spectialKey);
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


export const validateSectionFormData = (sectionForms: SectionForms, initialSectionForms: any[], rules: any = {}, spectialKey: any = {}) => {
    if (!sectionForms.arr) {
        return false;
    }
    const formArray = [...sectionForms.arr];
    if (formArray.length !== initialSectionForms.length) {
        return false;
    }
    for (const sectionForm of initialSectionForms) {
        let findId = false;
        for (let i = 0; i < formArray.length; ++i) {
            if (sectionForm.id === formArray[i].id) {
                if (findId) {
                    return false;
                }
                const isValid = validateObj(formArray[i], sectionForm, rules, spectialKey);
                if (!isValid) {
                    return false;
                }
                formArray.splice(i, 1);
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

export const validateNumericValue = (value: any) => {
    return typeof value === 'string' && value !== '' && !isNaN(Number(value)) && value[0] !== '+' && value[0] !== '-' && value[0] !== '.'
}

const notRequireValidate = (value: any, validate: (text: string) => boolean) => {
    if (typeof value === 'string') {
        if (value === '') {
            return true;
        }
        return validate(value);
    }
    return true;
}

export const deleteByIndex = (arr: any[], index: number) => {
    const newArr = [...arr]
    newArr.splice(index, 1);
    return newArr;
}

export const pushElement = (arr: any[], element: any) => {
    arr.push(element);
    return arr;
}

export const unShiftElement = (arr: any[], element: any) => {
    arr.unshift(element);
    return arr;
}

export const changeIndexFromTo = (arr: any[], oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) {
        return arr;
    }
    const newArr = [];
    const minIndex = Math.min(oldIndex, newIndex);
    const maxIndex = Math.max(oldIndex, newIndex);
    for (let i = 0; i < arr.length; ++i) {
        let nextPush;
        if (i < minIndex || i > maxIndex) {
            nextPush = arr[i];
        }
        else if (i === newIndex) {
            nextPush = arr[oldIndex];
        }
        else if (i >= minIndex) {
            nextPush = arr[oldIndex <= newIndex ? i + 1 : i - 1];
        }
        if (nextPush !== undefined) {
            newArr.push(nextPush);
        }
        else {
            throw new Error("changeIndex undefined nextPush");
        }
    }
    return newArr
}

const phoneNumberRegExp = new RegExp(/^(\+\d+[ ])?\d+?$/);
export const validatePhoneNumber = (value: any) => {
    return notRequireValidate(value, (text) => phoneNumberRegExp.test(text));
}

const emailAddressRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
export const validateEmailAddress = (value: any) => {
    return notRequireValidate(value, (text) => emailAddressRegExp.test(text));
}

export const getIndexById = (arr: any[], id: string, key = 'id') => {
    for (let i = 0; i < arr.length; ++i) {
        if (arr[i][key] === id) {
            return i;
        }
    }
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
                if (!validateNumericValue(formStyle[key].substring(0, formStyle[key].length - 2))) {
                    isValid = false;
                }
            }
            else if (key === 'fontFamily') {
                if (!(formStyle[key] in globalFontFamily)) {
                    isValid = false;
                }
            }
            else if (typeof formStyle[key] === 'string') {
                if (!validateNumericValue(formStyle[key])) {
                    isValid = false;
                }
            }
            if (!isValid) {
                return false;
            }
            isValid = validateFormStyle(formStyle[key], delegate[key]);
            if (!isValid) {
                return false;
            }
        }
    }
    return true;
}

export const getPeriodText = (period: Period) => {
    const commonLocal = localization[languageManager.langCode].document.common;
    let startDate = commonLocal.startDate;
    let endDate = commonLocal.endDate;
    if (period[0]) {
        startDate = period[0];
    }
    if (period[1]) {
        endDate = period[1];
    }
    return `${startDate} - ${endDate}`;
}

export const textDataRuels = { phone: validatePhoneNumber, email: validateEmailAddress }
export const textDataSpecialKeys = { visa: 'null', phone: 'null', email: 'null', GPA: 'null' }

export const validateJSON = (jsonContent: any) => {
    if (jsonContent.infos
        && jsonContent.stylesData
        && validateFormStyle(jsonContent.stylesData, initialStylesData)
        && validateSectionInfoData(jsonContent.infos, initialSectionInfos, textDataRuels, textDataSpecialKeys)
    ) {
        return true;
    }
    return false;
}