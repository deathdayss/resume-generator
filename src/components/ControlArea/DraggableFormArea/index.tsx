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
import React, { ReactNode, useState } from "react";
import Collapse from '@mui/material/Collapse';

interface DraggableFormAreaProps {
    sectionIds: SectionId[],
    setSectionIds: (arg: SectionId[]) => void,
    sectionForm: SectionForm,
    setSectionForm: (arg: SectionForm) => void
}

const text = 'panel text'


const DragHandle = SortableHandle(() => <span>::</span>);

const MySortable = ({ value }: { value: string }) => {
    const [open, setOpen] = useState(true);
    return <div>
        <button onClick={() => {
            setOpen(!open);
        }}>click to collapse</button>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <li>
                collapse Content
                <DragHandle />
                {value}
            </li>
        </Collapse>
    </div>
}

const SortableItem: React.ComponentClass<SortableElementProps & { value: string }, any> = SortableElement(MySortable);

const SortableList: React.ComponentClass<SortableContainerProps & { children: ReactNode }, any> = SortableContainer(({ children }: { children: ReactNode }) => {
    return <ul>{children}</ul>;
});

const DraggableFormArea = ({ sectionIds, setSectionIds, sectionForm, setSectionForm }: DraggableFormAreaProps) => {

    const [state, setState] = useState<string[]>(initialSectionIds);

    const onSortEnd = ({ oldIndex, newIndex }: SortEnd, e: SortEvent) => {
        const newState = [...state];
        const temp = newState[oldIndex];
        newState[oldIndex] = newState[newIndex];
        newState[newIndex] = temp;
        setState(newState);
    };
    // return <Collapse defaultActiveKey={initialSectionIds}>
    //     <Panel header="This is panel header 1" key="1">
    //         <p>{text}</p>
    //     </Panel>
    //     <Panel header="This is panel header 2" key="2">
    //         <p>{text}</p>
    //     </Panel>
    //     <Panel header="This is panel header 3" key="3">
    //         <p>{text}</p>
    //     </Panel>
    // </Collapse>;
    return <SortableList onSortEnd={onSortEnd} useDragHandle>
        {state.map((value, index) => (
            <SortableItem key={`item-${value}`} index={index} value={value} />
            // <Collapse.Panel header="This is panel header 1" key={value}></Collapse.Panel>
        ))}
    </SortableList>
}

export default DraggableFormArea;