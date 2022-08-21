import { SectionForm } from '@/components/ControlArea/dataType';
import { DragHandle } from '@/components/ControlArea/Draggable';
import localization, { LanguageContext } from '@/data/localization';
import { DeleteValueHook, getObjValue, StateKey, UsePropsForInputObj } from '@/hooks';
import { Button, DialogTitle, Dialog, DialogActions } from '@mui/material';
import { useContext, useState } from 'react';
import { SortableContainerProps, SortableContainer, SortEnd, SortableElementProps, SortableElement } from 'react-sortable-hoc';
import { animated, useSpring } from 'react-spring';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './index.module.scss';

interface InputItemProps {
    value: number,
    keys: StateKey[],
    getInputContent: (value: number) => JSX.Element,
    deleteValueHook: DeleteValueHook,
    itemModalLabel: string,
    className: string
}

const InputItem = ({ value, keys, getInputContent, deleteValueHook, itemModalLabel, className }: InputItemProps) => {
    const langCode = useContext(LanguageContext);
    const modalLocal = localization[langCode].form.modal;
    const [openDialog, setOpenDialog] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const opacityStyles = useSpring({ opacity: showButtons ? 1 : 0, config: { duration: 150 } });
    const handleDeletion = () => {
        setOpenDialog(false);
        deleteValueHook(keys, value);
    }
    const animatedStyles = { ...opacityStyles, display: 'inline-flex', alignItems: 'center' }
    return <div className={className} onMouseEnter={() => setShowButtons(true)} onMouseLeave={() => setShowButtons(false)}>
        <animated.span style={animatedStyles}><DragHandle /></animated.span>
        {getInputContent(value)}
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
    </div >
}

const SortableItem: React.ComponentClass<SortableElementProps & InputItemProps, any> = SortableElement(InputItem);

interface SortableListProps {
    children: React.ReactNode
}

const SortableList: React.ComponentClass<SortableContainerProps & SortableListProps, any> = SortableContainer(({ children }: SortableListProps) => {
    return <div>{children}</div>;
});

interface AddedItemListProps {
    keys: StateKey[],
    usePropsForInputObj: UsePropsForInputObj,
    insertDataTemplate: any,
    sectionForms: SectionForm[],
    getInputContent: (item: any) => JSX.Element,
    buttonLabel: string,
    listModalLabel: string,
    itemModalLabel: string
    className?: string,
    itemClassName?: string,
}
const VariableInputList = ({ keys,
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
    const modalLocal = localization[useContext(LanguageContext)].form.modal;
    const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
        changeIndexHook(keys, oldIndex, newIndex);
    }
    const addHandle = () => {
        setOpenDialog(false);
        insertValueHook(keys, insertDataTemplate);
    }
    return <div className={className}>
        <SortableList onSortEnd={onSortEnd} useDragHandle>
            {(getObjValue(sectionForms, keys) as any[]).map((_value, index) => <SortableItem key={index} index={index}
                value={index}
                keys={keys}
                getInputContent={getInputContent}
                deleteValueHook={deleteValueHook}
                itemModalLabel={itemModalLabel}
                className={itemClassName} />)}
        </SortableList>
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