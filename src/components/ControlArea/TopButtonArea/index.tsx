import { ResizableState, ResizableStateRef } from "@/components/PdfViewArea";
import localization, { Language, LanguageContext } from "@/data/localization";
import { ForwardOutlined } from "@ant-design/icons";
import { Button } from "@mui/material";
import { Select } from "antd";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { animated, useSpring } from "react-spring";
import { SectionForm } from "../dataType";
import { changeAllPropsValue } from "../../helper/helper";
import styles from './index.module.scss';

const { Option } = Select;

interface TopButtonAreaProps {
    sectionForms: SectionForm[],
    setSectionForms: (arg: SectionForm[]) => void,
    setLangCode: (arg: Language) => void
    setResizableStateRef: (arg: ResizableState) => void,
    setIsPdfViewOpen: (isPdfViewOpen: boolean) => void,
    isPdfViewOpen: boolean
}

const TopButtonArea = ({ sectionForms, setSectionForms, setLangCode, setResizableStateRef, setIsPdfViewOpen, isPdfViewOpen }: TopButtonAreaProps) => {
    const langCode = useContext(LanguageContext);
    const buttonLocal = localization[langCode].form.button;
    const [willCollapse, setWillCollapse] = useState(true);
    const arrowStyles = useSpring({ transform: willCollapse ? 'rotate(90deg)' : 'rotate(-90deg)' });
    const collapseAllHandle = () => {
        setWillCollapse(!willCollapse)
        setSectionForms(changeAllPropsValue(sectionForms, { isCollapse: willCollapse }, (sectionForm) => sectionForm.inUse));
    }
    const PdfViewHandle = () => {
        setIsPdfViewOpen(!isPdfViewOpen);
    }
    const layoutHandle = () => {
        setResizableStateRef({
            useDragging: false,
            width: (window.innerWidth - 20) / 2
        })
    }
    const inUseHandle = () => {
        setWillCollapse(true);
        setSectionForms(changeAllPropsValue(sectionForms, { isCollapse: false, inUse: true }));
    }
    const selectLanguageHandle = (value: Language) => {
        localStorage.setItem('resumeLangCode', value);
        setLangCode(value);
    }
    return <div className={styles.buttonContainer}>
        <Button variant="contained" onClick={collapseAllHandle} className={styles.CollapseButton} >
            <animated.span style={{ marginRight: '0.4rem', ...arrowStyles }}> <ForwardOutlined /></animated.span>
            {willCollapse ? buttonLocal.collapseAll : buttonLocal.expandAll}</Button>
        <Button className={styles.layoutButton} onClick={layoutHandle} >{buttonLocal.defaultLayout}</Button>
        <Button className={styles.pdfViewButton} onClick={PdfViewHandle}>{isPdfViewOpen ? buttonLocal.hideView : buttonLocal.openView}</Button>
        <Button style={{ textTransform: 'none' }} onClick={inUseHandle}>{buttonLocal.useAll}</Button>
        <Select className={styles.selectLang} value={langCode} style={{ width: 120 }} onChange={selectLanguageHandle}>
            {Object.keys(localization).map((value) => <Option value={value}>{localization[value as Language].name}</Option>)}
        </Select>
    </div>
}

export default TopButtonArea;