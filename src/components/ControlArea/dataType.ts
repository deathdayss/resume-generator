import { initialSectionIds, SectionData, SectionId, TemplateId } from "@/data/resumeData";

export type SectionForm = {
    id: SectionId,
    textData: SectionData,
    templateId: TemplateId,
    inUse: boolean,
    isCollapse: boolean,
    index: number,
}

export const initialSectionForms: SectionForm[] = initialSectionIds.map((id, index) => ({ id, inUse: true, textData: {title: 'initialForm', items: []},templateId: '', isCollapse: false, index }));