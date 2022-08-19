import { initialSectionIds, SectionData, SectionId, TemplateId } from "@/data/resumeData";

export type SectionForm = {
    id: SectionId,
    inUse: boolean,
    isCollapse: boolean,
    index: number,
}

export const initialSectionForms: SectionForm[] = initialSectionIds.map((id, index) => ({ id, inUse: true, isCollapse: false, index }));