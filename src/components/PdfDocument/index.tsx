import { ResumeData } from '@/data/resumeData';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import React from 'react';
import { useMemo } from 'react';
import DetailSection from './DetailSection';
import docStyles, { DocStylesContext } from './docStyles';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import SkillSection from './SkillSection';

interface ResumeDocProps extends ResumeData {
    styleArgs?: object
}

const ResumeDoc = (
    { detail, experience, education, skills, styleArgs }: ResumeDocProps
) => {
    const styles = useMemo(() => {
        return StyleSheet.create({ ...docStyles, ...styleArgs })
    }, [styleArgs]);
    return <Document >
        <DocStylesContext.Provider value={styles}>
            <Page size="A4" style={styles.page}>
                <DetailSection detail={detail} />
                <ExperienceSection experience={experience} />
                <EducationSection education={education} />
                <SkillSection skills={skills} />
            </Page>
        </DocStylesContext.Provider>
    </Document >
};

export default ResumeDoc;