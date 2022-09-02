import { changeIndexFromTo } from "@/components/helper/helper";
import { Education, EducationInfo, Experience, ExperienceInfo, SectionData } from "@/data/docData";
import { FormDetail, FormOther, FormSkill, SectionForm, SectionFormItems, sectionForms } from "@/data/formData";
import localization, { languageManager } from "@/data/localization";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, Collapse, IconButton, IconButtonProps, styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { ReactNode } from "react";
import {
    SortableContainer,
    SortableContainerProps,
    SortableElement,
    SortableElementProps, SortEnd
} from 'react-sortable-hoc';
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

const getFormPanel = (sectionForm: SectionForm<SectionData>) => {
    switch (sectionForm.id) {
        case 'Detail':
            return <DetailForm sectionForm={sectionForm as FormDetail} />;
        case 'Experience':
            return <ItemForm sectionForm={sectionForm as SectionFormItems<Experience, ExperienceInfo>} />;
        case 'Education':
            return <ItemForm sectionForm={sectionForm as SectionFormItems<Education, EducationInfo>} />;
        case 'Skill':
            return <SkillForm sectionForm={sectionForm as FormSkill} />;
        case 'Other':
            return <OtherForm sectionForm={sectionForm as FormOther} />;
        default:
            throw new Error('No such form id');
    }
}

const SectionFormPanel = observer(({ value }: SectionFormPanelProps) => {
    const titleLocal = localization[languageManager.langCode].form.title;
    const collapseHandle = () => {
        if (!value.inUse) {
            return;
        }
        value.toggleCollapse();
    }
    return <div>
        <div className={styles.panelHeader}>
            <CollapseButton
                expand={!value.isCollapse}
                onClick={collapseHandle}
                aria-expanded={!value.isCollapse}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </CollapseButton>
            <span className={styles.panelTitle}>
                {titleLocal[value.id.toLocaleLowerCase() as keyof typeof titleLocal]}
            </span>
            <Checkbox className={styles.inUseCheckbox} checked={value.inUse} onChange={(_e, checked) => {
                value.setInUse(checked);
                value.setIsCollapse(!checked);
            }} />
            <DragHandle className={styles.dragingHandler} />
        </div>
        <Collapse in={!value.isCollapse} timeout="auto" unmountOnExit>
            {getFormPanel(value)}
        </Collapse>
    </div>
})

const SortableItem: React.ComponentClass<SortableElementProps & SectionFormPanelProps, any> = SortableElement(SectionFormPanel);

interface SortableListProps {
    children: ReactNode
}

export const SortableList: React.ComponentClass<SortableContainerProps & SortableListProps, any> = SortableContainer(({ children }: SortableListProps) => {
    return <div>{children}</div>;
});

const DraggableFormArea = () => {
    const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
        sectionForms.arr = changeIndexFromTo(sectionForms.arr, oldIndex, newIndex);
    }
    return <SortableList onSortEnd={onSortEnd} useDragHandle >
        {sectionForms.arr.map((sectionForm, index) => (
            <SortableItem key={`item-${sectionForm.id}`}
                index={index}
                value={sectionForm}
            />
        ))}
    </SortableList>
}

export default observer(DraggableFormArea);