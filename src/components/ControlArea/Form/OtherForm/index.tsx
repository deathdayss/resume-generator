import { TextFieldStyle } from "@/components/ModifiedUI";
import { useSectionForm } from "@/hooks";
import FormCard from "../FormCard";
import { SectionFormProps } from "../type";

const OtherForm = ({ sectionForm }: SectionFormProps) => {
    const { labelLocal, valueChangePairHook, index, last } = useSectionForm(sectionForm);
    return (
        <FormCard last={last} index={index} valueOnChange={valueChangePairHook}>
            <div>
                <TextFieldStyle inputWidth="100%" multiline label={labelLocal.otherDescription} {...valueChangePairHook([sectionForm.index, 'textData', 'description'])} />
            </div>
        </FormCard>
    )
}

export default OtherForm;