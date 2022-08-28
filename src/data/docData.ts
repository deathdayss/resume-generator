import { SectionForm, sectionItemDelegate } from "@/data/formData"
// import { DocStyles, FormStyles } from "@/components/PdfDocument/docStyles"
import React from "react"
import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx"
import { MobArray } from "./mobData"
import { produceItemWithId } from "@/components/helper/helper"

export const textDataTemplate = {
    Detail: {
        default: {
            personName: '',
            visa: '',
            phone: '',
            email: ''
        }
    },
    Experience: {
        default: {
            title: '',
            items: [{
                companyName: '',
                position: '',
                duration: '',
                period: ['', ''] as Period,
                descriptions: [''],
            }]
        }
    },
    Education: {
        default: {
            title: '',
            items: [{
                instituionName: '',
                degree: '',
                period: ['', ''] as Period,
                duration: '',
                GPA: '',
                descriptions: [''],
            }]

        }
    },
    Skill: {
        default: {
            title: '',
            items: [{
                skillName: '',
                description: ''
            }]

        }
    },
    Other: {
        default: {
            title: '',
            description: ''
        }
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
    descriptions: string[]
}

export interface Education {
    instituionName: string,
    degree: string,
    GPA: string | null,
    period: Period,
    duration: string,
    descriptions: string[]
}

export interface Skill {
    skillName: string,
    description: string
}

export interface ItemsData<T extends SectionItem> extends TitleData {
    items: T[]
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
export type SectionItem = (Experience | Education | Skill) & { id?: string }

export const DetailTemplate = ['default']

class SectionInfo<T extends SectionData> {
    id: SectionId
    textData: T
    templateId = 'default'

    constructor(id: SectionId, textData: T) {
        this.id = id
        this.textData = textData;
        makeAutoObservable(this);
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
    constructor() {
        super('Detail', {
            personName: '',
            visa: '',
            phone: '',
            email: ''
        })
    }
}

class SectionOther extends SectionInfoTitle<Other> {
    constructor() {
        super('Other', textDataTemplate.Other.default)
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
    constructor() {
        super('Experience', textDataTemplate.Experience.default);
    }
}

class SectionEducation extends SectionInfoItems<Education, EducationInfo> {
    constructor() {
        super('Education', textDataTemplate.Education.default);
    }
}

class SectionSkill extends SectionInfoItems<Skill, SkillInfo> {
    constructor() {
        super('Skill', textDataTemplate.Skill.default);
    }
}

export const initialSectionInfos = new MobArray([new SectionDetail(), new SectionExperience(), new SectionEducation(), new SectionSkill(), new SectionOther()]);

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