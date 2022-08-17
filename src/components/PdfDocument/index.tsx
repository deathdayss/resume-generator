import { ResumeData } from '@/data/resumeData';
import { Document, Page, Text } from '@react-pdf/renderer';
import docStyles from './docStyles';
import EducationView from './EducationView';
import ExperienceView from './ExperienceView';
import Section from './Section';

// Create Document Component
const ResumeDoc = (
    { detail, experience, education, skills }: ResumeData
) => {
    return <Document >
        <Page size="A4" style={docStyles.page}>
            <Section title={detail.personName}>
                <Text>{`${detail.phone} | ${detail.email}`}</Text>
            </Section>
            <Section title='Experience'>
                {experience.map((exp, index) => <ExperienceView experience={exp} last={index === experience.length - 1} />)}
            </Section>
            <Section title='Education'>
                {education.map((edu, index) => <EducationView education={edu} last={index === experience.length - 1} />)}
            </Section>
            <Section title='Skills'>
                {skills.map(skill => <Text>{skill.skillName} - {skill.proficiency}</Text>)}
            </Section>
        </Page>
    </Document >

};

export default ResumeDoc;