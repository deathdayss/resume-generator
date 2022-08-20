import FormCard from "../FormCard";
import { SectionFormProps } from "../type";
import { useContext, useState } from "react";
import { useDestructFormInput, useSectionForm } from "@/hooks";
import localization, { LanguageContext } from "@/data/localization";
import styles from './index.module.scss';
import { TextField } from "@mui/material";
// import { Input } from "@mui/material";

const DetailForm = ({ sectionForm }: SectionFormProps) => {
    const { index, sectionForms, setSectionForms, last } = useSectionForm(sectionForm);
    const langCode = useContext(LanguageContext);
    const labelLocal = localization[langCode].form.label;
    const valueOnChange = useDestructFormInput(sectionForms, setSectionForms);

    return <FormCard last={last}>
        <div className={styles.formContainer}>
            <div>
                <TextField label={labelLocal.personName} {...valueOnChange([index, 'textData', 'personName'])} variant='filled' />
            </div>
            <div>456</div>
        </div>
        {/* <Form.Item
            label={labelLocal.personName}
            name={labelLocal.personName}
        >
            <Input {...valueOnChange([index, 'textData', 'personName'])} />
        </Form.Item> */}
    </FormCard >
}

export default DetailForm;