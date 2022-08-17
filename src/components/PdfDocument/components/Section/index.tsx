import { Text, View } from '@react-pdf/renderer';
import React, { useContext } from 'react';
import { LastProps } from '../../common/type';
import { DocStylesContext } from '../../docStyles';
interface SectionProps extends LastProps {
    children: React.ReactNode,
    title: string,
    titleStyle?: object,
}

const Section = ({ children, title, last = false }: SectionProps) => {
    const docStyles = useContext(DocStylesContext);
    return < View style={last ? [] : docStyles.section} >
        <Text style={docStyles.title}>{title}</Text>
        {children}
    </View >
}

export default Section;