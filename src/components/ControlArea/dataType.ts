import { initialSectionIds, SectionData, SectionId, TemplateId } from "@/data/resumeData";

export type SectionForm = {
    id: SectionId,
    textData: SectionData,
    templateId: TemplateId,
    inUse: boolean,
    isCollapse: boolean,
    index: number,
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
            items: []
        }
    },
    {
        textData: {
            title: '',
            items: []
        }
    },
    {
        textData: {
            title: '',
            items: []
        }
    },
    {
        title: '',
        comment: ''
    },
] as SectionForm[];

initialSectionIds.forEach((id, index) => {
    sectionFormsDelegate[index] = { ...sectionFormsDelegate[index], id, templateId: 'default', inUse: true, isCollapse: false, index };
})

export const initialSectionForms = sectionFormsDelegate;