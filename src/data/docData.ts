import { cloneDeep, uniqueId } from "lodash"
import { action, autorun, computed, makeObservable, observable } from "mobx"
import { SectionForms } from "./formData"
import localization, { languageManager } from "./localization"

export const textDataTemplate = {
    Detail: {
        default: () => ({
            personName: '',
            visa: '',
            phone: '',
            email: ''
        } as Detail)
    },
    Experience: {
        default: () => ({
            title: '',
            items: [{
                id: uniqueId('exp-item-'),
                companyName: '',
                position: '',
                duration: '',
                period: ['', ''] as Period,
                descriptions: [{ id: uniqueId('exp-desc-'), description: '' }],
            }]
        } as ExperienceInfo)
    },
    Education: {
        default: () => ({
            title: '',
            items: [{
                id: uniqueId('edu-item-'),
                instituionName: '',
                degree: '',
                period: ['', ''] as Period,
                duration: '',
                GPA: '',
                descriptions: [{ id: uniqueId('edu-desc-'), description: '' }],
            }]
        } as EducationInfo)
    },
    Skill: {
        default: () => ({
            title: '',
            items: [{
                id: uniqueId('skill-item-'),
                skillName: '',
                description: ''
            }]

        } as SkillInfo)
    },
    Other: {
        default: () => ({
            title: '',
            description: ''
        } as Other)
    }
}

export const initialSectionInfos = Object.keys(textDataTemplate).map(key => ({ id: key, templateId: 'default', textData: textDataTemplate[key as keyof typeof textDataTemplate].default() }));

export type Period = [string, string]
export interface Detail {
    personName: string,
    visa: string | null,
    phone: string | null,
    email: string | null
}

export interface TitleData {
    title: string
}

interface Description {
    id: string,
    description: string
}

export interface Experience {
    id: string,
    companyName: string,
    position: string,
    period: Period,
    duration: string,
    descriptions: Description[]
}

export interface Education {
    id: string,
    instituionName: string,
    degree: string,
    GPA: string | null,
    period: Period,
    duration: string,
    descriptions: Description[]
}

export interface Skill {
    id: string,
    skillName: string,
    description: string
}

export interface ItemsData<T extends SectionItem> extends TitleData {
    items: T[]
}

export interface ExperienceInfo extends ItemsData<Experience> { }

export interface EducationInfo extends ItemsData<Education> { }

export interface SkillInfo extends ItemsData<Skill> { }

export interface Other extends TitleData {
    description: string,
}

export type TemplateId = string
export type SectionId = 'Detail' | 'Experience' | 'Education' | 'Skill' | 'Other';
export const sectionIds = ['Detail', 'Experience', 'Education', 'Skill', 'Other']
export type SectionData = Detail | TitleData
export type SectionItem = Experience | Education | Skill

// TODO: use detail template temporally
export const DetailTemplate = ['default']

export class SectionInfo<T extends SectionData> {
    @observable id: SectionId
    @observable textData: T
    @observable templateId;

    constructor(id: SectionId, textData: T, templateId = 'default') {
        this.id = id
        this.textData = textData;
        this.templateId = templateId;
        makeObservable(this);
    }

    @action
    setTemplateId = (templateId: string) => {
        this.templateId = templateId;
    }
}

class SectionInfoTitle<T extends TitleData> extends SectionInfo<T> {
    constructor(id: SectionId, textData: T, templateId = 'default') {
        super(id, textData, templateId);
        makeObservable(this);
    }

    @computed
    get title() {
        return this.textData.title;
    }
}

class SectionDetail extends SectionInfo<Detail> {
    constructor(textData = textDataTemplate.Detail.default(), templateId = 'default') {
        super('Detail', textData, templateId)
    }
}

class SectionOther extends SectionInfoTitle<Other> {
    constructor(textData = textDataTemplate.Other.default(), templateId = 'default') {
        super('Other', textData, templateId)
    }
}

class SectionInfoItems<F extends SectionItem, T extends ItemsData<F>> extends SectionInfoTitle<T> {

    constructor(id: SectionId, textData: T, templateId = 'default') {
        super(id, textData, templateId);
        makeObservable(this);
    }

    @computed
    get items() {
        return this.textData.items;
    }
}

class SectionExperience extends SectionInfoItems<Experience, ExperienceInfo> {
    constructor(textData = textDataTemplate.Experience.default(), templateId = 'default') {
        super('Experience', textData, templateId);
    }
}

class SectionEducation extends SectionInfoItems<Education, EducationInfo> {
    constructor(textData = textDataTemplate.Education.default(), templateId = 'default') {
        super('Education', textData, templateId);
    }
}

class SectionSkill extends SectionInfoItems<Skill, SkillInfo> {
    constructor(textData = textDataTemplate.Skill.default(), templateId = 'default') {
        super('Skill', textData, templateId);
    }
}

const createNewSectionInfo = (id: SectionId, textData: SectionData, templateId = 'default') => {
    switch (id) {
        case 'Detail':
            return new SectionDetail(textData as Detail, templateId);
        case 'Experience':
            return new SectionExperience(textData as ExperienceInfo, templateId);
        case 'Education':
            return new SectionEducation(textData as EducationInfo, templateId);
        case 'Skill':
            return new SectionSkill(textData as SkillInfo, templateId);
        case 'Other':
            return new SectionOther(textData as Other, templateId);
        default:
            throw new Error('no such as section id');
    }
}

export class SectionInfos {
    @observable title = '';
    @observable arr;

    constructor(arr: SectionInfo<SectionData>[]) {
        this.arr = arr;
        makeObservable(this);
    }

    @action
    setTitle = (title: string) => {
        this.title = title;
    }

    @action
    setSectionForms = (sectionForms: SectionForms) => {
        this.arr = []
        for (const sectionForm of sectionForms.arr) {
            if (sectionForm.inUse) {
                const newInfo = createNewSectionInfo(sectionForm.id, cloneDeep(sectionForm.textData), sectionForm.templateId);
                this.arr.push(newInfo);
            }
        }
    }

    @action
    setUploadJson = (json: any) => {
        this.arr = [];
        for (const data of json) {
            const newInfo = createNewSectionInfo(data.id, cloneDeep(data.textData), data.templateId);
            this.arr.push(newInfo);
        }
    }
}

export const sectionInfos = new SectionInfos([new SectionDetail(), new SectionExperience(), new SectionEducation(), new SectionSkill(), new SectionOther()]);

autorun(() => {
    let title = localization[languageManager.langCode].resumeTitle;
    for (const sectionInfo of sectionInfos.arr) {
        if (sectionInfo instanceof SectionDetail && sectionInfo.textData.personName) {
            title = `${sectionInfo.textData.personName}-${localization[languageManager.langCode].resume}`
        }
    }
    sectionInfos.setTitle(title.replaceAll(' ', '-'));
})