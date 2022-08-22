import { SectionForm } from "@/components/ControlArea/dataType";
import { changeArrayIndex, setArrayElement } from "@/components/helper/helper";
import localization, { LanguageContext } from "@/data/localization";
import { DocFormDataContext } from "@/data/resumeData";
import { ChangeEvent, FormEventHandler, useContext, useMemo } from "react";

export const useSectionForm = (sectionForm: SectionForm) => {
    const { sectionForms, setSectionForms } = useContext(DocFormDataContext);
    const langCode = useContext(LanguageContext);
    const labelLocal = localization[langCode].form.label;
    const usePropsForInputObj = usePropsForInput(sectionForms, setSectionForms);
    const { index } = sectionForm;
    return { langCode, labelLocal, usePropsForInputObj, ...usePropsForInputObj, index, sectionForms, setSectionForms, last: sectionForm.index === sectionForms.length - 1 };
}

export type StateKey = string | number

export interface ValueChangePair {
    value: any,
    onChange: (e: any) => void
}

export type ValueChangePairHook = (keys: StateKey[], valueMap?: (objValue: any) => any, onChangeMap?: (myEvent: any) => any) => ValueChangePair

const insertValue = (obj: any, setObj: (obj: any[]) => void, keys: StateKey[], value: any, index?: number) => {
    modifyObj(obj, setObj, keys, (arr) => {
        const newArray = []
        for (let i = 0; i < arr.length; ++i) {
            if (i === index) {
                newArray.push(value);
            }
            newArray.push(arr[i]);
        }
        if (index === undefined) {
            newArray.push(value);
        }
        return newArray;
    });
}


const deleteValue = (obj: any, setObj: (obj: any[]) => void, keys: StateKey[], index: number) => {
    modifyObj(obj, setObj, keys, (arr) => {
        const newArray = []
        for (let i = 0; i < arr.length; ++i) {
            if (i !== index) {
                newArray.push(arr[i]);
            }
        }
        return newArray;
    });
}

const swapValue = (obj: any, setObj: (obj: any[]) => void, keys: StateKey[], i: number, j: number) => {
    modifyObj(obj, setObj, keys, (arr) => {
        const newArray: any[] = []
        for (let index = 0; index < arr.length; ++index) {
            if (index === i) {
                newArray.push(arr[j]);
            }
            else if (index === j) {
                newArray.push(arr[i]);
            }
            else {
                newArray.push(arr[index]);
            }
        }
        return newArray;
    });
}

const changeIndex = (obj: any, setObj: (obj: any[]) => void, keys: StateKey[], oldIndex: number, newIndex: number, varyIndex: boolean=false) => {
    const newObj = modifyObj(obj, setObj, keys, (arr) => {
        return changeArrayIndex(arr, oldIndex, newIndex, varyIndex)
    })
}

const setValue = (obj: any, setObj: (obj: any[]) => void, keys: StateKey[], value: any) => {
    modifyObj(obj, setObj, keys, () => value);
}

const changeObj = (oldObj: any, key: StateKey, value: any) => {
    if (oldObj instanceof Array) {
        if (typeof key === 'string') {
            throw new Error('Invalid Index');
        }
        oldObj = [...oldObj];
        oldObj[key] = value;
    }
    else {
        if (typeof key === 'number') {
            throw new Error('Invalid Object Key')
        }
        oldObj = { ...oldObj, [key]: value };
    }
    return oldObj;
}

const modifyObj = (obj: any, setObj: (obj: any[]) => void, keys: StateKey[], modifyFunc: (obj: any) => any) => {
    let objs = [obj]
    for (let i = 0; i < keys.length; ++i) {
        objs.push(objs[objs.length - 1][keys[i]]);
    }
    let newObj = modifyFunc(objs[objs.length - 1]);
    for (let i = objs.length - 2; i >= 0; --i) {
        newObj = changeObj(objs[i], keys[i], newObj);
    }
    setObj(newObj);
    return newObj;
}

export const getObjValue = (obj: any, keys: StateKey[]) => {
    for (const key of keys) {
        obj = obj[key];
    }
    return obj;
}

export type DeleteValueHook = (keys: StateKey[], index: number) => void;

export interface UsePropsForInputObj {
    valueChangePairHook: ValueChangePairHook
    insertValueHook: (keys: StateKey[], value: any, index?: number) => void;
    deleteValueHook: DeleteValueHook
    swapValueHook: (keys: StateKey[], i: number, j: number) => void;
    changeIndexHook: (keys: StateKey[], oldIndex: number, newIndex: number, varyIndex?: boolean) => void
}

export const usePropsForInput = (obj: any, setObj: (obj: any) => void) => {
    const valueChangePairHook: ValueChangePairHook = (keys, valueMap = (objValue) => objValue, onChangeMap = (myEvent) => myEvent.target.value) => {
        return {
            value: valueMap(getObjValue(obj, keys)),
            onChange: (e) => {
                setValue(obj, setObj, keys, onChangeMap(e));
            }
        }
    }
    const insertValueHook = (keys: StateKey[], value: any, index?: number) => insertValue(obj, setObj, keys, value, index);
    const deleteValueHook = (keys: StateKey[], index: number) => deleteValue(obj, setObj, keys, index);
    const swapValueHook = (keys: StateKey[], i: number, j: number) => swapValue(obj, setObj, keys, i, j);
    const changeIndexHook = (keys: StateKey[], oldIndex: number, newIndex: number, varyIndex: boolean=false) => changeIndex(obj, setObj, keys, oldIndex, newIndex, varyIndex);
    return { valueChangePairHook, insertValueHook, deleteValueHook, swapValueHook, changeIndexHook };
}