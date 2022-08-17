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
                    const { id, data } = sectionInfo
                    switch (id) {
                        case 'Detail':
                            return <DetailSection key={id} detail={data} last={last} />;
                        case 'Experience':
                            return <ExperienceSection key={id} experience={data} last={last} />
                        case 'Education':
                            return <EducationSection key={id} education={data} last={last} />;
                        case 'Skill':
                            return <SkillSection key={id} skill={data} last={last} />;
                        case 'Other':
                            return <OtherSection key={id} other={data} last={last} />;
                        default:
                            throw new Error('invalid section id')
                    }
                })}
            </Page>
        </DocStylesContext.Provider>
    </Document >
};

export default ResumeDoc;