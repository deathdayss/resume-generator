import React from "react";

export type Language = 'eng' | 'chi';
export const LanguageContext = React.createContext<Language>('eng');

const eng = {
    name: 'English',
    resume: 'Resume',
    resumeTitle: 'Resume-Title',
    footer: {
        devLink: 'Github Repository',
    },
    form: {
        message: {
            fileExtensionError: 'Fail to upload: Incorrect File Extension!',
            formatError: 'Fail to upload: Invalid Data Structure of the .json File!',
            documentFailLoad: 'The PDF document fails to be loaded!',
            fileUploadSuccess: 'Upload the .json File Successfully!',
            parseError: 'Fail to upload: .json file parsing error!',
            documentLoading: 'The PDF document is still loading',
            saveError: 'Fail to save: invalid data format!',
            saveSuccess: 'Successfully save the data!'
        },
        template: {
            default: 'default'
        },
        label: {
            title: 'Section Title',
            template: 'Template',
            personName: 'Name',
            visa: 'Visa State',
            phone: 'Phone Number',
            email: 'Email',
            companyName: 'Company Name',
            position: 'Position',
            duration: 'duration',
            startTime: 'Starting Time',
            endTime: 'Ending Time',
            description: 'Description',
            instituionName: 'Institution Name',
            degree: 'Degree',
            GPA: 'GPA',
            skill: 'Skill',
            skillDescription: 'Skill Description',
            otherDescription: 'Other Description',
            pagePadding: 'Page Padding',
            bodyFontSize: 'Body Font Size',
            titleFontSize: 'Title Font Size',
            titleGap: 'Title Bottom Margin',
            fontFamily: 'Font Family',
            sectionGap: 'Section Gap',
            sectionAddGap: 'Section Adding Gap'
        },
        modal: {
            experienceDelete: 'Delete this work experience',
            educationDelete: 'Delete this educational experience',
            experienceAdd: 'Add a new work experience?',
            educationAdd: 'Add a new educational experience?',
            addDescription: 'Add a new description?',
            deleteDescription: 'Delete this description?',
            addSkill: 'Add a new skill?',
            deleteSkill: 'Delete this skill?',
            no: 'No',
            yes: 'Yes',
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
            uploadJson: 'Upload JSON',
            add: 'Add',
            delete: 'Delete',
            addDescription: 'Add a Description',
            defaultStyle: 'Default Style'
        },
        title: {
            detail: 'Personal Detail',
            experience: 'Experience',
            education: 'Education',
            skill: 'Skill',
            other: 'Other',
            style: 'Resume Style'
        }
    },
    document: {
        common: {
            duration: '[Duration in Months or Years]',
            startDate: '[Starting Time]',
            endDate: '[Ending Time]',
            yourDescription: '[Your Description]'
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
            yourDescription: '[You Description]'
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
    footer: {
        devLink: 'Github代码库',
    },
    form: {
        message: {
            fileExtensionError: '上传失败：错误的文件扩展！',
            documentFailLoad: 'PDF文档加载错误！',
            formatError: '上传失败：.json文件数据结构不正确！',
            fileUploadSuccess: '成功上传.json文件',
            parseError: '上传失败：解析.json文件错误！',
            documentLoading: 'PDF文档正在加载',
            saveError: '保存失败: 数据格式错误！',
            saveSuccess: '成功保存数据！'
        },
        modal: {
            experienceDelete: '删除这段工作经历？',
            educationDelete: '删除这段教育经历？',
            experienceAdd: '添加新的工作经历？',
            educationAdd: '添加新的教育经历？',
            addDescription: '添加一段新的描述？',
            deleteDescription: '删除这个描述？',
            addSkill: '添加新的技能？',
            deleteSkill: '删除这个技能？',
            no: '取消',
            yes: '确定',
        },
        template: {
            default: '默认'
        },
        label: {
            title: '板块名称',
            template: '模板',
            personName: '姓名',
            visa: '签证状态',
            phone: '电话',
            email: '电子邮件',
            companyName: '公司名称',
            position: '职位',
            startTime: '开始时间',
            endTime: '结束时间',
            duration: '持续时间',
            description: '描述',
            instituionName: '教育机构名称',
            degree: '学位',
            GPA: 'GPA',
            skill: '技能',
            skillDescription: '技能描述',
            otherDescription: '其他描述',
            pagePadding: '页面内距',
            bodyFontSize: '内容字体',
            titleFontSize: '标题字体',
            titleGap: '标题下边距',
            fontFamily: '字体',
            sectionGap: '板块间距',
            sectionAddGap: '板块增添间距'
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
            uploadJson: '上传 JSON',
            add: '添加',
            delete: '删除',
            addDescription: '添加描述',
            defaultStyle: '默认样式'
        },
        title: {
            detail: '个人信息',
            experience: '工作经历',
            education: '教育背景',
            skill: '技能',
            other: '其他',
            style: '简历样式',
        }
    },
    document: {
        common: {
            duration: '[时长（年、月）]',
            startDate: '[开始日期]',
            endDate: '[结束日期]',
            yourDescription: '[你的描述]'
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
            yourDescription: '[你的描述]'
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