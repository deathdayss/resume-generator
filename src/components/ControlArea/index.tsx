import { Language } from '@/data/localization';
import styles from './index.module.scss';
import DraggableFormArea from './FormArea';
import TopButtonArea from './TopButtonArea';
import { UsePDFInstance } from '../helper/helper';
import StyleControlArea from './StyleControlArea';

interface ControlAreaProps {
    instanceDoc: UsePDFInstance,
}

const ControlArea = ({
    instanceDoc,
}: ControlAreaProps) => {
    return (
        <div className={styles.controlContainer}>
            <div className={styles.TopButtonArea}>
                <TopButtonArea
                    instanceDoc={instanceDoc}
                />
            </div>
            {/* <div className={styles.formArea}>
                <DraggableFormArea />
            </div> */}
            <div className={styles.styleArea}>
                <StyleControlArea />
            </div>
        </div>
    )
}

export default ControlArea;