import { PDFViewer, usePDF } from "@react-pdf/renderer";
import ResumeDoc from "../PdfDocument";
import styles from './index.module.scss';
import resumeData from '@/data/resumeData';
import { useEffect, useState } from "react";

const PdfViewArea = () => {
    const [instance, update] = usePDF({ document: <ResumeDoc {...resumeData} /> })
    return <div className={styles.container}>
        <iframe width='100%' height='100%' title="resume-doc" src={instance.url ? instance.url : undefined} />
    </div>
}

export default PdfViewArea;