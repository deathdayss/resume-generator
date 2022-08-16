import React from 'react';
import ResumeDoc from '../PdfDocument';
import { PDFViewer } from '@react-pdf/renderer';
import styles from './index.module.scss';

const Main = () => {
    return <div className={styles.main}>
        <PDFViewer>
            <ResumeDoc />
        </PDFViewer>
    </div>
}

export default Main;