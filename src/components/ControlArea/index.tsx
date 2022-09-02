import { UsePDFInstance } from '../helper/helper';
import DraggableFormArea from './FormArea';
import styles from './index.module.scss';
import StyleControlArea from './StyleControlArea';
import TopButtonArea from './TopButtonArea';

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
            <div className={styles.formArea}>
                <DraggableFormArea />
            </div>
            <div className={styles.styleArea}>
                <StyleControlArea />
            </div>
        </div>
    )
}

export default ControlArea;