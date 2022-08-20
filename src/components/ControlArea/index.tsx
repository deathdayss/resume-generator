import localization, { Language, LanguageContext } from '@/data/localization';
import { initialSectionIds, SectionId, SectionInfo } from '@/data/resumeData';
import styles from './index.module.scss';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { initialSectionForms } from './dataType';
import DraggableFormArea from './DraggableFormArea';
import { Button, Form } from 'antd';
import TopButtonArea from './TopButtonArea';
import { ResizableState } from '../PdfViewArea';
import { DocStyles, FormStyles } from '../PdfDocument/docStyles';
import { UsePDFInstance } from '../helper/helper';
const text = 'panel text';

interface ControlAreaProps {
    sectionInfos: SectionInfo[],
    updateDoc: () => void
    setLangCode: (arg: Language) => void
    setSectionInfos: (arg: SectionInfo[]) => void,
    setStylesArgs: (arg: any) => void
    setResizableStateRef: (arg: ResizableState) => void
    setIsPdfViewOpen: (isPdfViewOpen: boolean) => void,
    isPdfViewOpen: boolean,
    title: string,
    instanceDoc: UsePDFInstance,
    formStyleArgs: FormStyles,
    setFormStyleArgs: (formStyleArgs: FormStyles) => void,
    applyFormStyleArgs: () => void,
}

const ControlArea = ({
    sectionInfos,
    updateDoc,
    setLangCode,
    setSectionInfos,
    setStylesArgs,
    setResizableStateRef,
    setIsPdfViewOpen,
    isPdfViewOpen,
    title,
    instanceDoc,
    formStyleArgs,
    setFormStyleArgs,
    applyFormStyleArgs
}: ControlAreaProps) => {
    const [sectionForms, setSectionForms] = useState(initialSectionForms);
    return (
        <div className={styles.controlContainer}>
            <div className={styles.TopButtonArea}>
                <TopButtonArea sectionForms={sectionForms}
                    setSectionForms={setSectionForms}
                    setLangCode={setLangCode}
                    setResizableStateRef={setResizableStateRef}
                    setIsPdfViewOpen={setIsPdfViewOpen}
                    isPdfViewOpen={isPdfViewOpen}
                    sectionInfos={sectionInfos}
                    setSectionInfos={setSectionInfos}
                    title={title}
                    instanceDoc={instanceDoc}
                    formStyleArgs={formStyleArgs}
                    setFormStyleArgs={setFormStyleArgs}
                    applyFormStyleArgs={applyFormStyleArgs}
                />
            </div>
            <div className={styles.formArea}>
                <DraggableFormArea sectionForms={sectionForms} setSectionForms={setSectionForms} />
            </div>
            <div className={styles.styleArea}>Style Area</div>
            <div className={styles.fileArea}>File Area</div>
        </div>
    )
}

export default ControlArea;