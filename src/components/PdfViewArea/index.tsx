import { PDFViewer } from "@react-pdf/renderer";
import ResumeDoc from "../PdfDocument";
import styles from './index.module.scss';

const PdfViewArea = (
    { details, experience, education, skils }: any
) => {
    // console.log(details, experience, education, skils);
    return <div className={styles.container}>
        <PDFViewer width='100%' height='100%'>
            <ResumeDoc />
        </PDFViewer>
    </div>
}

export default PdfViewArea;