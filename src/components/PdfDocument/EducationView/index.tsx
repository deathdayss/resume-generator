import { Education, Experience } from '@/data/resumeData';
import { Text, View } from '@react-pdf/renderer'
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

export default EducationView;