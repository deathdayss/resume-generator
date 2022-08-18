import { SectionData, SectionId, TemplateId } from "@/data/resumeData";

export const sortableItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']

export type SectionForm = {
    [id in SectionId]: {
        textData: SectionData,
        templateId: TemplateId,
        inUse: boolean
    };
};

export const initialSectionForm: SectionForm = {
    Detail: {
        textData: {
            personName: '',
            visa: '',
            phone: '',
            email: ''
        },
        templateId: undefined,
        inUse: true
    },
    Experience: {
        textData: {
            title: '',
            items: []
        },
        templateId: undefined,
        inUse: true
    },
    Education: {
        textData: {
            title: '',
            items: []
        },
        templateId: undefined,
        inUse: true
    },
    Skill: {
        textData: {
            title: '',
            items: []
        },
        templateId: undefined,
        inUse: true
    },
    Other: {
        textData: {
            title: '',
            comment: ''
        },
        templateId: undefined,
        inUse: true
    }
}