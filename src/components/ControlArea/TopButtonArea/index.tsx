import { ResizableState, ResizableStateRef } from "@/components/PdfViewArea";
import localization, { Language, LanguageContext } from "@/data/localization";
import { ForwardOutlined, UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button } from "@mui/material";
import { Select, UploadProps, message } from "antd";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { animated, useSpring } from "react-spring";
import { SectionForm } from "../dataType";
import { changeAllPropsValue, downloadFile, UsePDFInstance, validateJSON } from "../../helper/helper";
import styles from './index.module.scss';
import { PDFDownloadLink, Document } from "@react-pdf/renderer";
import { SectionInfo } from "@/data/resumeData";
import { DocStyles, FormStyles } from "@/components/PdfDocument/docStyles";

const { Option } = Select;

interface TopButtonAreaProps {
    sectionForms: SectionForm[],
    setSectionForms: (arg: SectionForm[]) => void,
    setLangCode: (arg: Language) => void
    setResizableStateRef: (arg: ResizableState) => void,
    setIsPdfViewOpen: (isPdfViewOpen: boolean) => void,
    isPdfViewOpen: boolean,
    sectionInfos: SectionInfo[],
    setSectionInfos: (sectionInfos: SectionInfo[]) => void,
    title: string,
    instanceDoc: UsePDFInstance,
    formStyleArgs: FormStyles,
    setFormStyleArgs: (formStyleArgs: FormStyles) => void,
    applyFormStyleArgs: () => void,
}

const TopButtonArea = ({ sectionForms,
    setSectionForms,
    setLangCode,
    setResizableStateRef,
    setIsPdfViewOpen,
    isPdfViewOpen,
    sectionInfos,
    setSectionInfos,
    title,
    instanceDoc,
    formStyleArgs,
    setFormStyleArgs,
    applyFormStyleArgs
}: TopButtonAreaProps) => {
    const langCode = useContext(LanguageContext);
    const buttonLocal = localization[langCode].form.button;
    const messageLocal = localization[langCode].message;
    const [willCollapse, setWillCollapse] = useState(true);
    const arrowStyles = useSpring({ transform: willCollapse ? 'rotate(90deg)' : 'rotate(-90deg)' });
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState('');
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
    const handleChange = (fileEvent: any) => {
        const pathName = fileEvent.target.value;
        if (!pathName) {
            return;
        }
        const fileReader = new FileReader();
        let fileName = '';
        for (let i = pathName.length - 1; i >= 0; --i) {
            if (pathName[i] !== '\\') {
                fileName = pathName[i] + fileName;
            }
            else {
                break;
            }
        }
        if (fileName.substring(fileName.length - 5).toLowerCase() !== '.json') {
            fileEvent.target.value = null;
            message.error(messageLocal.fileExtensionError, 2);
            return;
        }
        setIsLoading(true);
        setFileName(fileName);
        fileReader.readAsText(fileEvent.target.files[0], "UTF-8");
        fileReader.onload = e => {
            setIsLoading(false);
            if (e.target) {
                let jsonContent = e.target.result;
                try {
                    jsonContent = JSON.parse(jsonContent as string);
                } catch (error) {
                    fileEvent.target.value = null;
                    message.error(messageLocal.parseError, 2);
                    return;
                }
                if (validateJSON(jsonContent)) {
                    console.log("e.target.result", e.target.result);
                }
                else {
                    message.error(messageLocal.formatError, 2);
                }
            }
            message.success(messageLocal.fileUploadSuccess, 2);
        };
    };
    return <div className={styles.buttonContainer}>
        <div className={styles.firstLine}>
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
        <div className={styles.secondLine}>
            <Button variant="contained" >{buttonLocal.save}</Button>
            <Button variant="contained" color="success"
                onClick={() => {
                    downloadFile({ a: 1 }, title)
                }}
            >{buttonLocal.downloadJson}</Button>
            {instanceDoc.loading || instanceDoc.error ? null : <a href={instanceDoc.url ? instanceDoc.url : undefined} download={`${title}.pdf`}>
                <Button variant="contained" color="secondary">
                    {buttonLocal.downloadPdf}
                </Button>
            </a>}
            <label className={styles.inputUpload}>
                <input type="file" onChange={handleChange} />
                {isLoading ? <LoadingOutlined /> : <UploadOutlined />}
                &nbsp;&nbsp;&nbsp;{fileName ? fileName : buttonLocal.uploadJson}
            </label>
        </div>
    </div >
}

export default TopButtonArea;