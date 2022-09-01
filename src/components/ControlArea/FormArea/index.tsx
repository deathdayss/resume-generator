import { CollapseAll, CollapsePanel } from "@/components/ControlArea/Collapse";
import { SectionData } from "@/data/docData";
import { SectionForm } from "@/data/formData";
// import { DocFormDataContext, SectionId } from "@/data/docData";
import localization, { languageManager } from "@/data/localization";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, IconButton, IconButtonProps, styled } from "@mui/material";
import React, { ReactNode, useContext, useMemo } from "react";
import {
    SortableContainer,
    SortableContainerProps,
    SortableElement,
    SortableElementProps, SortEnd
} from 'react-sortable-hoc';
// import { SectionForm } from "../../../data/formData";
// import { changeArrayIndex, changeFormPropValue } from "../../helper/helper";
import { DragHandle } from "../Draggable";
import DetailForm from '../Form/DetailForm';
import ItemForm from "../Form/ItemForm";
import OtherForm from '../Form/OtherForm';
import SkillForm from "../Form/SkillForm";
import styles from './index.module.scss';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface SectionFormPanelProps {
    value: SectionForm<SectionData>
}

const CollapseButton = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: expand ? 'rotate(0deg)' : 'rotate(-90deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

// const getFormPanel = (sectionForm: SectionForm) => {
//     switch (sectionForm.id) {
//         case 'Detail':
//             return <DetailForm sectionForm={sectionForm} />;
//         case 'Experience':
//             return <ItemForm sectionForm={sectionForm} />;
//         case 'Education':
//             return <ItemForm sectionForm={sectionForm} />;
//         case 'Skill':
//             return <SkillForm sectionForm={sectionForm} />;
//         case 'Other':
//             return <OtherForm sectionForm={sectionForm} />;
//         default:
//             throw new Error('No such form id');
//     }
// }

const SectionFormPanel = ({ value }: SectionFormPanelProps) => {
    // const langCode = useContext(LanguageContext);
    // const { sectionForms, setSectionForms } = useContext(DocFormDataContext);
    // const titleLocal = localization[langCode].form.title;
    // const collapseHandle = () => {
    //     if (!value.inUse) {
    //         return;
    //     }
    //     setSectionForms(changeFormPropValue(value, sectionForms, { isCollapse: !value.isCollapse }));
    // }
    // return <div>
    //     <div className={styles.panelHeader}>
    //         <CollapseButton
    //             expand={!value.isCollapse}
    //             onClick={collapseHandle}
    //             aria-expanded={!value.isCollapse}
    //             aria-label="show more"
    //         >
    //             <ExpandMoreIcon />
    //         </CollapseButton>
    //         <span className={styles.panelTitle}>
    //             {titleLocal[value.id.toLocaleLowerCase() as keyof typeof titleLocal]}
    //         </span>
    //         <Checkbox className={styles.inUseCheckbox} checked={value.inUse} onChange={(_e, checked) => {
    //             setSectionForms(changeFormPropValue(value, sectionForms, { inUse: checked, isCollapse: !checked }));
    //         }} />
    //         <DragHandle className={styles.dragingHandler} />
    //     </div>
    //     <CollapsePanel collapseId={value.id} timeout="auto" unmountOnExit>
    //         {getFormPanel(value)}
    //     </CollapsePanel>
    // </div>
    return <div>SectionFormPanel</div>
}

const SortableItem: React.ComponentClass<SortableElementProps & SectionFormPanelProps, any> = SortableElement(SectionFormPanel);

interface SortableListProps {
    children: ReactNode
}

export const SortableList: React.ComponentClass<SortableContainerProps & SortableListProps, any> = SortableContainer(({ children }: SortableListProps) => {
    return <div>{children}</div>;
});

const DraggableFormArea = () => {
    // const { sectionForms, setSectionForms } = useContext(DocFormDataContext);
    // const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    //     setSectionForms(changeArrayIndex(sectionForms, oldIndex, newIndex, true));
    // }
    // const collapseState = useMemo(() => sectionForms.reduce<SectionId[]>((result, sectionForm) => {
    //     if (!sectionForm.isCollapse) {
    //         result.push(sectionForm.id);
    //     }
    //     return result;
    // }, []), [sectionForms]);
    // return <CollapseAll collapseState={collapseState}>
    //     <SortableList onSortEnd={onSortEnd} useDragHandle >
    //         {sectionForms.map((sectionForm, index) => (
    //             <SortableItem key={`item-${sectionForm.id}`}
    //                 index={index}
    //                 value={sectionForm}
    //             />
    //         ))}
    //     </SortableList>
    // </CollapseAll>
    return null;
}

export default DraggableFormArea;