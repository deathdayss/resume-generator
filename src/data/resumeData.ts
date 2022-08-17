export type Period = [string, string]
export interface Detail {
    personName: string,
    visa: string,
    phone: string,
    email: string
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

export type SectionInfo = { id: 'Detail', data: Detail } |
{ id: 'Experience', data: ExperienceInfo } |
{ id: 'Education', data: EducationInfo } |
{ id: 'Skill', data: SkillInfo } |
{ id: 'Other', data: OtherInfo }

export const sectionInfos: SectionInfo[] = [
    {
        id: 'Detail',
        data: {
            personName: 'Zhicheng Wang',
            visa: 'subclass 500 (full working right)',
            phone: '0413478828',
            email: 'zhichengwangs@outlook.com'
        }
    },
    {
        id: 'Experience',
        data: {
            title: '',
            items: [{
                companyName: 'Mochi Labs Pty Ltd (Canberra)',
                position: 'Front-end Internship',
                period: ['07/2021', 'current'],
                duration: '3 months',
                comments: ['Debugged the page including repairing the Emoji component. Created a customized highlighting system for the user selection based on a collaborative library ProseMirror.',
                    'Writing automatic front-end tests by using Playwright.']
            },
            {
                companyName: 'Meiping Meiwu (Shanghai) Technology Ltd',
                position: 'Front-end Internship',
                period: ['12/2021', '02/2022'],
                duration: '3 months',
                comments: ['Debugged the page including passing the html fragment with style, cleaning left reference of Input component.',
                    'Used ant-design library and Flex layout to construct the data config page for an internal management system. Implemented a customised Cascader component to choose multiple items. This function has not been implemented in Cascader component of ant-design library.']
            }]
        }
    },
    {
        id: 'Education',
        data: {
            title: '',
            items: [{
                instituionName: 'The Australian National University',
                degree: 'Bachelor of Information Technology',
                GPA: '6.412/7',
                period: ['02/2019', '06/2022'],
                duration: '3-year Degree',
                comments: ['Courses include programming courses such as Java, Haskell, Python, SQL, software engineering courses, machine Learning and math courses']
            }]
        }
    },
    {
        id: 'Skill',
        data: {
            title: '',
            items: [{
                skillName: 'Javasciprt/Typescript ES6',
                proficiency: 'proficient'
            },
            {
                skillName: 'Javasciprt/Typescript ES6',
                proficiency: 'proficient'
            }]
        }
    },
    {
        id: 'Other',
        data: {
            title: '',
            comment: 'github: https://github.com/deathdayss'
        }
    }
]