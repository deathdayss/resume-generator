import localization, { languageManager } from '@/data/localization';
import { Experience, ExperienceInfo } from '@/data/docData';
import { Text, View } from '@react-pdf/renderer'
import { useContext, useMemo } from 'react';
import { getPeriodText } from '../common/helper';
import { LastProps, SectionProps } from '../common/type';
import Section from '../components/Section';
// import { DocStylesContext } from '../docStyles';

interface ExperienceViewProps extends LastProps {
    experience: Experience,
}

const ExperienceView = ({ experience, last }: ExperienceViewProps) => {
    // const { langCode } = languageManager;
    // const docStyles = useContext(DocStylesContext);
    // const experienceLocal = localization[langCode].document.experience;
    // const commonLocal = localization[langCode].document.common;
    // const periodText = useMemo(() => {
    //     return getPeriodText(langCode, experience.period);
    // }, [experience.period, langCode])
    // return <View style={last ? [] : docStyles.sectionItem}>
    //     <Text>
    //         <Text style={docStyles.boldText}>{experience.position ? experience.position : experienceLocal.yourPosition}</Text>
    //         <Text> - {experience.companyName ? experience.companyName : experienceLocal.companyName}</Text>
    //     </Text>
    //     <Text>
    //         <Text style={docStyles.boldText}>{experience.duration ? experience.duration : commonLocal.duration}</Text>
    //         <Text>{`    ${periodText}`}</Text>
    //     </Text>
    //     {experience.descriptions.map((description, index) => <Text key={index}>
    //         <Text style={docStyles.boldText}>·</Text>
    //         <Text>{` ${description ? description : commonLocal.yourDescription}`}</Text>
    //     </Text>)}
    // </View>
    return null;
}

interface ExperienceSectionProps extends SectionProps {
    experience: ExperienceInfo
}

const ExperienceSection = ({ experience, last = false }: ExperienceSectionProps) => {
    const { langCode } = languageManager
    const { title, items } = experience;
    const experienceLocal = localization[langCode].document.experience;
    return <Section title={title ? title : experienceLocal.titile} last={last}>
        {items.map((exp, index) => <ExperienceView key={index} experience={exp} last={index === items.length - 1} />)}
    </Section>
}

export default ExperienceSection;