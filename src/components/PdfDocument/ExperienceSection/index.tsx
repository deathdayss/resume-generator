import localization, { languageManager } from '@/data/localization';
import { Experience, ExperienceInfo } from '@/data/docData';
import { Text, View } from '@react-pdf/renderer'
import { LastProps, SectionProps } from '../common/type';
import Section from '../components/Section';
import { docStylesManager } from '@/data/docStyles';
import { getPeriodText } from '@/components/helper/helper';
import { observer } from 'mobx-react-lite';
// import { DocStylesContext } from '../docStyles';

interface ExperienceViewProps extends LastProps {
    experience: Experience,
}

const ExperienceView = observer(({ experience, last }: ExperienceViewProps) => {
    const { docStyles } = docStylesManager;
    const experienceLocal = localization[languageManager.langCode].document.experience;
    const commonLocal = localization[languageManager.langCode].document.common;
    const periodText = getPeriodText(experience.period);
    return <View style={last ? [] : docStyles.sectionItem}>
        <Text>
            <Text style={docStyles.boldText}>{experience.position ? experience.position : experienceLocal.yourPosition}</Text>
            <Text> - {experience.companyName ? experience.companyName : experienceLocal.companyName}</Text>
        </Text>
        <Text>
            <Text style={docStyles.boldText}>{experience.duration ? experience.duration : commonLocal.duration}</Text>
            <Text>{`    ${periodText}`}</Text>
        </Text>
        {experience.descriptions.arr.map((description, index) => <Text key={description.id}>
            <Text style={docStyles.boldText}>·</Text>
            <Text>{` ${description.description ? description.description : commonLocal.yourDescription}`}</Text>
        </Text>)}
    </View>
})

interface ExperienceSectionProps extends SectionProps {
    experience: ExperienceInfo
}

const ExperienceSection = ({ experience, last = false }: ExperienceSectionProps) => {
    const { title, items } = experience;
    const experienceLocal = localization[languageManager.langCode].document.experience;
    return <Section title={title ? title : experienceLocal.titile} last={last}>
        {items.arr.map((exp, index) => <ExperienceView key={index} experience={exp} last={index === items.arr.length - 1} />)}
    </Section>
}

export default observer(ExperienceSection);