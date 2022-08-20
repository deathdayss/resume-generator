import { SectionForm } from "@/components/ControlArea/dataType";
import { setArrayElement } from "@/components/helper/helper";
import { DocFormDataContext } from "@/data/resumeData";
import { ChangeEvent, FormEventHandler, useContext, useMemo } from "react";

export const useSectionForm = (sectionForm: SectionForm) => {
    const { sectionForms, setSectionForms } = useContext(DocFormDataContext);
    const { index } = sectionForm;
    return { index, sectionForms, setSectionForms, last: sectionForm.index === sectionForms.length - 1 };
}

type StateKey = string | number

export type ValueChangePair = (keys: StateKey[]) => {
    value: string,
    onChange: (value: ChangeEvent<HTMLInputElement>) => void
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

const swapValue = (obj: any, setObj: (obj: any[]) => void, keys: StateKey[], i: number, j: number) => {
    modifyObj(obj, setObj, keys, (arr) => {
        const newArray = []
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

const setValue = (obj: any, setObj: (obj: any[]) => void, keys: StateKey[], value: any) => {
    modifyObj(obj, setObj, keys, () => value);
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
}

const getObjValue = (obj: any, keys: StateKey[]) => {
    for (const key of keys) {
        obj = obj[key];
    }
    return obj;
}

export const useDestructFormInput = (obj: any, setObj: (obj: any[]) => void) => {
    return (keys: StateKey[], valueMap=(objValue: any) => objValue, onChangeMap=(myEvent: ChangeEvent<HTMLInputElement>) => myEvent.target.value) => {
        return {
            value: valueMap(getObjValue(obj, keys)),
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                setValue(obj, setObj, keys, onChangeMap(e));
            }
        }
    }
}