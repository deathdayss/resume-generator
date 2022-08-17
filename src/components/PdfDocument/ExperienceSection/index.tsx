import { Experience } from '@/data/resumeData';
import { Text, View } from '@react-pdf/renderer'
import Section from '../components/Section';
import docStyles from './docStyles';

interface ExperienceViewProps {
    experience: Experience,
    last: boolean
}

const ExperienceView = ({ experience, last }: ExperienceViewProps) => {
    return <View style={last ? [] : docStyles.view}>
        <Text>
            <Text style={docStyles.boldText}>{experience.position}</Text>
            <Text> - {experience.companyName}</Text>
        </Text>
        <Text>
            <Text style={docStyles.boldText}>{experience.length}</Text>
            <Text>{`    ${experience.period[0]} - ${experience.period[1]}`}</Text>
        </Text>
        {experience.comments.map((comment) => <Text key={comment.substring(0, 10)}>
            <Text style={docStyles.boldText}>·</Text>
            <Text>{` ${comment}`}</Text>
        </Text>)}
    </View>
}

interface ExperienceSectionProps {
    experience: Experience[]
}

const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
    return <Section title='Experience'>
        {experience.map((exp, index) => <ExperienceView key={exp.period[0] + exp.period[1]} experience={exp} last={index === experience.length - 1} />)}
    </Section>
}

export default ExperienceSection;