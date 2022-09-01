import { DragHandleDnd } from '@/components/ControlArea/Draggable';
import { SectionForm } from '@/data/formData';
import localization, { languageManager } from '@/data/localization';
import { DeleteValueHook, getObjValue, StateKey, UsePropsForInputObj } from '@/hooks';
import { DragDropContext, Draggable, DragStart, Droppable, DropResult } from '@hello-pangea/dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './index.module.scss';

type Item = { id: string } & any

interface InputItemProps {
    value: Item,
    index: number,
    draggingId: string | null,
    getInputContent: (item: Item, index: number) => JSX.Element,
    deleteByIndex: (index: number) => void,
    itemModalLabel: string,
    className: string
}

const InputItem = ({ value, index, draggingId, getInputContent, deleteByIndex, itemModalLabel, className }: InputItemProps) => {
    const modalLocal = localization[languageManager.langCode].form.modal;
    const [openDialog, setOpenDialog] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const opacityStyles = useSpring({ opacity: showButtons || draggingId === value.id ? 1 : 0, config: { duration: 150 } });
    const handleDeletion = () => {
        setOpenDialog(false);
        deleteByIndex(index);
    }
    const animatedStyles = { ...opacityStyles, display: 'inline-flex', alignItems: 'center' }
    return (
        <Draggable draggableId={value.id} index={index}>
            {(provider) => (<div className={className} onMouseEnter={() => setShowButtons(true)} onMouseLeave={() => setShowButtons(false)} ref={provider.innerRef} {...provider.draggableProps}>
                <animated.span style={animatedStyles}><DragHandleDnd isDragging={draggingId === value.id} {...provider.dragHandleProps} /> </animated.span>
                {getInputContent(value, index)}
                <span className={styles.deleteIconLine} onClick={() => setOpenDialog(true)}>
                    <animated.span style={animatedStyles}><DeleteIcon /></animated.span>
                </span>
                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                >
                    <DialogTitle>
                        {itemModalLabel}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} variant='outlined'>{modalLocal.no}</Button>
                        <Button onClick={handleDeletion} variant='contained' color="error">
                            {modalLocal.yes}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >)
            }
        </Draggable >
    )
}

interface VariableInputListProps {
    id: string,
    items: Item[],
    addData: () => void,
    changeIndexFromTo: (oldIndex: number, newIndex: number) => void,
    deleteByIndex: (index: number) => void,
    getInputContent: (item: Item, index: number) => JSX.Element,
    buttonLabel: string,
    listModalLabel: string,
    itemModalLabel: string
    className?: string,
    itemClassName?: string,
}
const VariableInputList = ({
    id,
    items,
    addData,
    changeIndexFromTo,
    deleteByIndex,
    getInputContent,
    buttonLabel,
    listModalLabel,
    itemModalLabel,
    className = styles.variableInputList,
    itemClassName = styles.item }: VariableInputListProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const modalLocal = localization[languageManager.langCode].form.modal;
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const onDragStart = ({ draggableId }: DragStart) => {
        setDraggingId(draggableId);
    };
    const onDragEnd = ({ draggableId, destination }: DropResult) => {
        setDraggingId(null);
        if (destination) {
            for (let i = 0; i < items.length; ++i) {
                if (items[i].id === draggableId) {
                    changeIndexFromTo(i, destination.index);
                    break;
                }
            }
        }
    }
    const addHandle = () => {
        setOpenDialog(false);
        addData();
    }
    return <div className={className}>
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Droppable droppableId={id}>
                {(provider) => (
                    <div ref={provider.innerRef} {...provider.droppableProps}>
                        {items.map((value, index) => <InputItem key={value.id}
                            index={index}
                            value={value}
                            draggingId={draggingId}
                            getInputContent={getInputContent}
                            deleteByIndex={deleteByIndex}
                            itemModalLabel={itemModalLabel}
                            className={itemClassName} />)}
                        {provider.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        <Button onClick={() => setOpenDialog(true)} variant='outlined'>{buttonLabel}</Button>
        <Dialog open={openDialog}
            onClose={() => setOpenDialog(false)}
        >
            <DialogTitle>
                {listModalLabel}
            </DialogTitle>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} variant='outlined'>{modalLocal.no}</Button>
                <Button onClick={addHandle} variant='contained'>
                    {modalLocal.yes}
                </Button>
            </DialogActions>
        </Dialog>
    </div>
}

export default VariableInputList;