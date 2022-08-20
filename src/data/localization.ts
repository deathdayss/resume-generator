import React from "react";

export type Language = 'eng' | 'chi'

export const LanguageContext = React.createContext<Language>('eng')

const eng = {
    name: 'English',
    resume: 'Resume',
    resumeTitle: 'Resume-Title',
    message: {
        fileExtensionError: 'Incorrect File Extension',
        fileUploadSuccess: 'Upload the .json File Successfully',
        parseError: '.json file parsing error',
        formatError: 'Invalid Data Structure of the .json File'
    },
    form: {
        label: {
            title: 'The Section Title',
            personName: 'Name',
            visa: 'Visa State',
            phone: 'Phone Number',
            email: 'Email'
        },
        button: {
            collapseAll: 'Collapse All',
            expandAll: 'Expand All',
            defaultLayout: 'Default Layout',
            useAll: 'Use All Sections',
            openView: 'Open View',
            hideView: 'Hide View',
            save: 'Save',
            downloadPdf: 'Download PDF',
            downloadJson: 'Download JSON',
            uploadJson: 'Upload JSON'
        },
        title: {
            Detail: 'Personal Detail',
            Experience: 'Experience',
            Education: 'Education',
            Skill: 'Skill',
            Other: 'Other'
        }
    },
    document: {
        common: {
            duration: '[Duration in Months or Years]',
            startDate: '[Start Date]',
            endDate: '[End Date]',
            yourComment: '[Your Comment]'
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
}

type localizationContent = typeof eng;

const chi: localizationContent = {
    name: '中文',
    resume: '简历',
    resumeTitle: '简历名',
    message: {
        fileExtensionError: '错误的文件扩展',
        fileUploadSuccess: '成功上传.json文件',
        parseError: '解析.json文件错误',
        formatError: '.json文件数据结构不正确'
    },
    form: {
        label: {
            title: '板块名称',
            personName: '姓名',
            visa: '签证状态',
            phone: '电话',
            email: '电子邮件'
        },
        button: {
            collapseAll: '收起全部',
            expandAll: '展开全部',
            defaultLayout: '默认布局',
            useAll: '使用全部板块',
            openView: '打开视图',
            hideView: '关闭视图',
            save: '保存',
            downloadPdf: '下载 PDF',
            downloadJson: '下载 JSON',
            uploadJson: '上传 JSON'
        },
        title: {
            Detail: '个人信息',
            Experience: '工作经历',
            Education: '教育背景',
            Skill: '技能',
            Other: '其他'
        }
    },
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
            title: '教育背景',
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

const localization: { [key in Language]: localizationContent } = {
    eng,
    chi
}

export default localization;