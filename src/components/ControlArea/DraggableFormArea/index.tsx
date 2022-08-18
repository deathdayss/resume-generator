import { initialSectionIds, SectionId } from "@/data/resumeData";
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
import { deleteByElement, pushElement, changeIndex } from "../helper/helper";
import { IconButton, IconButtonProps, styled } from "@mui/material";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import styles from './index.module.scss';
import localization, { LanguageContext } from "@/data/localization";

const text = 'panel text'

const DragHandle = SortableHandle(() => <span className={styles.dragingHandler}><DragIndicatorIcon /></span>);

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface SectionFormPanelProps {
    value: SectionId,
    collapseState: SectionId[],
    setCollapseState: (args: SectionId[]) => void,
    sectionForm: SectionForm,
    setSectionForm: (args: SectionForm) => void,
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

const SectionFormPanel = ({ value, collapseState, setCollapseState, sectionForm, setSectionForm }: SectionFormPanelProps) => {
    const langCode = useContext(LanguageContext);
    const titleLocal = localization[langCode].form.title;
    const isCollapse = useMemo(() => collapseState.includes(value), [collapseState, value])
    const title = (sectionForm[value].textData as any).title;
    return <div>
        <div className={styles.panelHeader}>
            <CollapseButton
                expand={isCollapse}
                onClick={() => {
                    if (isCollapse) {
                        setCollapseState(deleteByElement(collapseState, value))
                    }
                    else {
                        setCollapseState(pushElement(collapseState, value))
                    }
                }}
                aria-expanded={isCollapse}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </CollapseButton>
            <span className={styles.panelTitle}>
                {title === undefined ? titleLocal.Detail : (title ? title : titleLocal[value])}
            </span>
            <DragHandle />
        </div>
        <CollapsePanel collapseId={value} timeout="auto" unmountOnExit>
            <li>
                collapse Content
                {value}
            </li>
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

interface DraggableFormAreaProps {
    collapseState: SectionId[],
    setCollapseState: (arg: SectionId[]) => void,
    sectionForm: SectionForm,
    setSectionForm: (arg: SectionForm) => void
}

const DraggableFormArea = ({ collapseState, setCollapseState, sectionForm, setSectionForm }: DraggableFormAreaProps) => {
    const [formPanelIds, setFormPanelIds] = useState(initialSectionIds);

    const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
        setFormPanelIds(changeIndex(formPanelIds, oldIndex, newIndex));
    };
    return <CollapseAll collapseState={collapseState}>
        <SortableList onSortEnd={onSortEnd} useDragHandle >
            {formPanelIds.map((sectionId, index) => (
                <SortableItem key={`item-${sectionId}`}
                    index={index}
                    value={sectionId}
                    collapseState={collapseState}
                    setCollapseState={setCollapseState}
                    sectionForm={sectionForm}
                    setSectionForm={setSectionForm}
                />
            ))}
        </SortableList>
    </CollapseAll>
}

export default DraggableFormArea;