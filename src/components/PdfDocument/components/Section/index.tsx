import { docStylesManager } from '@/data/docStyles';
import { Text, View } from '@react-pdf/renderer';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { LastProps } from '../../common/type';
// import { DocStylesContext } from '../../docStyles';
interface SectionProps extends LastProps {
    children: React.ReactNode,
    title: string,
    titleStyle?: object,
}

const Section = ({ children, title, last = false }: SectionProps) => {
    return < View style={last ? [] : docStylesManager.docStyles.section} >
        <Text style={docStylesManager.docStyles.title}>{title}</Text>
        {children}
    </View >
    return null;
}

export default observer(Section);