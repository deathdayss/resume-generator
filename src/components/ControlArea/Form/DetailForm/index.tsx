import FormCard from "../FormCard";
import { SectionFormProps } from "../type";
import { useContext, useState } from "react";
import { usePropsForInput, useSectionForm } from "@/hooks";
import localization, { LanguageContext } from "@/data/localization";
import styles from './index.module.scss';
import { inputClasses, inputLabelClasses, styled, TextField } from "@mui/material";
import { CheckTextFieldStyle, TextFieldLabel, TextFieldStyle } from "@/components/ModifiedUI";


const DetailForm = ({ sectionForm }: SectionFormProps) => {
    const { labelLocal, valueChangePairHook, index, last } = useSectionForm(sectionForm);

    return <FormCard last={last} hasTitle={false} index={index} valueOnChange={valueChangePairHook}>
        <div className={styles.line}>
            <TextFieldStyle label={labelLocal.personName} {...valueChangePairHook([index, 'textData', 'personName'])} />
            <CheckTextFieldStyle label={labelLocal.visa} valueOnChange={valueChangePairHook} keys={[index, 'textData', 'visa']} />
        </div>
        <div className={styles.line}>
            <CheckTextFieldStyle label={labelLocal.email} valueOnChange={valueChangePairHook} keys={[index, 'textData', 'email']} />
            <CheckTextFieldStyle label={labelLocal.phone} valueOnChange={valueChangePairHook} keys={[index, 'textData', 'phone']} />
        </div>
    </FormCard >
}

export default DetailForm;