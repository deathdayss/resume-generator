import { Text } from '@react-pdf/renderer';
import { SkillInfo } from "@/data/docData"
import Section from '../components/Section';
import localization, { LanguageContext } from '@/data/localization';
import { useContext } from 'react';
import { SectionProps } from '../common/type';

interface SkillSectionProps extends SectionProps {
    skill: SkillInfo
}

const SkillSection = ({ skill, templateId, last = false }: SkillSectionProps) => {
    const langCode = useContext(LanguageContext);
    const { title, items } = skill;
    const skillLocal = localization[langCode].document.skill;
    return <Section title={title ? title : skillLocal.title} last={last}>
        {items.map((skill, index) => <Text key={index}>{skill.skillName ? skill.skillName : skillLocal.yourSkillName} - {skill.description ? skill.description : skillLocal.yourDescription}</Text>)}
    </Section>
}

export default SkillSection;