import styles from './index.module.scss';

interface PdfViewAreaProps {
    src: string | null
}

const PdfViewArea = ({ src }: PdfViewAreaProps) => {
    return <div className={styles.container}>
        <iframe width='100%' height='100%' title="resume-doc" src={src ? src : undefined} />
    </div>
}

export default PdfViewArea;