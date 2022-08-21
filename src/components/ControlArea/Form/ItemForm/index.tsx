import { CheckTextFieldStyle, TextFieldStyle } from '@/components/ModifiedUI';
import { useSectionForm } from '@/hooks';
import AddedItemArea from '../component/AddedItemArea';
import FormCard from '../FormCard';
import { SectionFormProps } from '../type';

const ExperienceForm = ({ sectionForm }: SectionFormProps) => {
    const { sectionForms, usePropsForInputObj, valueChangePairHook, index, last } = useSectionForm(sectionForm);
    return <FormCard last={last} index={index} valueOnChange={valueChangePairHook}>
        <AddedItemArea sectionForm={sectionForm} sectionForms={sectionForms} usePropsForInputObj={usePropsForInputObj} />
    </FormCard >
}

export default ExperienceForm;