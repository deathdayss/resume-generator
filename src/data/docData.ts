import React from "react"
import { action, autorun, computed, makeAutoObservable, makeObservable, observable } from "mobx"
import { MobArray, MobIdArray } from "./mobData"
import { produceItemWithId } from "@/components/helper/helper"
import localization, { languageManager } from "./localization"

export const textDataTemplate = {
    Detail: {
        default: () => ({
            personName: '',
            visa: '',
            phone: '',
            email: ''
        })
    },
    Experience: {
        default: () => ({
            title: '',
            items: new MobIdArray([{
                companyName: '',
                position: '',
                duration: '',
                period: ['', ''] as Period,
                descriptions: new MobIdArray([{ description: '' }], 'exp-descrip-'),
            }], 'exp-item-')
        })
    },
    Education: {
        default: () => ({
            title: '',
            items: new MobIdArray([{
                instituionName: '',
                degree: '',
                period: ['', ''] as Period,
                duration: '',
                GPA: '',
                descriptions: new MobIdArray([{ description: '' }], 'edu-descrip-'),
            }], 'edu-item-')

        })
    },
    Skill: {
        default: () => ({
            title: '',
            items: new MobIdArray([{
                skillName: '',
                description: ''
            }], 'skill-item-')

        })
    },
    Other: {
        default: () => ({
            title: '',
            description: ''
        })
    }
}

export type Period = [string, string]
export interface Detail {
    personName: string,
    visa: string | null,
    phone: string | null,
    email: string | null
}

export interface TitleData {
    title: string
}

export interface Experience {
    companyName: string,
    position: string,
    period: Period,
    duration: string,
    descriptions: MobIdArray<{ description: string }>
}

export interface Education {
    instituionName: string,
    degree: string,
    GPA: string | null,
    period: Period,
    duration: string,
    descriptions: MobIdArray<{ description: string }>
}

export interface Skill {
    skillName: string,
    description: string
}

export interface ItemsData<T extends SectionItem> extends TitleData {
    items: MobIdArray<T>
}

export interface ExperienceInfo extends ItemsData<Experience> { }

export interface EducationInfo extends ItemsData<Education> { }

export interface SkillInfo extends ItemsData<Skill> { }

export interface Other extends TitleData {
    description: string,
}

export type TemplateId = string
export type SectionId = 'Detail' | 'Experience' | 'Education' | 'Skill' | 'Other';
export type SectionData = Detail | TitleData
export type SectionItem = Experience | Education | Skill

export const DetailTemplate = ['default']

export class SectionInfo<T extends SectionData> {
    @observable id: SectionId
    @observable textData: T
    @observable templateId = 'default'

    constructor(id: SectionId, textData: T) {
        this.id = id
        this.textData = textData;
        makeObservable(this);
    }
}

class SectionInfoTitle<T extends TitleData> extends SectionInfo<T> {
    constructor(id: SectionId, textData: T) {
        super(id, textData);
        makeObservable(this);
    }

    @computed
    get title() {
        return this.textData.title;
    }
}

class SectionDetail extends SectionInfo<Detail> {
    constructor(textData = textDataTemplate.Detail.default()) {
        super('Detail', textData)
    }
}

class SectionOther extends SectionInfoTitle<Other> {
    constructor(textData = textDataTemplate.Other.default()) {
        super('Other', textData)
    }
}

class SectionInfoItems<F extends SectionItem, T extends ItemsData<F>> extends SectionInfoTitle<T> {

    constructor(id: SectionId, textData: T) {
        super(id, textData);
        makeObservable(this);
    }

    @computed
    get items() {
        return this.textData.items;
    }
}

class SectionExperience extends SectionInfoItems<Experience, ExperienceInfo> {
    constructor(textData = textDataTemplate.Experience.default()) {
        super('Experience', textData);
    }
}

class SectionEducation extends SectionInfoItems<Education, EducationInfo> {
    constructor(textData = textDataTemplate.Education.default()) {
        super('Education', textData);
    }
}

class SectionSkill extends SectionInfoItems<Skill, SkillInfo> {
    constructor(textData = textDataTemplate.Skill.default()) {
        super('Skill', textData);
    }
}

class SectionInfos extends MobArray<SectionInfo<SectionData>> {
    title = ''

    constructor(arr: SectionInfo<SectionData>[]) {
        super(arr);
        makeObservable(this);
        this.title = localization[languageManager.langCode].resumeTitle;
    }

    @action
    setTitle = (title: string) => {
        this.title = title;
    }
}

export const sectionInfos = new SectionInfos([new SectionDetail(), new SectionExperience(), new SectionEducation(), new SectionSkill(), new SectionOther()]);

autorun(() => {
    let title = localization[languageManager.langCode].resumeTitle;
    for (const sectionInfo of sectionInfos.arr) {
        if (sectionInfo.id === 'Detail' && (sectionInfo.textData as Detail).personName) {
            title = `${(sectionInfo.textData as Detail).personName}-${localization[languageManager.langCode].resume}`
        }
    }
    sectionInfos.setTitle(title.replaceAll(' ', '-'));
})

// export const docDataToFormData = (sectionInfos: SectionInfo[]) => {
//     const sectionForms: SectionForm[] = [];
//     for (let i = 0; i < sectionInfos.length; ++i) {
//         const { id, textData, templateId } = sectionInfos[i];
//         sectionForms.push({
//             id,
//             textData,
//             templateId,
//             inUse: true,
//             isCollapse: false,
//             index: i
//         })
//     }
//     return sectionForms;
// }

// export const formDataToDocData = (sectionForms: SectionForm[]) => {
//     const sectionInfos: SectionInfo[] = []
//     for (let i = 0; i < sectionForms.length; ++i) {
//         const { id, textData, templateId } = sectionForms[i];
//         sectionInfos.push({
//             id,
//             textData,
//             templateId
//         })
//     }
//     return sectionInfos;
// }

// export interface DocFormDataContextProps {
//     sectionForms: SectionForm[],
//     setSectionForms: (sectionForms: SectionForm[]) => void,
//     sectionInfos: SectionInfo[],
//     setSectionInfos: (sectionInfos: SectionInfo[]) => void,
//     styleArgs: DocStyles,
//     setStylesArgs: (styleArgs: DocStyles) => void,
//     formStyleArgs: FormStyles,
//     setFormStyleArgs: (formStyleArgs: FormStyles) => void,
//     title: string
// }

// export const DocFormDataContext = React.createContext<DocFormDataContextProps>({} as DocFormDataContextProps)