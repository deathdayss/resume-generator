import { SectionForm, sectionItemDelegate } from "@/data/formData"
import { DocStyles, FormStyles } from "@/components/PdfDocument/docStyles"
import React from "react"

export type Period = [string, string]
export interface Detail {
    personName: string,
    visa: string | null,
    phone: string | null,
    email: string | null
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
    description: string
}

export type TemplateId = string | undefined
export type SectionId = 'Detail' | 'Experience' | 'Education' | 'Skill' | 'Other';
export type SectionData = Detail | ExperienceInfo | EducationInfo | SkillInfo | OtherInfo

export const DetailTemplate = ['default']

export interface SectionInfo {
    id: SectionId,
    textData: SectionData,
    templateId: TemplateId
}

export const initialSectionInfos = [
    {
        id: 'Detail',
        textData: {
            personName: '',
            visa: '',
            phone: '',
            email: ''
        },
        templateId: 'default'
    },
    {
        id: 'Experience',
        textData: {
            title: '',
            items: [sectionItemDelegate.experience]
        },
        templateId: 'default'
    },
    {
        id: 'Education',
        textData: {
            title: '',
            items: [sectionItemDelegate.education]
        },
        templateId: 'default'
    },
    {
        id: 'Skill',
        textData: {
            title: '',
            items: [sectionItemDelegate.skill]
        },
        templateId: 'default'
    },
    {
        id: 'Other',
        textData: {
            title: '',
            description: ''
        },
        templateId: 'default'
    }
] as SectionInfo[]

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

export const formDataToDocData = (sectionForms: SectionForm[]) => {
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

export interface DocFormDataContextProps {
    sectionForms: SectionForm[],
    setSectionForms: (sectionForms: SectionForm[]) => void,
    sectionInfos: SectionInfo[],
    setSectionInfos: (sectionInfos: SectionInfo[]) => void,
    styleArgs: DocStyles,
    setStylesArgs: (styleArgs: DocStyles) => void,
    formStyleArgs: FormStyles,
    setFormStyleArgs: (formStyleArgs: FormStyles) => void,
    title: string
}

export const DocFormDataContext = React.createContext<DocFormDataContextProps>({} as DocFormDataContextProps)