import React from "react";
import fontFamily from "@/fonts";

type FontWeight = 'normal' | 'bold'

const fontWeight: FontWeight = 'bold';
export const initialDocStyles = {
    page: {
        padding: '0.75in',
        fontSize: '12',
        fontFamily: 'Arial',
    },
    section: {
        marginBottom: '15',
    },
    title: {
        fontSize: '17',
        marginBottom: '5'
    },
    boldText: {
        fontWeight
    },
    sectionItem: {
        marginBottom: '10',
    }
};
export const initialFormStyles = {
    page: {
        padding: '0.75in',
        fontSize: '12',
        fontFamily: 'Arial',
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

export type DocStyles = typeof initialDocStyles;
export type DocStylesKey = keyof DocStyles;

export type FormStyles = typeof initialFormStyles;
export type FormStylesKey = keyof FormStyles;

export const DocStylesContext = React.createContext(initialDocStyles);