import styles from './index.module.scss';
import PdfViewArea from '../PdfViewArea';
import ControlArea from '../ControlArea'

const Main = () => {
    return <div className={styles.main}>
        <div className={styles.left}>
            <PdfViewArea />
        </div>
        <div className={styles.right}>
            <ControlArea />
        </div>
    </div>
}

export default Main;