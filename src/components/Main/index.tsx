import { languageManager } from '@/data/localization';
import { usePDF } from '@react-pdf/renderer';
import { useEffect } from 'react';
import { switchToLanguageFont } from '../../data/docStyles';
import ControlArea from '../ControlArea';
import Footer from '../ControlArea/Footer';
import PdfDocument from '../PdfDocument';
import PdfViewArea from '../PdfViewArea';
import styles from './index.module.scss';

const Main = () => {
    const [instanceDoc] = usePDF({
        document: <PdfDocument />
    });
    useEffect(() => {
        switchToLanguageFont(languageManager.langCode)
    }, [])
    return (
        <div className={styles.main}>
            <PdfViewArea src={instanceDoc.url} />
            <div className={styles.rightFlexItem}>
                <ControlArea instanceDoc={instanceDoc} />
                <Footer />
            </div>
        </div>
    )
}

export default Main;