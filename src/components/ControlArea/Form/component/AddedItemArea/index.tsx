import { SectionForm, sectionItemDelegate } from "@/components/ControlArea/dataType";
import { MuiDragHandle } from "@/components/ControlArea/Draggable";
import { PeriodTextField, TextFieldStyle } from "@/components/ModifiedUI";
import localization, { LanguageContext } from "@/data/localization";
import { DeleteValueHook, StateKey, UsePropsForInputObj } from "@/hooks";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useContext, useState } from "react";
import { SortableElementProps, SortEnd, SortableElement, SortableContainerProps, SortableContainer } from "react-sortable-hoc";
import { animated, useSpring } from "react-spring";
import VariableInputList from "../VariableInputList";
import styles from './index.module.scss';

interface AddedItemContainerProps {
    itemIndex: number,
    sectionForm: SectionForm,
    deleteValueHook: DeleteValueHook,
    children: React.ReactNode,
    className?: string,
}

const AddedItemCard = ({ itemIndex, sectionForm, deleteValueHook, children, className = styles.itemCard }: AddedItemContainerProps) => {
    const langCode = useContext(LanguageContext);
    const modalLocal = localization[langCode].form.modal;
    const [openDialog, setOpenDialog] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const opacityStyles = useSpring({ opacity: showButtons ? 1 : 0, config: { duration: 150 } });
    const handleDeletion = () => {
        setOpenDialog(false);
        deleteValueHook([sectionForm.index, 'textData', 'items'], itemIndex);
    }
    return <div className={className} onMouseEnter={() => setShowButtons(true)} onMouseLeave={() => setShowButtons(false)} >
        <animated.span style={opacityStyles}><MuiDragHandle className={styles.dragingHandler} /></animated.span>
        {children}
        <div className={styles.deleteButtonLine}>
            <animated.span style={opacityStyles}><Button onClick={() => setOpenDialog(true)} color="error" variant="outlined">{localization[langCode].form.button.delete}</Button></animated.span>
        </div>
        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {modalLocal[`${sectionForm.id.toLowerCase()}Delete` as keyof typeof modalLocal]}
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

interface AddedItemProps {
    value: number,
    sectionForm: SectionForm,
    sectionForms: SectionForm[],
    usePropsForInputObj: UsePropsForInputObj
}

const AddedItem = ({ value, sectionForm, sectionForms, usePropsForInputObj }: AddedItemProps) => {
    const langCode = useContext(LanguageContext);
    const buttonLocal = localization[langCode].form.button;
    const labelLocal = localization[langCode].form.label;
    const modalLocal = localization[langCode].form.modal;
    const { valueChangePairHook, deleteValueHook } = usePropsForInputObj;
    const getInputContent = (keys: StateKey[], index: number) => {
        return <TextFieldStyle inputStyle={{
            flex: 1,
            marginLeft: '2rem',
             marginRight: '2rem', 
            // width: '40rem'
        }} label={`${labelLocal.description} ${index + 1}`} {...valueChangePairHook(keys)} />;
    }
    const getVariableInputList = <VariableInputList keys={[sectionForm.index, 'textData', 'items', value, 'descriptions']}
        usePropsForInputObj={usePropsForInputObj}
        insertDataTemplate={''}
        sectionForms={sectionForms}
        getInputContent={getInputContent}
        buttonLabel={buttonLocal.addDescription}
        listModalLabel={modalLocal.addDescription}
        itemModalLabel={modalLocal.deleteDescription} />
    switch (sectionForm.id) {
        case 'Experience':
            return <AddedItemCard itemIndex={value} sectionForm={sectionForm} deleteValueHook={deleteValueHook}>
                <div className={styles.line}>
                    <TextFieldStyle label={labelLocal.companyName} {...valueChangePairHook([sectionForm.index, 'textData', 'items', value, 'companyName'])} />
                    <TextFieldStyle label={labelLocal.position} {...valueChangePairHook([sectionForm.index, 'textData', 'items', value, 'position'])} />
                </div>
                <div className={styles.line}>
                    <PeriodTextField keys={[sectionForm.index, 'textData', 'items', value, 'period']} valueChangePairHook={valueChangePairHook} />
                    <TextFieldStyle label={labelLocal.duration} {...valueChangePairHook([sectionForm.index, 'textData', 'items', value, 'duration'])} />
                </div>
                {getVariableInputList}
            </AddedItemCard>;
        case 'Education':
            return <div>
                123
            </div>;
        default:
            throw new Error('This component should not have AddedItem')
    }
}

const SortableItem: React.ComponentClass<SortableElementProps & AddedItemProps, any> = SortableElement(AddedItem);

interface AddedItemAreaProps {
    sectionForm: SectionForm,
    sectionForms: SectionForm[],
    usePropsForInputObj: UsePropsForInputObj,
    className?: string
}

interface SortableListProps {
    children: React.ReactNode
}

const SortableList: React.ComponentClass<SortableContainerProps & SortableListProps, any> = SortableContainer(({ children }: SortableListProps) => {
    return <div>{children}</div>;
});

const AddedItemArea = ({ sectionForm, sectionForms, usePropsForInputObj, className }: AddedItemAreaProps) => {
    const langCode = useContext(LanguageContext);
    const buttonLocal = localization[langCode].form.button;
    const modalLocal = localization[langCode].form.modal;
    const { changeIndexHook, insertValueHook } = usePropsForInputObj
    const [openDialog, setOpenDialog] = useState(false);
    const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
        changeIndexHook([sectionForm.index, 'textData', 'items'], oldIndex, newIndex);
    }
    const addHandle = () => {
        setOpenDialog(false);
        insertValueHook([sectionForm.index, 'textData', 'items'], sectionItemDelegate[sectionForm.id.toLowerCase() as keyof typeof sectionItemDelegate], 0)
    }
    return <div className={className}>
        <Button onClick={() => setOpenDialog(true)} variant='outlined'>{buttonLocal.add}</Button>
        <SortableList onSortEnd={onSortEnd} useDragHandle>
            {'items' in sectionForm.textData ? sectionForm.textData.items.map((_value, index) => <SortableItem key={index} index={index}
                value={index}
                sectionForm={sectionForm}
                sectionForms={sectionForms}
                usePropsForInputObj={usePropsForInputObj} />) : null}
        </SortableList>
        <Dialog open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {modalLocal[`${sectionForm.id.toLowerCase()}Add` as keyof typeof modalLocal]}
            </DialogTitle>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} variant='outlined'>{modalLocal.no}</Button>
                <Button onClick={addHandle} variant='contained'>
                    {modalLocal.yes}
                </Button>
            </DialogActions>
        </Dialog>
    </div >
}

export default AddedItemArea;