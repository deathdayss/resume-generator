import { Experience } from '@/data/resumeData';
import { Text, View } from '@react-pdf/renderer'
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
        {experience.comments.map((comment) => <Text>
            <Text style={docStyles.boldText}>·</Text>
            <Text>{` ${comment}`}</Text>
        </Text>)}
    </View>
}

export default ExperienceView;