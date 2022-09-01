import { TextFieldStyle } from "@/components/ModifiedUI";
import { FormSkill } from "@/data/formData";
import localization, { languageManager } from "@/data/localization";
import { StateKey } from "@/hooks";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import VariableInputList from "../component/VariableInputList";
import FormCard from "../FormCard";

interface SkillFormProps {
    sectionForm: FormSkill
}

const SkillForm = ({ sectionForm }: SkillFormProps) => {
    const labelLocal = localization[languageManager.langCode].form.label;
    const buttonLocal = localization[languageManager.langCode].form.button;
    const modalLocal = localization[languageManager.langCode].form.modal;
    const getInputContent = (item: any, index: number) => {
        return <div style={{ display: 'flex', flex: 1, marginLeft: '2rem', marginRight: '2rem', }}>
            <TextFieldStyle inputStyle={{ flex: 1, marginRight: '2rem', }} label={`${labelLocal.skill} ${index + 1}`} getValue={() => item.skillName}
                onValueChange={action((value: string) => item.skillName = value)}
            />
            <TextFieldStyle inputStyle={{ flex: 1 }} label={`${labelLocal.skillDescription} ${index + 1}`} getValue={() => item.description}
                onValueChange={action((value: string) => item.description = value)}
            />
        </div>;
    }
    return (
        <FormCard sectionForm={sectionForm} >
            <VariableInputList id={sectionForm.id}
                addData={sectionForm.items.produceItem}
                items={sectionForm.items.arr}
                changeIndexFromTo={sectionForm.items.changeIndexFromTo}
                deleteByIndex={sectionForm.items.deleteByIndex}
                getInputContent={getInputContent}
                buttonLabel={buttonLocal.add}
                listModalLabel={modalLocal.addSkill}
                itemModalLabel={modalLocal.deleteSkill} />
        </FormCard>
    )
}

export default observer(SkillForm);