import { Text, View, StyleSheet } from '@react-pdf/renderer';
import React, { useMemo } from 'react';
import docStyles from './docStyles';
interface SectionProps {
    children: React.ReactNode,
    title: string,
    titleStyle?: object
}

const Section = ({ children, title, titleStyle }: SectionProps) => {
    const styles = useMemo(() => {
        if (titleStyle) {
            docStyles.title = { ...docStyles.title, ...titleStyle };
        }
        return docStyles;
    }, [title])
    return < View style={styles.section} >
        <Text style={styles.title}>{title}</Text>
        {children}
    </View >
}

export default Section;