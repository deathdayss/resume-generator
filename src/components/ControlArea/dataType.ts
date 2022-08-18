import { SectionData, SectionId, TemplateId } from "@/data/resumeData";

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