
import { StyleSheet } from '@react-pdf/renderer';

const docStyles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

export default docStyles;