import { changePropsValue, getPdfTitle } from '@/components/helper/helper';
import { DocFormDataContext, initialSectionInfos } from '@/data/docData';
import { Language, LanguageContext } from '@/data/localization';
import { chiFonts } from '@/fonts';
import { usePDF } from '@react-pdf/renderer';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { initialSectionForms } from '../../data/formData';
import ControlArea from '../ControlArea';
import Footer from '../ControlArea/Footer';
import ResumeDoc from '../PdfDocument';
import { DocStyles, initialDocStyles, initialFormStyles } from '../PdfDocument/docStyles';
import PdfViewArea from '../PdfViewArea';
import useStateRef from '../Resizable/hooks/useStateRef';
import styles from './index.module.scss';

class ArrayTest {
    k = [{ a: { text: 'first' } }, { a: { text: 'second' } }]

    constructor() {
        makeAutoObservable(this);
    }

    changeFisrt() {
        this.k[0].a.text += '0';
    }

    changeSecond() {
        this.k[1].a.text += '0';
    }
}

const array = new ArrayTest();

const Test0 = observer(() => {
    console.log('render Test0')
    return <div>
        <button onClick={() => array.changeFisrt()}>change first</button>
        <div>{array.k[1].a.text}</div>
    </div>
})

const Main = () => {
    const [langCode, setLangCode] = useState<Language>('eng');
    const [sectionInfos, setSectionInfos] = useState(initialSectionInfos);
    const [sectionForms, setSectionForms] = useState(initialSectionForms)
    const [styleArgs, setStylesArgs] = useState(initialDocStyles);
    const [formStyleArgs, setFormStyleArgs] = useState(initialFormStyles);
    const title = useMemo(() => getPdfTitle(sectionInfos, langCode), [langCode, sectionInfos]);
    const DocFormDataContextValue = useMemo(() => ({
        sectionForms, setSectionForms, sectionInfos, setSectionInfos, styleArgs, setStylesArgs, formStyleArgs, setFormStyleArgs, title
    }), [formStyleArgs, sectionForms, sectionInfos, styleArgs, title])
    const [instanceDoc, updateDoc] = usePDF({
        document: <LanguageContext.Provider value={langCode}>
            <DocFormDataContext.Provider value={DocFormDataContextValue}>
                <ResumeDoc />
            </DocFormDataContext.Provider>
        </LanguageContext.Provider>,
    });
    useEffect(() => {
        const storeLangCode = localStorage.getItem('resumeLangCode');
        if (storeLangCode) {
            setLangCode(storeLangCode as Language);
        }
    }, []);
    useEffect(() => {
        if (langCode === 'chi' && !chiFonts.includes(styleArgs.page.fontFamily)) {
            setFormStyleArgs(changePropsValue(formStyleArgs, { page: { fontFamily: 'Alibaba-PuHuTi' } }) as DocStyles);
            setStylesArgs(changePropsValue(formStyleArgs, { page: { fontFamily: 'Alibaba-PuHuTi' } }) as DocStyles);
        }
    }, [langCode]);
    useEffect(() => {
        updateDoc();
    }, [sectionInfos, styleArgs]);
    console.log('render Main')
    return <LanguageContext.Provider value={langCode}>
        <DocFormDataContext.Provider value={DocFormDataContextValue}>
            <Test0 />
            <div className={styles.main}>
                <PdfViewArea src={instanceDoc.url} />
                <div className={styles.rightFlexItem}>
                    <ControlArea setLangCode={setLangCode}
                        instanceDoc={instanceDoc}
                    />
                    <Footer />
                </div>
            </div>
        </DocFormDataContext.Provider>
    </LanguageContext.Provider >
}

export default Main;