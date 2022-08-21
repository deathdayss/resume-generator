import { DocFormDataContext, SectionId } from "@/data/resumeData";
import { SectionForm } from "../dataType";
import {
    SortableContainer,
    SortableContainerProps,
    SortableElement,
    SortableElementProps,
    SortableHandle,
    SortEnd,
    SortEvent,
} from 'react-sortable-hoc';
import React, { ReactNode, useContext, useMemo, useState } from "react";
import { CollapseAll, CollapsePanel } from "@/components/ControlArea/Collapse";
import { changeFormIndex, changeFormPropValue } from "../../helper/helper";
import { Checkbox, IconButton, IconButtonProps, styled } from "@mui/material";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import styles from './index.module.scss';
import localization, { LanguageContext } from "@/data/localization";
import DetailForm from '../Form/DetailForm';

const text = 'panel text'

const DragHandle = SortableHandle(() => <span className={styles.dragingHandler}><DragIndicatorIcon /></span>);

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface SectionFormPanelProps {
    value: SectionForm
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

const getFormPanel = (sectionForm: SectionForm) => {
    switch (sectionForm.id) {
        case 'Detail':
            return <DetailForm sectionForm={sectionForm} />;
        case 'Experience':
            return null;
        case 'Education':
            return null;
        case 'Skill':
            return null;
        case 'Other':
            return null;
    }
}

const SectionFormPanel = ({ value }: SectionFormPanelProps) => {
    const langCode = useContext(LanguageContext);
    const { sectionForms, setSectionForms } = useContext(DocFormDataContext);
    const collapseHandle = () => {
        if (!value.inUse) {
            return;
        }
        setSectionForms(changeFormPropValue(value, sectionForms, { isCollapse: !value.isCollapse }));
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
                {localization[langCode].form.title[value.id]}
            </span>
            <Checkbox className={styles.inUseCheckbox} checked={value.inUse} onChange={(_e, checked) => {
                setSectionForms(changeFormPropValue(value, sectionForms, { inUse: checked, isCollapse: !checked }));
            }} />
            <DragHandle />
        </div>
        <CollapsePanel collapseId={value.id} timeout="auto" unmountOnExit>
            {getFormPanel(value)}
        </CollapsePanel>
    </div>
}

const SortableItem: React.ComponentClass<SortableElementProps & SectionFormPanelProps, any> = SortableElement(SectionFormPanel);

interface SortableListProps {
    children: ReactNode
}

const SortableList: React.ComponentClass<SortableContainerProps & SortableListProps, any> = SortableContainer(({ children }: SortableListProps) => {
    return <div>{children}</div>;
});

const DraggableFormArea = () => {
    const { sectionForms, setSectionForms } = useContext(DocFormDataContext);
    function onSortEnd({ oldIndex, newIndex }: SortEnd) {
        setSectionForms(changeFormIndex(sectionForms, oldIndex, newIndex));
    }
    const collapseState = useMemo(() => sectionForms.reduce<SectionId[]>((result, sectionForm) => {
        if (!sectionForm.isCollapse) {
            result.push(sectionForm.id);
        }
        return result;
    }, []), [sectionForms]);
    return <CollapseAll collapseState={collapseState}>
        <SortableList onSortEnd={onSortEnd} useDragHandle >
            {sectionForms.map((sectionForm, index) => (
                <SortableItem key={`item-${sectionForm.id}`}
                    index={index}
                    value={sectionForm}
                />
            ))}
        </SortableList>
    </CollapseAll>
}

export default DraggableFormArea;