import styles from './index.module.scss';
import PdfViewArea from '../PdfViewArea';
import ControlArea from '../ControlArea'
import ResumeDoc from '../PdfDocument';
import { DocFormDataContext, initialSectionInfos } from '@/data/resumeData';
import { usePDF } from '@react-pdf/renderer';
import { useEffect, useMemo, useState } from 'react';
import { Language, LanguageContext } from '@/data/localization';
import { DocStyles, initialDocStyles, initialFormStyles } from '../PdfDocument/docStyles';
import { changePropsValue, getPdfTitle } from '@/components/helper/helper';
import { chiFonts } from '@/fonts';
import useStateRef from '../Resizable/hooks/useStateRef';
import { initialSectionForms } from '../ControlArea/dataType';
import Footer from '../ControlArea/Footer';

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
    const [isPdfViewOpen, setIsPdfViewOpen] = useState(true);
    const [resizableStateRef, setResizableStateRef] = useStateRef({
        useDragging: true,
        width: (window.innerWidth - 20) / 2
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
    }, [sectionInfos, styleArgs])
    return <LanguageContext.Provider value={langCode}>
        <DocFormDataContext.Provider value={DocFormDataContextValue}>
            <div className={styles.main}>
                {isPdfViewOpen ? <PdfViewArea src={instanceDoc.url} resizableStateRef={resizableStateRef} setResizableStateRef={setResizableStateRef} /> : null}
                <div className={styles.rightFlexItem}>
                    <ControlArea setLangCode={setLangCode}
                        setResizableStateRef={setResizableStateRef}
                        setIsPdfViewOpen={setIsPdfViewOpen}
                        isPdfViewOpen={isPdfViewOpen}
                        instanceDoc={instanceDoc}
                    />
                    <Footer />
                </div>
            </div>
        </DocFormDataContext.Provider>
    </LanguageContext.Provider >
}

export default Main;