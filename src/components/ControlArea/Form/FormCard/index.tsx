import { getIndexById } from '@/components/helper/helper';
import { SelectStyle, TextFieldStyle } from '@/components/ModifiedUI';
import { DetailTemplate, SectionData } from '@/data/docData';
import { SectionForm, sectionForms, SectionFormTitle } from '@/data/formData';
import localization, { languageManager } from '@/data/localization';
import { ValueChangePairHook } from '@/hooks';
import { MenuItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ReactNode, useContext } from 'react';
import styles from './index.module.scss';

interface FormCardProps {
    children: ReactNode;
    sectionForm: SectionForm<SectionData>;
}

const FormCard = ({ children, sectionForm }: FormCardProps) => {
    const labelLocal = localization[languageManager.langCode].form.label;
    const templateLocal = localization[languageManager.langCode].form.template;
    const myIndex = getIndexById(sectionForms.arr, sectionForm.id);
    return <div className={styles.FormCard} style={{
        borderBottom: myIndex === sectionForms.arr.length - 1 ? '0.0625rem solid rgb(220, 220, 220)' : 'none'
    }} >
        <div className={styles.line}>
            <SelectStyle label={labelLocal.template}
                inputWidth='11.8rem'
                getValue={() => sectionForm.templateId}
                onValueChange={sectionForm.setTemplateId}
            >
                {DetailTemplate.map((key) => <MenuItem key={key} value={key}>
                    {templateLocal[key as keyof typeof templateLocal]}
                </MenuItem>)}

            </SelectStyle>
            {sectionForm instanceof SectionFormTitle ? <TextFieldStyle label={labelLocal.title}
                getValue={() => sectionForm.title}
                onValueChange={sectionForm.setTitle}
            /> : null}
        </div>
        {children}
    </div>
}

export default observer(FormCard);