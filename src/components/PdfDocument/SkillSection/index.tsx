import { SkillInfo } from "@/data/docData";
import localization, { languageManager } from '@/data/localization';
import { Text } from '@react-pdf/renderer';
import { observer } from 'mobx-react-lite';
import { SectionProps } from '../common/type';
import Section from '../components/Section';

interface SkillSectionProps extends SectionProps {
    skill: SkillInfo
}

const SkillSection = ({ skill, templateId, last = false }: SkillSectionProps) => {
    const { title, items } = skill;
    const skillLocal = localization[languageManager.langCode].document.skill;
    return <Section title={title ? title : skillLocal.title} last={last}>
        {items.map((skill, index) => <Text key={index}>{skill.skillName ? skill.skillName : skillLocal.yourSkillName} - {skill.description ? skill.description : skillLocal.yourDescription}</Text>)}
    </Section>
}

export default observer(SkillSection);