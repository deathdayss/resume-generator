import styles from './index.module.scss';
import PdfViewArea from '../PdfViewArea';
import ControlArea from '../ControlArea'
import ResumeDoc from '../PdfDocument';
import { initialSectionInfos, mergeFormToDocStyles } from '@/data/resumeData';
import { usePDF } from '@react-pdf/renderer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Language, LanguageContext } from '@/data/localization';
import { DocStyles, initialDocStyles, initialFormStyles } from '../PdfDocument/docStyles';
import { changePropsValue, getPdfTitle } from '@/components/helper/helper';
import { chiFonts } from '@/fonts';
import useStateRef from '../Resizable/hooks/useStateRef';

const Main = () => {
    const [langCode, setLangCode] = useState<Language>('eng');
    const [sectionInfos, setSectionInfos] = useState(initialSectionInfos);
    const [styleArgs, setStylesArgs] = useState(initialDocStyles);
    const [formStyleArgs, setFormStyleArgs] = useState(initialFormStyles);
    const title = useMemo(() => getPdfTitle(sectionInfos, langCode), [langCode, sectionInfos]);
    const [instanceDoc, updateDoc] = usePDF({
        document: <LanguageContext.Provider value={langCode}>
            <ResumeDoc sectionInfos={sectionInfos} styleArgs={styleArgs} title={title} />
        </LanguageContext.Provider>,
    });
    const [isPdfViewOpen, setIsPdfViewOpen] = useState(true);
    const [resizableStateRef, setResizableStateRef] = useStateRef({
        useDragging: true,
        width: (window.innerWidth - 20) / 2
    });
    const applyFormStyleArgs = useCallback(() =>{
        setStylesArgs(mergeFormToDocStyles(formStyleArgs, styleArgs));
    }, [])
    useEffect(() => {
        const storeLangCode = localStorage.getItem('resumeLangCode');
        if (storeLangCode) {
            setLangCode(storeLangCode as Language);
        }
    }, []);
    useEffect(() => {
        if (langCode === 'chi' && !chiFonts.includes(styleArgs.page.fontFamily)) {
            setStylesArgs(changePropsValue(styleArgs, { page: { fontFamily: 'Deng-xian' } }) as DocStyles);
        }
    }, [langCode]);
    useEffect(() => {
        updateDoc();
    }, [sectionInfos, styleArgs, updateDoc])
    return <LanguageContext.Provider value={langCode}>
        <div className={styles.main}>
            {isPdfViewOpen ? <PdfViewArea src={instanceDoc.url} resizableStateRef={resizableStateRef} setResizableStateRef={setResizableStateRef} /> : null}
            <div className={styles.rightFlexItem}>
                <ControlArea sectionInfos={sectionInfos}
                    formStyleArgs={formStyleArgs}
                    setFormStyleArgs={setFormStyleArgs}
                    applyFormStyleArgs={applyFormStyleArgs}
                    updateDoc={updateDoc}
                    setLangCode={setLangCode}
                    setSectionInfos={setSectionInfos}
                    setStylesArgs={setStylesArgs}
                    setResizableStateRef={setResizableStateRef}
                    setIsPdfViewOpen={setIsPdfViewOpen}
                    isPdfViewOpen={isPdfViewOpen}
                    instanceDoc={instanceDoc}
                    title={title}
                />
            </div>
        </div>
    </LanguageContext.Provider >
}

export default Main;