import { Text } from '@react-pdf/renderer';
import { SkillInfo } from "@/data/resumeData"
import Section from '../components/Section';
import localization, { LanguageContext } from '@/data/localization';
import { useContext } from 'react';

interface SkillSectionProps {
    skills: SkillInfo
}

const SkillSection = ({ skills }: SkillSectionProps) => {
    const langCode = useContext(LanguageContext);
    const { title, items } = skills;
    console.log('langCode in Skill section', langCode)
    if (items.length === 0) {
        return null;
    }
    const skillLocal = localization[langCode].document.skill;
    return <Section title={title ? title : skillLocal.title}>
        {items.map((skill, index) => <Text key={index}>{skill.skillName ? skill.skillName : skillLocal.yourSkillName} - {skill.proficiency ? skill.proficiency : skillLocal.yourProficiency}</Text>)}
    </Section>
}

export default SkillSection;