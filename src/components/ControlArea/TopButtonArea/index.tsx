// import { initialFormStyles } from "@/components/PdfDocument/docStyles";
import localization, { Language, languageManager } from "@/data/localization";
// import { docDataToFormData, DocFormDataContext, formDataToDocData } from "@/data/docData";
import { ForwardOutlined, LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Button } from "@mui/material";
import { message, Select } from "antd";
import { useContext, useState } from "react";
import { animated, useSpring } from "react-spring";
// import { changeAllPropsValue, downloadFile, textDataSpecialKeys, UsePDFInstance, validateFormStyle, validateJSON, validateSectionFormData } from "../../helper/helper";
import styles from './index.module.scss';
import { PdfViewOpen, resizableState } from "@/data/mobData";
import { observer } from "mobx-react-lite";

message.config({ maxCount: 1 })

const { Option } = Select;

interface TopButtonAreaProps {
    setLangCode: (arg: Language) => void
    // instanceDoc: UsePDFInstance,
}

type PdfButtonProps = {
    showState: () => boolean;
    hideView: string,
    openView: string
} & any

const PdfButton = observer(({ showState, hideView, openView, ...leftProps }: PdfButtonProps) => <Button {...leftProps}>{showState() ? hideView : openView}</Button>)

const TopButtonArea = ({
    setLangCode,
    // instanceDoc,
}: TopButtonAreaProps) => {
    // console.log('render TopButtonArea');
    // const langCode = useContext(LanguageContext);
    // const { title, sectionForms, setSectionForms, styleArgs, setStylesArgs, sectionInfos, setSectionInfos, formStyleArgs, setFormStyleArgs } = useContext(DocFormDataContext);
    // const buttonLocal = localization[langCode].form.button;
    // const messageLocal = localization[langCode].form.message;
    // const [willCollapse, setWillCollapse] = useState(true);
    // const arrowStyles = useSpring({ transform: willCollapse ? 'rotate(90deg)' : 'rotate(-90deg)' });
    // const [isLoading, setIsLoading] = useState(false);
    // const [fileName, setFileName] = useState('');
    // const collapseAllHandle = () => {
    //     setWillCollapse(!willCollapse)
    //     setSectionForms(changeAllPropsValue(sectionForms, { isCollapse: willCollapse }, (sectionForm) => sectionForm.inUse));
    // }
    // const PdfViewHandle = () => {
    //     PdfViewOpen.toggleState();
    // }
    // const layoutHandle = () => {
    //     resizableState.setUseDragging = false;
    //     resizableState.setWidth = (window.innerWidth - 20) / 2;
    // }
    // const inUseHandle = () => {
    //     setWillCollapse(true);
    //     setSectionForms(changeAllPropsValue(sectionForms, { isCollapse: false, inUse: true }));
    // }
    // const selectLanguageHandle = (value: Language) => {
    //     localStorage.setItem('resumeLangCode', value);
    //     setLangCode(value);
    // }
    // const saveHandle = () => {
    //     if (
    //         !validateSectionFormData(sectionForms, textDataSpecialKeys) ||
    //         !validateFormStyle(formStyleArgs, initialFormStyles)
    //     ) {
    //         message.error(messageLocal.saveError, 2);
    //         return;
    //     }
    //     message.success(messageLocal.saveSuccess, 2);
    //     setSectionInfos(formDataToDocData(sectionForms));
    //     setStylesArgs(formStyleArgs);
    // }
    // const downloadPdfHanlde = () => {
    //     if (instanceDoc.loading) {
    //         message.loading(messageLocal.documentLoading, 2);
    //     }
    //     if (instanceDoc.error) {
    //         message.error(messageLocal.documentFailLoad, 2);
    //     }
    // }
    // const uploadHanlde = (fileEvent: any) => {
    //     const pathName = fileEvent.target.value;
    //     if (!pathName) {
    //         return;
    //     }
    //     const fileReader = new FileReader();
    //     let fileName = '';
    //     for (let i = pathName.length - 1; i >= 0; --i) {
    //         if (pathName[i] !== '\\') {
    //             fileName = pathName[i] + fileName;
    //         }
    //         else {
    //             break;
    //         }
    //     }
    //     if (fileName.substring(fileName.length - 5).toLowerCase() !== '.json') {
    //         fileEvent.target.value = null;
    //         message.error(messageLocal.fileExtensionError, 2);
    //         return;
    //     }
    //     setIsLoading(true);
    //     fileReader.readAsText(fileEvent.target.files[0], "UTF-8");
    //     fileReader.onload = e => {
    //         setIsLoading(false);
    //         if (e.target) {
    //             let jsonContent = e.target.result;
    //             try {
    //                 jsonContent = JSON.parse(jsonContent as string);
    //             } catch (error) {
    //                 fileEvent.target.value = null;
    //                 message.error(messageLocal.parseError, 2);
    //             }
    //             if (validateJSON(jsonContent)) {
    //                 const jsonSectionInfos = (jsonContent as any).sectionInfos;
    //                 const jsonStyleArgs = (jsonContent as any).styleArgs;
    //                 setFileName(fileName);
    //                 setSectionInfos(jsonSectionInfos);
    //                 setStylesArgs(jsonStyleArgs);
    //                 setFormStyleArgs(jsonStyleArgs);
    //                 setSectionForms(docDataToFormData(jsonSectionInfos));
    //                 message.success(messageLocal.fileUploadSuccess, 2);
    //             }
    //             else {
    //                 fileEvent.target.value = null;
    //                 message.error(messageLocal.formatError, 2);
    //             }
    //         }
    //     };
    // };
    // return <div className={styles.buttonContainer}>
    //     <div className={styles.firstLine}>
    //         <Button variant="contained" onClick={collapseAllHandle} className={styles.CollapseButton} >
    //             <animated.span style={{ marginRight: '0.4rem', ...arrowStyles }}> <ForwardOutlined /></animated.span>
    //             {willCollapse ? buttonLocal.collapseAll : buttonLocal.expandAll}</Button>
    //         <Button className={styles.layoutButton} onClick={layoutHandle} >{buttonLocal.defaultLayout}</Button>
    //         <PdfButton showState={() => PdfViewOpen.state} hideView={buttonLocal.hideView} openView={buttonLocal.openView} className={styles.pdfViewButton} onClick={PdfViewHandle} />
    //         <Button style={{ textTransform: 'none' }} onClick={inUseHandle}>{buttonLocal.useAll}</Button>
    //         <Select className={styles.selectLang} value={langCode} style={{ width: 120 }} onChange={selectLanguageHandle}>
    //             {Object.keys(localization).map((value) => <Option key={value} value={value}>{localization[value as Language].name}</Option>)}
    //         </Select>
    //     </div>
    //     <div className={styles.secondLine}>
    //         <Button variant="contained" onClick={saveHandle} >{buttonLocal.save}</Button>
    //         <Button variant="contained" color="success"
    //             onClick={() => downloadFile({ sectionInfos, styleArgs }, title)
    //             }
    //         >{buttonLocal.downloadJson}</Button>
    //         <a href={instanceDoc.loading || instanceDoc.error || !instanceDoc.url ? undefined : instanceDoc.url} download={`${title}.pdf`}>
    //             <Button onClick={() => downloadPdfHanlde()} variant="contained" color="secondary">
    //                 {buttonLocal.downloadPdf}
    //             </Button>
    //         </a>

    //         <label className={styles.inputUpload}>
    //             <input type="file" onChange={uploadHanlde} onClick={(e) => (e.target as any).value = ''} />
    //             {isLoading ? <LoadingOutlined /> : <UploadOutlined />}
    //             &nbsp;&nbsp;&nbsp;{fileName ? fileName : buttonLocal.uploadJson}
    //         </label>
    //     </div>
    // </div >
    return null;
}

export default TopButtonArea;