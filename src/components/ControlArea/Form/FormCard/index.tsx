import localization, { LanguageContext } from '@/data/localization';
import { ValueChangePair } from '@/hooks';
import { Form, Input } from 'antd';
import { useContext } from 'react';
import styles from './index.module.scss';

interface FormCardProps {
    children: React.ReactNode,
    last: boolean,
    valueOnChange?: ValueChangePair
}

const FormCard = ({ children, last, valueOnChange}: FormCardProps) => {
    const langCode = useContext(LanguageContext);
    const titleLabel = localization[langCode].form.label.title;
    return <div className={styles.FormCard} style={{
        borderBottom: last ? '0.0625rem solid rgb(220, 220, 220)' : 'none'
    }}>
        {valueOnChange === undefined ? null : <Form.Item
            label={titleLabel}
            name={titleLabel}
        >
            <Input {...valueOnChange(['textData', 'title'])} />
        </Form.Item>}
        {children}
    </div>
}

export default FormCard;