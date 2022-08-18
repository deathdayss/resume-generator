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