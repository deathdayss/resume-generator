import { chiFonts, specialFonts } from "@/fonts";
import { StyleSheet } from '@react-pdf/renderer';
import { action, computed, makeObservable, observable, reaction } from "mobx";
import { Language, languageManager } from "./localization";

type FontWeight = 'normal' | 'bold'

export const getInitialStylesData = () => ({
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
});

export const initialStylesData = getInitialStylesData();

export const stableDocStyles = {}
export type StableStyles = typeof stableDocStyles;

export type BoldText = {
    boldText: { fontFamily: string, } | { fontWeight: FontWeight }
}

export type StylesData = typeof initialStylesData;

export class DocStyles {
    @observable stylesData = getInitialStylesData();

    constructor() {
        makeObservable(this);
    }

    @action
    setStylesData = (formStyles: StylesData) => {
        this.stylesData = formStyles;
    }

    @computed
    get docStyles() {
        let boldText: any = { fontWeight: 'bold' };
        let currentFontFamily = this.stylesData.page.fontFamily;
        if (specialFonts.includes(currentFontFamily)) {
            if (currentFontFamily === 'Times-Roman') {
                currentFontFamily = currentFontFamily.replace(/-\w*/g, '');
            }
            boldText = { fontFamily: currentFontFamily + '-Bold' }
        }
        return StyleSheet.create({ ...this.stylesData, ...stableDocStyles, boldText } as StylesData & StableStyles & BoldText)
    }
}

export const docStylesManager = new DocStyles();

class FormStyles {
    @observable stylesData = getInitialStylesData();

    constructor() {
        makeObservable(this);
    }

    @action
    setStylesData = (formStyles: StylesData) => {
        this.stylesData = formStyles;
    }

    @action
    setPagePadding = (value: string) => {
        this.stylesData.page.padding = value + 'in';
    }

    @computed
    get pagePaddingText() {
        const pagePadding = this.stylesData.page.padding
        if (pagePadding && pagePadding.length >= 2) {
            return pagePadding.substring(0, pagePadding.length - 2);
        }
        return pagePadding;
    }

    @action
    setPageFontSize = (value: string) => {
        this.stylesData.page.fontSize = value;
    }

    @action
    setPageFontFamily = (value: string) => {
        this.stylesData.page.fontFamily = value;
    }

    @action
    setSectionMarginBottom = (value: string) => {
        this.stylesData.section.marginBottom = value;
    }


    @action setTitleFontSize = (value: string) => {
        this.stylesData.title.fontSize = value;
    }

    @action setTitleMarginBottom = (value: string) => {
        this.stylesData.title.marginBottom = value;
    }

    @action setSectionItemMarginBottom = (value: string) => {
        this.stylesData.sectionItem.marginBottom = value;
    }
}

export const formStylesManager = new FormStyles();

export const switchToLanguageFont = (langCode: Language) => {
    if (langCode === 'chi' && !chiFonts.includes(docStylesManager.stylesData.page.fontFamily)) {
        formStylesManager.stylesData.page.fontFamily = docStylesManager.stylesData.page.fontFamily = 'Alibaba-PuHuTi';
        docStylesManager.setStylesData(docStylesManager.stylesData);
        formStylesManager.setStylesData(formStylesManager.stylesData);
    }
}

// TODO: autorun for language switcher to Chinese
reaction(() => languageManager.langCode, (langCode) => {
    switchToLanguageFont(langCode);
})