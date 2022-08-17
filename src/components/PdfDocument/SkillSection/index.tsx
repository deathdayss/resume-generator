import { Text } from '@react-pdf/renderer';
import { SkillInfo } from "@/data/resumeData"
import Section from '../components/Section';
import localization, { LanguageContext } from '@/data/localization';
import { useContext } from 'react';
import { LastProps } from '../common/type';

interface SkillSectionProps extends LastProps {
    skill: SkillInfo
}

const SkillSection = ({ skill, last = false }: SkillSectionProps) => {
    const langCode = useContext(LanguageContext);
    const { title, items } = skill;
    console.log('langCode in Skill section', langCode)
    if (items.length === 0) {
        return null;
    }
    const skillLocal = localization[langCode].document.skill;
    return <Section title={title ? title : skillLocal.title} last={last}>
        {items.map((skill, index) => <Text key={index}>{skill.skillName ? skill.skillName : skillLocal.yourSkillName} - {skill.proficiency ? skill.proficiency : skillLocal.yourProficiency}</Text>)}
    </Section>
}

export default SkillSection;