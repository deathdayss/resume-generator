import localization, { LanguageContext } from '@/data/localization';
import { Experience, ExperienceInfo } from '@/data/resumeData';
import { Text, View } from '@react-pdf/renderer'
import { useContext, useMemo } from 'react';
import { getPeriodText } from '../common/helper';
import Section from '../components/Section';
import { DocStylesContext } from '../docStyles';

interface ExperienceViewProps {
    experience: Experience,
    last: boolean
}

const ExperienceView = ({ experience, last }: ExperienceViewProps) => {
    const langCode = useContext(LanguageContext);
    const docStyles = useContext(DocStylesContext);
    const experienceLocal = localization[langCode].document.experience;
    const commonLocal = localization[langCode].document.common;
    const periodText = useMemo(() => {
        return getPeriodText(langCode, experience.period);
    }, [experience.period, langCode])
    return <View style={last ? [] : docStyles.sectionItem}>
        <Text>
            <Text style={docStyles.boldText}>{experience.position ? experience.position : experienceLocal.yourPosition}</Text>
            <Text> - {experience.companyName ? experience.companyName : experienceLocal.companyName}</Text>
        </Text>
        <Text>
            <Text style={docStyles.boldText}>{experience.duration ? experience.duration : commonLocal.duration}</Text>
            <Text>{`    ${periodText}`}</Text>
        </Text>
        {experience.comments.map((comment, index) => <Text key={index}>
            <Text style={docStyles.boldText}>·</Text>
            <Text>{` ${comment ? comment : commonLocal.yourComment}`}</Text>
        </Text>)}
    </View>
}

interface ExperienceSectionProps {
    experience: ExperienceInfo
}

const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
    const langCode = useContext(LanguageContext);
    const { title, items } = experience;
    if (items.length === 0) {
        return null;
    }
    const experienceLocal = localization[langCode].document.experience;
    return <Section title={title ? title : experienceLocal.titile}>
        {items.map((exp, index) => <ExperienceView key={index} experience={exp} last={index === items.length - 1} />)}
    </Section>
}

export default ExperienceSection;