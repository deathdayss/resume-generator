import { Text, View, StyleSheet } from '@react-pdf/renderer';
import React, { useContext, useMemo } from 'react';
import { DocStylesContext } from '../../docStyles';
interface SectionProps {
    children: React.ReactNode,
    title: string,
    titleStyle?: object
}

const Section = ({ children, title}: SectionProps) => {
    const docStyles = useContext(DocStylesContext);
    return < View style={docStyles.section} >
        <Text style={docStyles.title}>{title}</Text>
        {children}
    </View >
}

export default Section;