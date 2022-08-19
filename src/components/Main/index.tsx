import styles from './index.module.scss';
import PdfViewArea from '../PdfViewArea';
import ControlArea from '../ControlArea'
import ResumeDoc from '../PdfDocument';
import { initialSectionInfos } from '@/data/resumeData';
import { usePDF } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { Language, LanguageContext } from '@/data/localization';
import docStyles, { DocStyles } from '../PdfDocument/docStyles';
import { changePropsValue } from '@/components/helper/helper';
import { chiFonts } from '@/fonts';
import useStateRef from '../Resizable/hooks/useStateRef';

const Main = () => {
    const [langCode, setLangCode] = useState<Language>('eng');
    const [sectionInfos, setSectionInfos] = useState(initialSectionInfos);
    const [styleArgs, setStylesArgs] = useState<DocStyles>(docStyles);
    const [instanceDoc, updateDoc] = usePDF({
        document: <LanguageContext.Provider value={langCode}>
            <ResumeDoc sectionInfos={sectionInfos} styleArgs={styleArgs} />
        </LanguageContext.Provider>
    });
    const [isPdfViewOpen, setIsPdfViewOpen] = useState(true);
    const [resizableStateRef, setResizableStateRef] = useStateRef({
        useDragging: true,
        width: (window.innerWidth - 20) / 2
    })
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
        updateDoc();
    }, [langCode]);
    useEffect(() => {
        updateDoc();
    }, [sectionInfos, styleArgs])
    return <LanguageContext.Provider value={langCode}>
        <div className={styles.main}>
            {isPdfViewOpen ? <PdfViewArea src={instanceDoc.url} resizableStateRef={resizableStateRef} setResizableStateRef={setResizableStateRef} /> : null}
            <div className={styles.rightFlexItem}>
                <ControlArea sectionInfos={sectionInfos}
                    styleArgs={styleArgs}
                    updateDoc={updateDoc}
                    setLangCode={setLangCode}
                    setSectionInfos={setSectionInfos}
                    setStylesArgs={setStylesArgs}
                    setResizableStateRef={setResizableStateRef}
                    setIsPdfViewOpen={setIsPdfViewOpen}
                    isPdfViewOpen={isPdfViewOpen} />
            </div>
        </div>
    </LanguageContext.Provider >
}

export default Main;