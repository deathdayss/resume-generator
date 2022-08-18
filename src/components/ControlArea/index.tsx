import { Language } from '@/data/localization';
import { initialSectionIds, SectionId, SectionInfo } from '@/data/resumeData';
import styles from './index.module.scss';
import { Collapse } from 'antd';
import { useState } from 'react';
import { initialSectionForm } from './dataType';
import DraggableFormArea from './DraggableFormArea';
const { Panel } = Collapse;
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
    const [sectionIds, setSectionIds] = useState<SectionId[]>(initialSectionIds);
    const [sectionForm, setSectionForm] = useState(initialSectionForm);
    return <div className={styles.controlContainer}>
        <div className={styles.formArea}>
            <div>
                <DraggableFormArea sectionIds={sectionIds}
                    setSectionIds={setSectionIds}
                    sectionForm={sectionForm}
                    setSectionForm={setSectionForm} />
            </div>
        </div>
        <div className={styles.styleArea}>Style Area</div>
        <div className={styles.fileArea}>File Area</div>
    </div>
}

export default ControlArea;