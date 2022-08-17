import styles from './index.module.scss';
import PdfViewArea from '../PdfViewArea';
import ControlArea from '../ControlArea'
import ResumeDoc from '../PdfDocument';
import resumeData from '@/data/resumeData';
import { usePDF } from '@react-pdf/renderer';
import { useState } from 'react';
import { Language, LanguageContext } from '@/data/localization';

const Main = () => {
    const [langCode, setLangCode] = useState<Language>('eng');
    const [instance, update] = usePDF({
        document: <LanguageContext.Provider value={langCode}>
            <ResumeDoc {...resumeData} />
        </LanguageContext.Provider>
    })
    return <LanguageContext.Provider value={langCode}>
        <div className={styles.main}>
            <PdfViewArea src={instance.url} />
            <div className={styles.rightFlexItem}>
                <div className={styles.rightContainer}>
                    <ControlArea />
                </div>
            </div>
        </div>
    </LanguageContext.Provider>
}

export default Main;