import { Education, Experience } from '@/data/resumeData';
import { Text, View } from '@react-pdf/renderer'
import Section from '../components/Section';
import docStyles from './docStyles';

interface EducationViewProps {
    education: Education,
    last: boolean
}

const EducationView = ({ education, last }: EducationViewProps) => {
    return <View style={last ? [] : docStyles.view}>
        <Text>
            <Text style={docStyles.boldText}>{`${education.degree}`}</Text>
            <Text> - {education.instituionName}</Text>
        </Text>
        <Text>
            <Text>{education.length}</Text>
            <Text>{`    ${education.period[0]} - ${education.period[1]}`}</Text>
        </Text>
        <Text>
            <Text style={docStyles.boldText}>GPA: {education.GPA}</Text>
        </Text>
    </View>
}

interface EducationSectionProps {
    education: Education[]
}

const EducationSection = ({ education }: EducationSectionProps) => {
    return <Section title='Education'>
        {education.map((edu, index) => <EducationView key={edu.period[0] + edu.period[1]} education={edu} last={index === education.length - 1} />)}
    </Section>
}

export default EducationSection;