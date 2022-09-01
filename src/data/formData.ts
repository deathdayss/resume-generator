import { Detail, Education, EducationInfo, Experience, ExperienceInfo, ItemsData, Other, SectionData, SectionId, SectionInfo, SectionItem, Skill, SkillInfo, TemplateId, textDataTemplate, TitleData } from "@/data/docData";
import { action, computed, makeObservable, observable } from "mobx";
import { MobArray } from "./mobData";

export class SectionForm<T extends SectionData> extends SectionInfo<T> {
    @observable inUse;
    @observable isCollapse;
    constructor(id: SectionId, textData: T, inUse = true, isCollapse = false) {
        super(id, textData);
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
    constructor(id: SectionId, textData: T) {
        super(id, textData);
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
    constructor(textData = textDataTemplate.Detail.default()) {
        super('Detail', textData)
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
    constructor(textData = textDataTemplate.Other.default()) {
        super('Other', textData)
    }

    @action
    setDescription = (description: string) => {
        this.textData.description = description;
    }
}

class SectionFormItems<F extends SectionItem, T extends ItemsData<F>> extends SectionFormTitle<T> {

    constructor(id: SectionId, textData: T) {
        super(id, textData);
        makeObservable(this);
    }

    @computed
    get items() {
        return this.textData.items;
    }
}

export class FormExperience extends SectionFormItems<Experience, ExperienceInfo> {
    constructor(textData = textDataTemplate.Experience.default()) {
        super('Experience', textData);
    }
}

export class FormEducation extends SectionFormItems<Education, EducationInfo> {
    constructor(textData = textDataTemplate.Education.default()) {
        super('Education', textData);
    }
}

export class FormSkill extends SectionFormItems<Skill, SkillInfo> {
    constructor(textData = textDataTemplate.Skill.default()) {
        super('Skill', textData);
    }
}

class SectionForms extends MobArray<SectionForm<SectionData>> {
    constructor(arr: SectionForm<SectionData>[]) {
        super(arr);
        makeObservable(this);
    }

    @action
    setAllInUse = (inUse: boolean) => {
        this.arr.forEach(sectionForm => sectionForm.setInUse(inUse));
    }

    @action
    setAllIsCollapse = (isCollapse: boolean) => {
        this.arr.forEach(sectionForm => sectionForm.setIsCollapse(isCollapse));
    }
}

export const sectionForms = new SectionForms([new FormDetail(), new FormExperience(), new FormEducation(), new FormSkill(), new FormOther()]);