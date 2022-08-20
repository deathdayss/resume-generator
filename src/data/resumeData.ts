import { SectionForm } from "@/components/ControlArea/dataType"
import { DocStyles, DocStylesKey, FormStyles, FormStylesKey } from "@/components/PdfDocument/docStyles"

export type Period = [string, string]
export interface Detail {
    personName: string,
    visa: string | undefined,
    phone: string | undefined,
    email: string | undefined
}

export interface Experience {
    companyName: string,
    position: string,
    period: Period,
    duration: string,
    comments: string[]
}

export interface Education {
    instituionName: string,
    degree: string,
    GPA: string | undefined,
    period: Period,
    duration: string,
    comments: string[]
}

export interface Skill {
    skillName: string,
    proficiency: string
}

export interface ExperienceInfo {
    title: string,
    items: Experience[]
}

export interface EducationInfo {
    title: string,
    items: Education[]
}

export interface SkillInfo {
    title: string,
    items: Skill[]
}

export interface OtherInfo {
    title: string,
    comment: string
}

export type TemplateId = string | undefined
export type SectionId = 'Detail' | 'Experience' | 'Education' | 'Skill' | 'Other';
export type SectionData = Detail | ExperienceInfo | EducationInfo | SkillInfo | OtherInfo
export const initialSectionIds: SectionId[] = ['Detail', 'Experience', 'Education', 'Skill', 'Other']

export interface SectionInfo {
    id: SectionId,
    textData: SectionData,
    templateId: TemplateId
}

export const initialSectionInfos: SectionInfo[] = [
    {
        id: 'Detail',
        textData: {
            personName: '',
            visa: '',
            phone: '',
            email: ''
        },
        templateId: undefined
    },
    {
        id: 'Experience',
        textData: {
            title: '',
            items: []
        },
        templateId: undefined
    },
    {
        id: 'Education',
        textData: {
            title: '',
            items: []
        },
        templateId: undefined
    },
    {
        id: 'Skill',
        textData: {
            title: '',
            items: []
        },
        templateId: undefined
    },
    {
        id: 'Other',
        textData: {
            title: '',
            comment: ''
        },
        templateId: undefined
    }
]

export const docDataToFormData = (sectionInfos: SectionInfo[]) => {
    const sectionForms: SectionForm[] = [];
    for (let i = 0; i < sectionInfos.length; ++i) {
        const { id, textData, templateId } = sectionInfos[i];
        sectionForms.push({
            id,
            textData,
            templateId,
            inUse: true,
            isCollapse: false,
            index: i
        })
    }
    return sectionForms;
}

export const FormDataToDocData = (sectionForms: SectionForm[]) => {
    const sectionInfos: SectionInfo[] = []
    for (let i = 0; i < sectionForms.length; ++i) {
        const { id, textData, templateId } = sectionForms[i];
        sectionInfos.push({
            id,
            textData,
            templateId
        })
    }
    return sectionInfos;
}

function mergeKeyValue<K extends keyof T, T, F extends keyof M, M>(target: T, key: K, modifier: M, modifierKey?: F) {
    if (!modifierKey) {
        modifierKey = key as unknown as F;
    }
    target[key] = { ...target[key], ...modifier[modifierKey as F] };
}

export const mergeFormToDocStyles = (formStyles: FormStyles, docStyles: DocStyles) => {
    const newDoctyles = { ...docStyles };
    for (const key in formStyles) {
        mergeKeyValue(newDoctyles, key as DocStylesKey, formStyles);
    }
    return newDoctyles;
}   