import styles from './index.module.scss';

interface FormCardProps {
    children: React.ReactNode;
}

const FormCard = ({ children }: FormCardProps) => <div className={styles.FormCard}>{children}</div>

export default FormCard;