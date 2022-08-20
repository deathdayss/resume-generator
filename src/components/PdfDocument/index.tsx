import { LanguageContext } from '@/data/localization';
import { Detail, docDataToFormData, DocFormDataContext, EducationInfo, ExperienceInfo, OtherInfo, SectionInfo, SkillInfo } from '@/data/resumeData';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { useContext, useMemo } from 'react';
import DetailSection from './DetailSection';
import { DocStyles, DocStylesContext } from './docStyles';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import OtherSection from './OtherSection';
import SkillSection from './SkillSection';


const ResumeDoc = () => {
    const { sectionInfos, styleArgs, title } = useContext(DocFormDataContext);
    return <Document title={title}>
        <DocStylesContext.Provider value={styleArgs}>
            <Page size="A4" style={styleArgs.page}>
                {sectionInfos.map((sectionInfo, index) => {
                    const last = index === sectionInfos.length - 1;
                    const { id, textData, templateId } = sectionInfo
                    const commonProps = { key: id, last, templateId };
                    switch (id) {
                        case 'Detail':
                            return <DetailSection {...commonProps} detail={textData as Detail} />;
                        case 'Experience':
                            return <ExperienceSection {...commonProps} experience={textData as ExperienceInfo} />
                        case 'Education':
                            return <EducationSection {...commonProps} education={textData as EducationInfo} />;
                        case 'Skill':
                            return <SkillSection {...commonProps} skill={textData as SkillInfo} />;
                        case 'Other':
                            return <OtherSection {...commonProps} other={textData as OtherInfo} />;
                        default:
                            throw new Error('invalid section id')
                    }
                })}
            </Page>
        </DocStylesContext.Provider>
    </Document >
};

export default ResumeDoc;