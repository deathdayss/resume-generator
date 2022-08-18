import { Language } from '@/data/localization';
import { initialSectionIds, SectionId, SectionInfo } from '@/data/resumeData';
import styles from './index.module.scss';
import { useState } from 'react';
import { initialSectionForms } from './dataType';
import DraggableFormArea from './DraggableFormArea';
import { Form } from 'antd';
const text = 'panel text';

interface ControlAreaProps {
    sectionInfos: SectionInfo[],
    styleArgs: object,
    updateDoc: () => void
    setLangCode: (arg: Language) => void
    setSectionInfos: (arg: SectionInfo[]) => void,
    setStylesArgs: (arg: any) => void
}

const ControlArea = ({ sectionInfos, styleArgs, updateDoc, setLangCode, setSectionInfos, setStylesArgs }: ControlAreaProps) => {
    const [sectionForms, setSectionForms] = useState(initialSectionForms);
    return <Form onFinish={(values) => {
        console.log('finish value', values)
    }}
        onFinishFailed={(errorInfo) => {
            console.log('submit error', errorInfo)
        }}>
        <div className={styles.controlContainer}>
            <div className={styles.formArea}>
                <div>
                    <DraggableFormArea sectionForms={sectionForms} setSectionForms={setSectionForms} />
                </div>
            </div>
            <div className={styles.styleArea}>Style Area</div>
            <div className={styles.fileArea}>File Area</div>
        </div>
    </Form>
}

export default ControlArea;