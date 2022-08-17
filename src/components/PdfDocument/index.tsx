import { ResumeData } from '@/data/resumeData';
import { Document, Page, Text } from '@react-pdf/renderer';
import DetailSection from './DetailSection';
import docStyles from './docStyles';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import SkillSection from './SkillSection';

const ResumeDoc = (
    { detail, experience, education, skills }: ResumeData
) => {
    return <Document >
        <Page size="A4" style={docStyles.page}>
            <DetailSection detail={detail} />
            <ExperienceSection experience={experience} />
            <EducationSection education={education} />
            <SkillSection skills={skills} />
        </Page>
    </Document >
};

export default ResumeDoc;