import styles from './index.module.scss';
import PdfViewArea from '../PdfViewArea';
import ControlArea from '../ControlArea'
import ResumeDoc from '../PdfDocument';
import { initialSectionInfos } from '@/data/resumeData';
import { usePDF } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { Language, LanguageContext } from '@/data/localization';
import docStyles from '../PdfDocument/docStyles';

const Main = () => {
    const [langCode, setLangCode] = useState<Language>('eng');
    const [sectionInfos, setSectionInfos] = useState(initialSectionInfos);
    const [styleArgs, setStylesArgs] = useState(docStyles);
    const [instance, update] = usePDF({
        document: <LanguageContext.Provider value={langCode}>
            <ResumeDoc sectionInfos={sectionInfos} styleArgs={styleArgs} />
        </LanguageContext.Provider>
    });
    useEffect(() => {
        const storeLangCode = localStorage.getItem('resumeLangCode');
        if (storeLangCode) {
            setLangCode(storeLangCode as Language);
        }
        return () => {
            localStorage.setItem('resumeLangCode', langCode);
        }
    }, []);
    return <LanguageContext.Provider value={langCode}>
        <div className={styles.main}>
            <PdfViewArea src={instance.url} />
            <div className={styles.rightFlexItem}>
                <ControlArea sectionInfos={sectionInfos} styleArgs={styleArgs} updateDoc={update} setLangCode={setLangCode} setSectionInfos={setSectionInfos} setStylesArgs={setStylesArgs} />
            </div>
        </div>
    </LanguageContext.Provider>
}

export default Main;