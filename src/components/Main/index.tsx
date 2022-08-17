import styles from './index.module.scss';
import PdfViewArea from '../PdfViewArea';
import ControlArea from '../ControlArea'

const Main = () => {
    return <div className={styles.main}>
        <PdfViewArea />
        <div className={styles.rightFlexItem}>
            <div className={styles.rightContainer}>
                <ControlArea />
            </div>
        </div>
    </div>
}

export default Main;