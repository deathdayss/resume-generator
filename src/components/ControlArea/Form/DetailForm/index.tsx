import { validateEmailAddress, validatePhoneNumber } from "@/components/helper/helper";
import { CheckTextFieldStyle, TextFieldStyle } from "@/components/ModifiedUI";
import { FormDetail } from "@/data/formData";
import localization, { languageManager } from "@/data/localization";
import { observer } from "mobx-react-lite";
import FormCard from "../FormCard";
import styles from './index.module.scss';

interface DetailFormProps {
    sectionForm: FormDetail
}


const DetailForm = ({ sectionForm }: DetailFormProps) => {
    const labelLocal = localization[languageManager.langCode].form.label;
    const errorLocal = localization[languageManager.langCode].form.error;
    return <FormCard sectionForm={sectionForm}>
        <div className={styles.line}>
            <TextFieldStyle label={labelLocal.personName} getValue={() => sectionForm.textData.personName}
                onValueChange={sectionForm.setPersonName}
            />
            <CheckTextFieldStyle label={labelLocal.visa} getValue={() => sectionForm.textData.visa}
                onValueChange={sectionForm.setVisa}
            />
        </div>
        <div className={styles.line}>
            <CheckTextFieldStyle label={labelLocal.email} getValue={() => sectionForm.textData.email}
                onValueChange={sectionForm.setEmail}
                getValidation={[() => validateEmailAddress(sectionForm.textData.email)]}
                errorText={[errorLocal.emailError]}
            />
            <CheckTextFieldStyle label={labelLocal.phone} getValue={() => sectionForm.textData.phone}
                onValueChange={sectionForm.setPhone}
                getValidation={[() => validatePhoneNumber(sectionForm.textData.phone)]}
                errorText={[errorLocal.phoneError]} />
        </div>
    </FormCard >
}

export default observer(DetailForm);