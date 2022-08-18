import localization, { LanguageContext } from '@/data/localization';
import { Education, EducationInfo } from '@/data/resumeData';
import { Text, View } from '@react-pdf/renderer'
import { useContext, useMemo } from 'react';
import { getPeriodText } from '../common/helper';
import { LastProps, SectionProps } from '../common/type';
import Section from '../components/Section';
import { DocStylesContext } from '../docStyles';

interface EducationViewProps extends LastProps {
    education: Education,
}

const EducationView = ({ education, last }: EducationViewProps) => {
    const langCode = useContext(LanguageContext);
    const docStyles = useContext(DocStylesContext);
    const educationLocal = localization[langCode].document.education;
    const commonLocal = localization[langCode].document.common;
    const periodText = useMemo(() => {
        return getPeriodText(langCode, education.period);
    }, [education.period, langCode])
    return <View style={last ? [] : docStyles.sectionItem}>
        <Text>
            <Text style={docStyles.boldText}>{education.degree ? education.degree : educationLocal.yourDegree}</Text>
            <Text> - {education.instituionName ? education.instituionName : educationLocal.instituionName}</Text>
        </Text>
        <Text>
            <Text>{education.duration ? education.duration : commonLocal.duration}</Text>
            <Text>{`    ${periodText}`}</Text>
        </Text>
        {education.GPA === undefined ? null : <Text style={docStyles.boldText}>GPA: {education.GPA ? education.GPA : educationLocal.yourGPA}</Text>}
        {education.comments.map((comment, index) => <Text key={index}>
            <Text style={docStyles.boldText}>·</Text>
            <Text>{` ${comment ? comment : commonLocal.yourComment}`}</Text>
        </Text>)}
    </View>
}

interface EducationSectionProps extends SectionProps {
    education: EducationInfo
}

const EducationSection = ({ education, templateId, last = false }: EducationSectionProps) => {
    const langCode = useContext(LanguageContext);
    const { title, items } = education;
    if (items.length === 0) {
        return null;
    }
    const educationLocal = localization[langCode].document.education;
    return <Section title={title ? title : educationLocal.title} last={last}>
        {items.map((edu, index) => <EducationView key={index} education={edu} last={index === items.length - 1} />)}
    </Section>
}

export default EducationSection;