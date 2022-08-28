import { DragHandleDnd } from '@/components/ControlArea/Draggable';
import { SectionForm } from '@/data/formData';
import localization, { languageManager } from '@/data/localization';
import { DeleteValueHook, getObjValue, StateKey, UsePropsForInputObj } from '@/hooks';
import { DragDropContext, Draggable, DragStart, Droppable, DropResult } from '@hello-pangea/dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useContext, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './index.module.scss';

interface InputItemProps {
    value: number,
    draggingId: number | null,
    keys: StateKey[],
    getInputContent: (keys: StateKey[], value: number) => JSX.Element,
    deleteValueHook: DeleteValueHook,
    itemModalLabel: string,
    className: string
}

const InputItem = ({ value, draggingId, keys, getInputContent, deleteValueHook, itemModalLabel, className }: InputItemProps) => {
    // const langCode = useContext(LanguageContext);
    const modalLocal = localization[languageManager.langCode].form.modal;
    const [openDialog, setOpenDialog] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const opacityStyles = useSpring({ opacity: showButtons || draggingId === value ? 1 : 0, config: { duration: 150 } });
    const handleDeletion = () => {
        setOpenDialog(false);
        deleteValueHook(keys, value);
    }
    const animatedStyles = { ...opacityStyles, display: 'inline-flex', alignItems: 'center' }
    return (
        <Draggable draggableId={String(value)} index={value}>
            {(provider) => (<div className={className} onMouseEnter={() => setShowButtons(true)} onMouseLeave={() => setShowButtons(false)} ref={provider.innerRef} {...provider.draggableProps}>
                <animated.span style={animatedStyles}><DragHandleDnd isDragging={draggingId === value} {...provider.dragHandleProps} /> </animated.span>
                {getInputContent([...keys, value], value)}
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

interface AddedItemListProps {
    formId: string,
    keys: StateKey[],
    usePropsForInputObj: UsePropsForInputObj,
    insertDataTemplate: any,
    sectionForms: SectionForm[],
    getInputContent: (keys: StateKey[], value: number) => JSX.Element,
    buttonLabel: string,
    listModalLabel: string,
    itemModalLabel: string
    className?: string,
    itemClassName?: string,
}
const VariableInputList = ({
    formId,
    keys,
    usePropsForInputObj,
    insertDataTemplate,
    sectionForms,
    getInputContent,
    buttonLabel,
    listModalLabel,
    itemModalLabel,
    className = styles.variableInputList,
    itemClassName = styles.item }: AddedItemListProps) => {
    const { changeIndexHook, insertValueHook, deleteValueHook } = usePropsForInputObj
    const [openDialog, setOpenDialog] = useState(false);
    const modalLocal = localization[languageManager.langCode].form.modal;
    const [draggingId, setDraggingId] = useState<number | null>(null);
    const onDragStart = ({ draggableId }: DragStart) => {
        setDraggingId(Number(draggableId))
    };
    const onDragEnd = ({ draggableId, destination }: DropResult) => {
        setDraggingId(null);
        if (destination) {
            changeIndexHook(keys, Number(draggableId), destination.index);
        }
    }
    const addHandle = () => {
        setOpenDialog(false);
        insertValueHook(keys, insertDataTemplate);
    }
    return <div className={className}>
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Droppable droppableId={formId}>
                {(provider) => (
                    <div ref={provider.innerRef} {...provider.droppableProps}>
                        {(getObjValue(sectionForms, keys) as any[]).map((_value, index) => <InputItem key={index}
                            value={index}
                            draggingId={draggingId}
                            keys={keys}
                            getInputContent={getInputContent}
                            deleteValueHook={deleteValueHook}
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