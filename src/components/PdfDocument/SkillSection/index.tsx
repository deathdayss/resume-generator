import { Text } from '@react-pdf/renderer';
import { Skill } from "@/data/resumeData"
import Section from '../components/Section';

interface SkillSectionProps {
    skills: Skill[]
}

const SkillSection = ({ skills }: SkillSectionProps) => {
    return <Section title='Skills'>
        {skills.map(skill => <Text key={skill.skillName}>{skill.skillName} - {skill.proficiency}</Text>)}
    </Section>
}

export default SkillSection;