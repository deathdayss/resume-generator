import { TextFieldStyle } from "@/components/ModifiedUI";
import localization from "@/data/localization";
import { StateKey, useSectionForm } from "@/hooks";
import VariableInputList from "../component/VariableInputList";
import FormCard from "../FormCard";
import { SectionFormProps } from "../type";


const SkillForm = ({ sectionForm }: SectionFormProps) => {
    const { langCode, labelLocal, sectionForms, valueChangePairHook, usePropsForInputObj, index, last } = useSectionForm(sectionForm);
    const buttonLocal = localization[langCode].form.button;
    const modalLocal = localization[langCode].form.modal;
    const getInputContent = (keys: StateKey[], index: number) => {
        return <div style={{ display: 'flex', flex: 1, marginLeft: '2rem', marginRight: '2rem', }}>
            <TextFieldStyle inputStyle={{ flex: 1, marginRight: '2rem', }} label={`${labelLocal.skill} ${index + 1}`} {...valueChangePairHook([...keys, 'skillName'])} />
            <TextFieldStyle inputStyle={{ flex: 1 }} label={`${labelLocal.skillDescription} ${index + 1}`} {...valueChangePairHook([...keys, 'description'])} />
        </div>;
    }
    return (
        <FormCard last={last} index={index} valueOnChange={valueChangePairHook}>
            <VariableInputList keys={[sectionForm.index, 'textData', 'items']}
                usePropsForInputObj={usePropsForInputObj}
                insertDataTemplate={{ skillName: '', description: '' }}
                sectionForms={sectionForms}
                getInputContent={getInputContent}
                buttonLabel={buttonLocal.add}
                listModalLabel={modalLocal.addSkill}
                itemModalLabel={modalLocal.deleteSkill} />
        </FormCard>
    )
}

export default SkillForm;