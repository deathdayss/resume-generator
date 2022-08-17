import React from "react";

export type Language = 'eng' | 'chi'

export const LanguageContext = React.createContext<Language>('eng')

interface localizationContent {
    document: {
        common: {
            duration: string,
            startDate: string,
            endDate: string,
            yourComment: string
        }
        detail: {
            yourName: string,
            yourVisa: string,
            yourEmail: string,
            yourPhone: string
        },
        experience: {
            titile: string,
            yourPosition: string,
            companyName: string,
        },
        education: {
            title: string,
            yourDegree: string,
            instituionName: string,
            yourGPA: string
        },
        skill: {
            title: string,
            yourSkillName: string,
            yourProficiency: string
        },
        other: {
            title: string,
        }
    }
}

const localization: { [key in Language]: localizationContent } = {

    eng: {
        document: {
            common: {
                duration: '[Duration in Months or Years]',
                startDate: '[Start Date]',
                endDate: '[End Date]',
                yourComment: 'Your Comment'
            },
            detail: {
                yourName: '[Your Name]',
                yourVisa: '[Your Visa]',
                yourEmail: '[Your Email]',
                yourPhone: '[Your Phone]'
            },
            experience: {
                titile: 'Experience',
                yourPosition: '[Your Position]',
                companyName: '[The Company Name]',
            },
            education: {
                title: 'Education',
                yourDegree: '[Your Degree]',
                instituionName: '[Institution Name]',
                yourGPA: '[Your GPA]'
            },
            skill: {
                title: 'Skills',
                yourSkillName: '[Your Skill]',
                yourProficiency: '[You Proficiency]'
            },
            other: {
                title: 'Other',
            }
        }
    },
    chi: {
        document: {
            common: {
                duration: '[时长（年、月）]',
                startDate: '[开始日期]',
                endDate: '[结束日期]',
                yourComment: '[你的评价]'
            },
            detail: {
                yourName: '[你的名字]',
                yourVisa: '[你的签证]',
                yourEmail: '[你的邮件]',
                yourPhone: '[你的电话]'
            },
            experience: {
                titile: '工作经历',
                yourPosition: '[你的职位]',
                companyName: '[公司名称]',
            },
            education: {
                title: '教育经历',
                yourDegree: '[你的学位]',
                instituionName: '[教育机构名称]',
                yourGPA: '[你的GPA]'
            },
            skill: {
                title: '技能',
                yourSkillName: '[你的技能]',
                yourProficiency: '[你的熟练度]'
            },
            other: {
                title: '其他'
            }
        },
    }
}

export default localization;