import { SelectStyle, TextFieldStyle } from '@/components/ModifiedUI';
import localization, { LanguageContext } from '@/data/localization';
import { DetailTemplate } from '@/data/resumeData';
import { ValueChangePairHook } from '@/hooks';
import { MenuItem } from '@mui/material';
import { Form, Input } from 'antd';
import { useContext } from 'react';
import styles from './index.module.scss';

interface FormCardProps {
    children: React.ReactNode,
    index: number,
    valueOnChange: ValueChangePairHook
    last: boolean,
    hasTitle?: boolean,
}

const FormCard = ({ children, index, valueOnChange, last, hasTitle = true }: FormCardProps) => {
    const langCode = useContext(LanguageContext);
    const labelLocal = localization[langCode].form.label;
    const templateLocal = localization[langCode].form.template;
    return <div className={styles.FormCard} style={{
        borderBottom: last ? '0.0625rem solid rgb(220, 220, 220)' : 'none'
    }} >
        <div className={styles.line}>
            <div>
                <SelectStyle label={labelLocal.template} selectWidth='11.8rem' {...valueOnChange([index, 'templateId'])}>
                    {DetailTemplate.map((key) => <MenuItem key={key} value={key}>
                        {templateLocal[key as keyof typeof templateLocal]}
                    </MenuItem>)}

                </SelectStyle>
            </div>
            {hasTitle ? <TextFieldStyle label={labelLocal.title} {...valueOnChange([index, 'textData', 'title'])} /> : null}
        </div>
        {children}
    </div>
}

export default FormCard;