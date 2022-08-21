import FormCard from "../FormCard";
import { SectionFormProps } from "../type";
import { useContext, useState } from "react";
import { useDestructFormInput, useSectionForm } from "@/hooks";
import localization, { LanguageContext } from "@/data/localization";
import styles from './index.module.scss';
import { inputClasses, inputLabelClasses, styled, TextField } from "@mui/material";
import { CheckTextFieldStyle, TextFieldLabel, TextFieldStyle } from "@/components/ModifiedUI";



const DetailForm = ({ sectionForm }: SectionFormProps) => {
    const { index, sectionForms, setSectionForms, last } = useSectionForm(sectionForm);
    const langCode = useContext(LanguageContext);
    const labelLocal = localization[langCode].form.label;
    const valueOnChange = useDestructFormInput(sectionForms, setSectionForms);

    return <FormCard last={last} hasTitle={false} index={index} valueOnChange={valueOnChange}>
        <div className={styles.line}>
            <TextFieldStyle label={labelLocal.personName} {...valueOnChange([index, 'textData', 'personName'])} />
            <CheckTextFieldStyle label={labelLocal.visa} valueOnChange={valueOnChange} keys={[index, 'textData', 'visa']} />
        </div>
        <div className={styles.line}>
            <CheckTextFieldStyle label={labelLocal.phone} valueOnChange={valueOnChange} keys={[index, 'textData', 'phone']} />
            <CheckTextFieldStyle label={labelLocal.email} valueOnChange={valueOnChange} keys={[index, 'textData', 'email']} />
        </div>
    </FormCard >
}

export default DetailForm;