import { MuiDragHandle } from "@/components/ControlArea/Draggable";
import { CheckTextFieldStyle, PeriodTextField, TextFieldStyle } from "@/components/ModifiedUI";
import { Education, Experience, ItemsData, SectionData, SectionItem } from "@/data/docData";
import { SectionForm, SectionFormItems } from "@/data/formData";
import localization, { languageManager } from "@/data/localization";
import { MobIdArray } from "@/data/mobData";
import { DeleteValueHook, StateKey, UsePropsForInputObj } from "@/hooks";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { SortableContainer, SortableContainerProps, SortableElement, SortableElementProps, SortEnd } from "react-sortable-hoc";
import { animated, useSpring } from "react-spring";
import { SectionFormProps } from "../../type";
import VariableInputList from "../VariableInputList";
import styles from './index.module.scss';

interface AddedItemContainerProps {
    itemIndex: number,
    sectionForm: SectionFormItems<SectionItem, ItemsData<SectionItem>>,
    children: React.ReactNode,
    className?: string,
}

const AddedItemCard = ({ itemIndex, sectionForm, children, className = styles.itemCard }: AddedItemContainerProps) => {
    const { langCode } = languageManager;
    const modalLocal = localization[langCode].form.modal;
    const [openDialog, setOpenDialog] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const opacityStyles = useSpring({ opacity: showButtons ? 1 : 0, config: { duration: 150 } });
    const handleDeletion = () => {
        setOpenDialog(false);
        sectionForm.items.deleteByIndex(itemIndex);
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
    sectionForm: SectionFormItems<SectionItem, ItemsData<SectionItem>>,
    value: SectionItem,
    myIndex: number,
}

const AddedItem = observer(({ value, sectionForm, myIndex }: AddedItemProps) => {
    const { langCode } = languageManager;
    const buttonLocal = localization[langCode].form.button;
    const labelLocal = localization[langCode].form.label;
    const modalLocal = localization[langCode].form.modal;
    const getInputContent = (item: any, index: number) => {
        return <TextFieldStyle multiline inputStyle={{ flex: 1, marginLeft: '2rem', marginRight: '2rem', }} label={`${labelLocal.description} ${index + 1}`}
            getValue={() => item.description} onValueChange={action((value: string) => item.description = value)}
        />;
    }
    const items = (value as Experience | Education).descriptions;
    const getVariableInputList = <VariableInputList id={sectionForm.id}
        itemsArr={items.arr}
        addData={items.produceItem}
        changeIndexFromTo={items.changeIndexFromTo}
        deleteByIndex={items.deleteByIndex}
        getInputContent={getInputContent}
        buttonLabel={buttonLocal.addDescription}
        listModalLabel={modalLocal.addDescription}
        itemModalLabel={modalLocal.deleteDescription} />
    switch (sectionForm.id) {
        case 'Experience':
            const experienceValue = value as Experience;
            return <AddedItemCard itemIndex={myIndex} sectionForm={sectionForm}>
                <div className={styles.line}>
                    <TextFieldStyle label={labelLocal.position} getValue={() => experienceValue.position}
                        onValueChange={action((value: string) => experienceValue.position = value)} />
                    <TextFieldStyle label={labelLocal.companyName} getValue={() => experienceValue.companyName}
                        onValueChange={action((value: string) => experienceValue.companyName = value)} />
                </div>
                <div className={styles.line}>
                    <TextFieldStyle label={labelLocal.duration} getValue={() => experienceValue.duration}
                        onValueChange={action((value: string) => experienceValue.duration = value)} />
                    <PeriodTextField valueChangePairs={[{ getValue: () => experienceValue.period[0], onValueChange: action((value: string) => experienceValue.period[0] = value) },
                    { getValue: () => experienceValue.period[1], onValueChange: action((value: string) => experienceValue.period[1] = value) }]} />
                </div>
                {getVariableInputList}
            </AddedItemCard>;
        case 'Education':
            const educationValue = value as Education;
            return <AddedItemCard itemIndex={myIndex} sectionForm={sectionForm}>
                <div className={styles.line}>
                    <TextFieldStyle label={labelLocal.instituionName} getValue={() => educationValue.instituionName}
                        onValueChange={action((value: string) => educationValue.instituionName = value)} />
                    <TextFieldStyle label={labelLocal.degree} getValue={() => educationValue.degree}
                        onValueChange={action((value: string) => educationValue.degree = value)} />
                </div>
                <div className={styles.line}>
                    <TextFieldStyle label={labelLocal.duration} getValue={() => educationValue.duration}
                        onValueChange={action((value: string) => educationValue.duration = value)} />
                    <PeriodTextField valueChangePairs={[{ getValue: () => educationValue.period[0], onValueChange: action((value: string) => educationValue.period[0] = value) },
                    { getValue: () => educationValue.period[1], onValueChange: action((value: string) => educationValue.period[1] = value) }]} />
                </div>
                <div className={styles.line}>
                    <CheckTextFieldStyle label={labelLocal.GPA} getValue={() => educationValue.GPA} onValueChange={action((value: string) => educationValue.GPA = value)} />
                    <div />
                </div>
                {getVariableInputList}
            </AddedItemCard>;
        default:
            throw new Error('This component should not have AddedItem')
    }
})

const SortableItem: React.ComponentClass<SortableElementProps & AddedItemProps, any> = SortableElement(AddedItem);

interface AddedItemAreaProps extends SectionFormProps {
    sectionForm: SectionFormItems<SectionItem, ItemsData<SectionItem>>,
    className?: string
}

interface SortableListProps {
    children: React.ReactNode
}

const SortableList: React.ComponentClass<SortableContainerProps & SortableListProps, any> = SortableContainer(({ children }: SortableListProps) => {
    return <div>{children}</div>;
});

const AddedItemArea = ({ sectionForm, className }: AddedItemAreaProps) => {
    const { langCode } = languageManager;
    const buttonLocal = localization[langCode].form.button;
    const modalLocal = localization[langCode].form.modal;
    const [openDialog, setOpenDialog] = useState(false);
    const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
        sectionForm.items.changeIndexFromTo(oldIndex, newIndex);
    }
    const addHandle = () => {
        setOpenDialog(false);
        sectionForm.items.produceItem();
    }
    return <div className={className}>
        <Button onClick={() => setOpenDialog(true)} variant='outlined'>{buttonLocal.add}</Button>
        <SortableList onSortEnd={onSortEnd} useDragHandle>
            {sectionForm.items.arr.map((value, index) => <SortableItem key={value.id} value={value} sectionForm={sectionForm} myIndex={index} index={index} />)}
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

export default observer(AddedItemArea);