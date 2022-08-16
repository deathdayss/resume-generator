import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import docStyles from './docStyles';

// Create Document Component
const ResumeDoc = () => {
    return <Document>
        <Page size="A4" style={docStyles.page}>
            <View style={docStyles.section}>
                <Text>Section #1</Text>
            </View>
            <View style={docStyles.section}>
                <Text>Section #2</Text>
            </View>
        </Page>
    </Document>

};

export default ResumeDoc;