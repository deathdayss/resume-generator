type Period = [string, string]
export interface Detail {
    personName: string,
    phone: string,
    email: string
}

export interface Experience {
    companyName: string,
    position: string,
    period: Period,
    length: string,
    comments: string[]
}

export interface Education {
    instituionName: string,
    degree: string,
    GPA: string,
    period: Period,
    length: string
}

export interface Skill {
    skillName: string,
    proficiency: string
}

export interface ResumeData {
    detail: Detail,
    experience: Experience[],
    education: Education[],
    skills: Skill[]
}

const resumeData: ResumeData = {
    detail: {
        personName: 'Zhicheng Wang',
        phone: '0413478828',
        email: 'zhichengwangs@outlook.com'
    },
    experience: [{
        companyName: 'Mochi Labs Pty Ltd (Canberra)',
        position: 'Front-end Internship',
        period: ['07/2021', 'current'],
        length: '3 months',
        comments: ['Debugged the page including repairing the Emoji component. Created a customized highlighting system for the user selection based on a collaborative library ProseMirror.',
            'Writing automatic front-end tests by using Playwright.']
    }, {
        companyName: 'Meiping Meiwu (Shanghai) Technology Ltd',
        position: 'Front-end Internship',
        period: ['12/2021', '02/2022'],
        length: '3 months',
        comments: ['Debugged the page including passing the html fragment with style, cleaning left reference of Input component.',
            'Used ant-design library and Flex layout to construct the data config page for an internal management system. Implemented a customised Cascader component to choose multiple items. This function has not been implemented in Cascader component of ant-design library.']
    }],
    education: [{
        instituionName: 'The Australian National University',
        degree: 'Bachelor of Information Technology',
        GPA: '6.412/7',
        period: ['02/2019', '06/2022'],
        length: '3-year Degree'
    }],
    skills: [{
        skillName: 'Javasciprt/Typescript ES6',
        proficiency: 'proficient'
    }]
}

export default resumeData;