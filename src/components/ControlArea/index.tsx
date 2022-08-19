import localization, { Language, LanguageContext } from '@/data/localization';
import { initialSectionIds, SectionId, SectionInfo } from '@/data/resumeData';
import styles from './index.module.scss';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { initialSectionForms } from './dataType';
import DraggableFormArea from './DraggableFormArea';
import { Button, Form } from 'antd';
import TopButtonArea from './TopButtonArea';
import { ResizableState, ResizableStateRef } from '../PdfViewArea';
const text = 'panel text';

interface ControlAreaProps {
    sectionInfos: SectionInfo[],
    styleArgs: object,
    updateDoc: () => void
    setLangCode: (arg: Language) => void
    setSectionInfos: (arg: SectionInfo[]) => void,
    setStylesArgs: (arg: any) => void
    setResizableStateRef: (arg: ResizableState) => void
    setIsPdfViewOpen: (isPdfViewOpen: boolean) => void,
    isPdfViewOpen: boolean
}

const ControlArea = ({ sectionInfos, styleArgs, updateDoc, setLangCode, setSectionInfos, setStylesArgs, setResizableStateRef, setIsPdfViewOpen, isPdfViewOpen }: ControlAreaProps) => {
    const [sectionForms, setSectionForms] = useState(initialSectionForms);
    return <Form onFinish={(values) => {
        console.log('finish value', values)
    }}
        onFinishFailed={(errorInfo) => {
            console.log('submit error', errorInfo)
        }}>
        <div className={styles.controlContainer}>
            <div className={styles.TopButtonArea}>
                <TopButtonArea sectionForms={sectionForms} 
                setSectionForms={setSectionForms} 
                setLangCode={setLangCode} 
                setResizableStateRef={setResizableStateRef} 
                setIsPdfViewOpen={setIsPdfViewOpen}
                isPdfViewOpen={isPdfViewOpen} />
            </div>
            <div className={styles.formArea}>
                <DraggableFormArea sectionForms={sectionForms} setSectionForms={setSectionForms} />
            </div>
            <div className={styles.styleArea}>Style Area</div>
            <div className={styles.fileArea}>File Area</div>
        </div>
    </Form>
}

export default ControlArea;