import { CheckTextFieldStyle, TextFieldStyle } from '@/components/ModifiedUI';
import { ItemsData, SectionItem } from '@/data/docData';
import { SectionFormItems } from '@/data/formData';
import AddedItemArea from '../component/AddedItemArea';
import FormCard from '../FormCard';
import { SectionFormProps } from '../type';

interface ItemFormProps {
    sectionForm: SectionFormItems<SectionItem, ItemsData<SectionItem>>
}

const ItemForm = ({ sectionForm }: ItemFormProps) => {
    return <FormCard sectionForm={sectionForm}>
        <AddedItemArea sectionForm={sectionForm} />
    </FormCard >
}

export default ItemForm;