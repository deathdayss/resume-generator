import React from "react";
import fontFamily from "@/fonts";
import { type } from "os";

type FontWeight = 'normal' | 'bold'

const fontWeight: FontWeight = 'bold';
const docStyles = {
    page: {
        padding: '0.75in',
        fontSize: 12,
        fontFamily: fontFamily[0],
    },
    section: {
        marginBottom: 15,
    },
    title: {
        fontSize: 17,
        marginBottom: 5
    },
    boldText: {
        fontWeight
    },
    sectionItem: {
        marginBottom: 10,
    }
};

export const DocStylesContext = React.createContext(docStyles);

export default docStyles;
