import { PDFViewer } from "@react-pdf/renderer";
import ResumeDoc from "../PdfDocument";
import styles from './index.module.scss';
import resumeData from '@/data/resumeData';

const PdfViewArea = () => {
    return <div className={styles.container}>
        <PDFViewer width='100%' height='100%'>
            <ResumeDoc {...resumeData} />
        </PDFViewer>
    </div>
}

export default PdfViewArea;