import { Document, Page, Text, View } from '@react-pdf/renderer';
import docStyles from './docStyles';
import Section from './Section';

// Create Document Component
const ResumeDoc = (
    { detail, experience, education, skils }: any
) => {
    return <Document >
        <Page size="A4" style={docStyles.page}>
            <Section title={detail.personName} titleStyle={{fontSize: 17}}>
            <Text>{`${detail.phone} | ${detail.email}`}</Text>
            <Text>hahaha</Text>
        </Section>
    </Page>
    </Document >

};

export default ResumeDoc;