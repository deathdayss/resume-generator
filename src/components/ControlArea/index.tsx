import { Language } from '@/data/localization';
import styles from './index.module.scss';
import DraggableFormArea from './FormArea';
import TopButtonArea from './TopButtonArea';
import { ResizableState } from '../PdfViewArea';
import { UsePDFInstance } from '../helper/helper';
import { Form } from 'antd';

interface ControlAreaProps {
    setLangCode: (arg: Language) => void
    setResizableStateRef: (arg: ResizableState) => void
    setIsPdfViewOpen: (isPdfViewOpen: boolean) => void,
    isPdfViewOpen: boolean,
    instanceDoc: UsePDFInstance,
}

const ControlArea = ({
    setLangCode,
    setResizableStateRef,
    setIsPdfViewOpen,
    isPdfViewOpen,
    instanceDoc,
}: ControlAreaProps) => {
    return (
        <div className={styles.controlContainer}>
            <Form>
                <div className={styles.TopButtonArea}>
                    <TopButtonArea
                        setLangCode={setLangCode}
                        setResizableStateRef={setResizableStateRef}
                        setIsPdfViewOpen={setIsPdfViewOpen}
                        isPdfViewOpen={isPdfViewOpen}
                        instanceDoc={instanceDoc}
                    />
                </div>
                <div className={styles.formArea}>
                    <DraggableFormArea />
                </div>
                <div className={styles.styleArea}>Style Area</div>
                <div className={styles.fileArea}>File Area</div>
            </Form>
        </div>
    )
}

export default ControlArea;