import { Detail, EducationInfo, ExperienceInfo, OtherInfo, SectionInfo, SkillInfo } from '@/data/resumeData';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import React from 'react';
import { useMemo } from 'react';
import DetailSection from './DetailSection';
import docStyles, { DocStylesContext } from './docStyles';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import OtherSection from './OtherSection';
import SkillSection from './SkillSection';

interface ResumeDocProps {
    styleArgs?: object
    sectionInfos: SectionInfo[]
}

const ResumeDoc = (
    { sectionInfos, styleArgs }: ResumeDocProps
) => {
    const styles = useMemo(() => {
        return StyleSheet.create({ ...docStyles, ...styleArgs })
    }, [styleArgs]);
    return <Document >
        <DocStylesContext.Provider value={styles}>
            <Page size="A4" style={styles.page}>
                {sectionInfos.map((sectionInfo, index) => {
                    const last = index === sectionInfos.length - 1;
                    const { id, textData, templateId } = sectionInfo
                    const commonProps = {key:id, last, templateId};
                    switch (id) {
                        case 'Detail':
                            return <DetailSection {...commonProps} detail={textData}/>;
                        case 'Experience':
                            return <ExperienceSection {...commonProps} experience={textData}/>
                        case 'Education':
                            return <EducationSection {...commonProps} education={textData}/>;
                        case 'Skill':
                            return <SkillSection {...commonProps} skill={textData}/>;
                        case 'Other':
                            return <OtherSection {...commonProps} other={textData}/>;
                        default:
                            throw new Error('invalid section id')
                    }
                })}
            </Page>
        </DocStylesContext.Provider>
    </Document >
};

export default ResumeDoc;