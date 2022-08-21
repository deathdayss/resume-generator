import { ResizableState } from "@/components/PdfViewArea";
import localization, { Language, LanguageContext } from "@/data/localization";
import { ForwardOutlined, UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button } from "@mui/material";
import { Select, message } from "antd";
import { useContext, useState } from "react";
import { animated, useSpring } from "react-spring";
import { changeAllPropsValue, downloadFile, UsePDFInstance, validateJSON } from "../../helper/helper";
import styles from './index.module.scss';
import { DocFormDataContext } from "@/data/resumeData";

const { Option } = Select;

interface TopButtonAreaProps {
    setLangCode: (arg: Language) => void
    setResizableStateRef: (arg: ResizableState) => void,
    setIsPdfViewOpen: (isPdfViewOpen: boolean) => void,
    isPdfViewOpen: boolean,
    instanceDoc: UsePDFInstance,
}

const TopButtonArea = ({
    setLangCode,
    setResizableStateRef,
    setIsPdfViewOpen,
    isPdfViewOpen,
    instanceDoc,
}: TopButtonAreaProps) => {
    const langCode = useContext(LanguageContext);
    const { sectionForms, setSectionForms, title } = useContext(DocFormDataContext);
    const buttonLocal = localization[langCode].form.button;
    const messageLocal = localization[langCode].form.message;
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
    const downloadPdfHanlde = () => {
        if (instanceDoc.loading) {
            message.loading(messageLocal.documentLoading, 2);
        }
        if (instanceDoc.error) {
            message.error(messageLocal.documentFailLoad, 2);
        }
    }
    const uploadHanlde = (fileEvent: any) => {
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
            <a href={instanceDoc.loading || instanceDoc.error || !instanceDoc.url ? 'javascript:void(0)' : instanceDoc.url} download={`${title}.pdf`}>
                <Button variant="contained" color="secondary">
                    {buttonLocal.downloadPdf}
                </Button>
            </a>

            <label className={styles.inputUpload}>
                <input type="file" onChange={uploadHanlde} />
                {isLoading ? <LoadingOutlined /> : <UploadOutlined />}
                &nbsp;&nbsp;&nbsp;{fileName ? fileName : buttonLocal.uploadJson}
            </label>
        </div>
    </div >
}

export default TopButtonArea;