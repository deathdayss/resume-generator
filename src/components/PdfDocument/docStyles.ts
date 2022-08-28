import { specialFonts } from "@/fonts";
import { action, computed, isAction, makeAutoObservable, makeObservable, observable } from "mobx";

type FontWeight = 'normal' | 'bold'
export const initialStylesData = {
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
export type StableStyles = typeof stableDocStyles;

export type BoldText = {
    boldText: { fontFamily: string, } | { fontWeight: FontWeight }
}

export type StylesData = typeof initialStylesData;

export class DocStyles {
    @observable stylesData = initialStylesData;

    constructor() {
        makeObservable(this);
    }

    @action
    setStylesData(formStyles: StylesData) {
        this.stylesData = formStyles;
    }

    @action
    setPadding(arg: string) {
        this.stylesData.page.padding = arg;
    }

    @computed
    get docStyles() {
        console.log('recompute docStyles', this.stylesData)
        let boldText: any = { fontWeight: 'bold' };
        let currentFontFamily = this.stylesData.page.fontFamily;
        if (specialFonts.includes(currentFontFamily)) {
            if (currentFontFamily === 'Times-Roman') {
                currentFontFamily = currentFontFamily.replace(/-\w*/g, '');
            }
            boldText = { fontFamily: currentFontFamily + '-Bold' }
        }
        return { ...this.stylesData, ...stableDocStyles, boldText } as StylesData & StableStyles & BoldText
    }
}

export const docStylesManager = new DocStyles();