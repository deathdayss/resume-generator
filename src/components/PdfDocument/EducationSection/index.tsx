import { getPeriodText } from '@/components/helper/helper';
import { Education, EducationInfo } from '@/data/docData';
import { docStylesManager } from '@/data/docStyles';
import localization, { languageManager } from '@/data/localization';
import { Text, View } from '@react-pdf/renderer';
import { observer } from 'mobx-react-lite';
import { LastProps, SectionProps } from '../common/type';
import Section from '../components/Section';

interface EducationViewProps extends LastProps {
    education: Education,
}

const EducationView = observer(({ education, last }: EducationViewProps) => {
    const educationLocal = localization[languageManager.langCode].document.education;
    const commonLocal = localization[languageManager.langCode].document.common;
    const periodText = getPeriodText(education.period);
    const { docStyles } = docStylesManager;
    return <View style={last ? [] : docStyles.sectionItem}>
        <Text>
            <Text style={docStyles.boldText}>{education.degree ? education.degree : educationLocal.yourDegree}</Text>
            <Text> - {education.instituionName ? education.instituionName : educationLocal.instituionName}</Text>
        </Text>
        <Text>
            <Text>{education.duration ? education.duration : commonLocal.duration}</Text>
            <Text>{`    ${periodText}`}</Text>
        </Text>
        {education.GPA === null ? null : <Text style={docStyles.boldText}>GPA: {education.GPA ? education.GPA : educationLocal.yourGPA}</Text>}
        {education.descriptions.map((description) => <Text key={description.id}>
            <Text style={docStyles.boldText}>·</Text>
            <Text>{` ${description.description ? description.description : commonLocal.yourDescription}`}</Text>
        </Text>)}
    </View>
})

interface EducationSectionProps extends SectionProps {
    education: EducationInfo
}

const EducationSection = ({ education, templateId, last = false }: EducationSectionProps) => {
    const { title, items } = education;
    if (items.length === 0) {
        return null;
    }
    const educationLocal = localization[languageManager.langCode].document.education;
    return <Section title={title ? title : educationLocal.title} last={last}>
        {items.map((edu, index) => <EducationView key={edu.id} education={edu} last={index === items.length - 1} />)}
    </Section>
}

export default observer(EducationSection);