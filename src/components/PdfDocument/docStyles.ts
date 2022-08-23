import React from "react";
type FontWeight = 'normal' | 'bold'

const fontWeight: FontWeight = 'bold';
export const initialDocStyles = {
    page: {
        padding: '0.75in',
        fontSize: '12',
        fontFamily: 'Times-Roman',
    },
    section: {
        marginBottom: '15',
    },
    title: {
        fontSize: '17',
        marginBottom: '5'
    },
    sectionItem: {
        marginBottom: '10',
    }
};

export const stableDocStyles = {}
export const initialFormStyles = {
    page: {
        padding: '0.75in',
        fontSize: '12',
        fontFamily: 'Times-Roman',
    },
    section: {
        marginBottom: '15',
    },
    title: {
        fontSize: '17',
        marginBottom: '5'
    },
    sectionItem: {
        marginBottom: '10',
    }
}

export type BoldText = {
    boldText: {
        fontFamily?: string,
        fontWeight?: FontWeight
    }
}

export type DocStyles = typeof initialDocStyles;
export type DocStylesKey = keyof DocStyles;

export type FormStyles = typeof initialFormStyles;
export type FormStylesKey = keyof FormStyles;

export type StableStyles = typeof stableDocStyles;
export type CombineStyles = DocStyles & StableStyles & BoldText;

export const DocStylesContext = React.createContext<CombineStyles>({} as CombineStyles);