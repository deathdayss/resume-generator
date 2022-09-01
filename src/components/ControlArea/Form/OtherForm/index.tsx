import { TextFieldStyle } from "@/components/ModifiedUI";
import { FormOther } from "@/data/formData";
import localization, { languageManager } from "@/data/localization";
import { observer } from "mobx-react-lite";
import FormCard from "../FormCard";

interface OtherFormProps {
    sectionForm: FormOther
}

const OtherForm = ({ sectionForm }: OtherFormProps) => {
    const labelLocal = localization[languageManager.langCode].form.label;
    return (
        <FormCard sectionForm={sectionForm} >
            <TextFieldStyle inputWidth="100%" multiline
                label={labelLocal.otherDescription}
                getValue={() => sectionForm.textData.description}
                onValueChange={sectionForm.setDescription}
            />
        </FormCard>
    )
}

export default observer(OtherForm);