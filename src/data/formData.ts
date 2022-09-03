import {
    Detail, Education, EducationInfo, Experience, ExperienceInfo, ItemsData, Other, SectionData,
    SectionId, sectionIds, SectionInfo, SectionItem, Skill, SkillInfo, textDataTemplate, TitleData
} from "@/data/docData";
import { cloneDeep } from "lodash";
import { action, computed, makeObservable, observable } from "mobx";

export class SectionForm<T extends SectionData> extends SectionInfo<T> {
    @observable inUse;
    @observable isCollapse;
    constructor(id: SectionId, textData: T, templateId = 'default', inUse = true, isCollapse = false) {
        super(id, textData, templateId);
        this.inUse = inUse;
        this.isCollapse = isCollapse;
        makeObservable(this);
    }

    @action
    setInUse = (inUse: boolean) => {
        this.inUse = inUse;
    }

    @action
    setIsCollapse = (isCollapse: boolean) => {
        this.isCollapse = isCollapse;
    }

    @action
    toggleCollapse = () => {
        this.isCollapse = !this.isCollapse;
    }
}


export class SectionFormTitle<T extends TitleData> extends SectionForm<T> {
    constructor(id: SectionId, textData: T, templateId = 'default', inUse = true, isCollapse = false) {
        super(id, textData, templateId, inUse, isCollapse);
        makeObservable(this);
    }

    @computed
    get title() {
        return this.textData.title;
    }

    @action
    setTitle = (value: string) => {
        this.textData.title = value;
    }
}

export class FormDetail extends SectionForm<Detail> {
    constructor(textData = textDataTemplate.Detail.default(), templateId = 'default', inUse = true, isCollapse = false) {
        super('Detail', textData, templateId, inUse, isCollapse)
        makeObservable(this);
    }

    @action
    setPersonName = (personName: string) => {
        this.textData.personName = personName;
    }

    @action
    setVisa = (visa: string | null) => {
        this.textData.visa = visa;
    }

    @action
    setPhone = (phone: string | null) => {
        this.textData.phone = phone;
    }

    @action
    setEmail = (email: string | null) => {
        this.textData.email = email;
    }
}

export class FormOther extends SectionFormTitle<Other> {
    constructor(textData = textDataTemplate.Other.default(), templateId = 'default', inUse = true, isCollapse = false) {
        super('Other', textData, templateId, inUse, isCollapse)
        makeObservable(this);
    }

    @action
    setDescription = (description: string) => {
        this.textData.description = description;
    }
}

export class SectionFormItems<F extends SectionItem, T extends ItemsData<F>> extends SectionFormTitle<T> {

    constructor(id: SectionId, textData: T, templateId = 'default', inUse = true, isCollapse = false) {
        super(id, textData, templateId, inUse, isCollapse);
        makeObservable(this);
    }

    @action
    setItems = (arr: any[]) => {
        this.textData.items = arr;
    }

    @computed
    get items() {
        return this.textData.items;
    }
}

const createNewSectionInfo = (id: SectionId, textData: SectionData, templateId = 'default', inUse = true, isCollapse = false) => {
    switch (id) {
        case 'Detail':
            return new FormDetail(textData as Detail, templateId, inUse, isCollapse);
        case 'Experience':
            return new FormExperience(textData as ExperienceInfo, templateId, inUse, isCollapse);
        case 'Education':
            return new FormEducation(textData as EducationInfo, templateId, inUse, isCollapse);
        case 'Skill':
            return new FormSkill(textData as SkillInfo, templateId, inUse, isCollapse);
        case 'Other':
            return new FormOther(textData as Other, templateId, inUse, isCollapse);
        default:
            throw new Error('no such as section id');
    }
}

export class FormExperience extends SectionFormItems<Experience, ExperienceInfo> {
    constructor(textData = textDataTemplate.Experience.default(), templateId = 'default', inUse = true, isCollapse = false) {
        super('Experience', textData, templateId, inUse, isCollapse);
        makeObservable(this);
    }
}

export class FormEducation extends SectionFormItems<Education, EducationInfo> {
    constructor(textData = textDataTemplate.Education.default(), templateId = 'default', inUse = true, isCollapse = false) {
        super('Education', textData, templateId, inUse, isCollapse);
    }
}

export class FormSkill extends SectionFormItems<Skill, SkillInfo> {
    constructor(textData = textDataTemplate.Skill.default(), templateId = 'default', inUse = true, isCollapse = false) {
        super('Skill', textData, templateId, inUse, isCollapse);
    }
}

export class SectionForms {
    @observable arr;

    constructor(arr: SectionForm<SectionData>[]) {
        makeObservable(this);
        this.arr = arr;
    }

    @action
    setAllInUse = (inUse: boolean) => {
        this.arr.forEach(sectionForm => sectionForm.setInUse(inUse));
    }

    @action
    setAllIsCollapse = (isCollapse: boolean) => {
        this.arr.forEach(sectionForm => sectionForm.setIsCollapse(isCollapse));
    }

    @action
    setUploadJson = (json: any) => {
        this.arr = [];
        const cloneSectionIds = [...sectionIds]
        for (const data of json) {
            cloneSectionIds.splice(cloneSectionIds.indexOf(data.id), 1);
            const newForm = createNewSectionInfo(data.id, cloneDeep(data.textData), data.templateId);
            this.arr.push(newForm);
        }
        for (const id of cloneSectionIds) {
            this.arr.push(createNewSectionInfo(id as SectionId, textDataTemplate[id as keyof typeof textDataTemplate].default(), 'default', false, true));
        }
    }
}

export const sectionForms = new SectionForms([new FormDetail(), new FormExperience(), new FormEducation(), new FormSkill(), new FormOther()]);
export const initialSectionForms = Object.keys(textDataTemplate).map(key => ({ id: key, inUse: true, isCollapse: false, templateId: 'default', textData: textDataTemplate[key as keyof typeof textDataTemplate].default() }));