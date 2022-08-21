import { initialSectionIds, SectionData, SectionId, TemplateId } from "@/data/resumeData";

export type SectionForm = {
    id: SectionId,
    textData: SectionData,
    templateId: TemplateId,
    inUse: boolean,
    isCollapse: boolean,
    index: number,
}

export const sectionItemDelegate = {
    experience: {
        companyName: '',
        position: '',
        period: ['', ''],
        duration: '',
        descriptions: ['']
    },
    education: {
        instituionName: '',
        degree: '',
        GPA: '',
        period: ['', ''],
        duration: '',
        descriptions: ['']
    },
    skill: {
        skillName: '',
        proficiency: ''
    }
}

const sectionFormsDelegate = [
    {
        textData: {
            personName: '',
            visa: '',
            phone: '',
            email: ''
        },
    },
    {
        textData: {
            title: '',
            items: [sectionItemDelegate.experience]
        }
    },
    {
        textData: {
            title: '',
            items: [sectionItemDelegate.education]
        }
    },
    {
        textData: {
            title: '',
            items: [sectionItemDelegate.skill]
        }
    },
    {
        title: '',
        description: ''
    },
] as SectionForm[];

initialSectionIds.forEach((id, index) => {
    sectionFormsDelegate[index] = { ...sectionFormsDelegate[index], id, templateId: 'default', inUse: true, isCollapse: false, index };
})

export const initialSectionForms = sectionFormsDelegate;