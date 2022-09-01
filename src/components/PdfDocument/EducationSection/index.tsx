import localization, { languageManager } from '@/data/localization';
import { Education, EducationInfo } from '@/data/docData';
import { Text, View } from '@react-pdf/renderer'
import { LastProps, SectionProps } from '../common/type';
import Section from '../components/Section';
import { observer } from 'mobx-react-lite';
import { docStylesManager } from '@/data/docStyles';
import { getPeriodText } from '@/components/helper/helper';

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
        {education.descriptions.arr.map((description) => <Text key={description.id}>
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
    if (items.arr.length === 0) {
        return null;
    }
    const educationLocal = localization[languageManager.langCode].document.education;
    return <Section title={title ? title : educationLocal.title} last={last}>
        {items.arr.map((edu, index) => <EducationView key={index} education={edu} last={index === items.arr.length - 1} />)}
    </Section>
}

export default observer(EducationSection);