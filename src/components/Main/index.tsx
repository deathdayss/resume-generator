import styles from './index.module.scss';
import PdfViewArea from '../PdfViewArea';
import ControlArea from '../ControlArea'
import resumeData from '@/data/resumeData';

const Main = () => {
    return <div className={styles.main}>
        <div className={styles.left}>
            <PdfViewArea {...resumeData} />
        </div>
        <div className={styles.right}>
            <ControlArea />
        </div>
    </div>
}

export default Main;