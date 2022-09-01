import { validateNumericValue } from '@/components/helper/helper';
import { SelectStyle, TextFieldStyle } from '@/components/ModifiedUI';
import { formStylesManager, initialStylesData } from '@/data/docStyles';
import localization, { languageManager } from '@/data/localization';
import globalFontFamily from '@/fonts';
import { Button, MenuItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import styles from './index.module.scss';


const StyleControlArea = () => {
    const buttonLocal = localization[languageManager.langCode].form.button;
    const labelLocal = localization[languageManager.langCode].form.label;
    const errorLocal = localization[languageManager.langCode].form.error;
    const errorText = [errorLocal.numericError];
    return <>
        <div className={styles.styleTitle}>{localization[languageManager.langCode].form.title.style}</div>
        <div className={styles.styleBody}>
            <div className={styles.line}>
                <TextFieldStyle label={labelLocal.bodyFontSize}
                    getValue={() => formStylesManager.stylesData.page.fontSize}
                    onValueChange={formStylesManager.setPageFontSize}
                    getValidation={[() => validateNumericValue(formStylesManager.stylesData.page.fontSize)]}
                    errorText={errorText} />
                <TextFieldStyle label={labelLocal.titleFontSize}
                    getValue={() => formStylesManager.stylesData.title.fontSize}
                    onValueChange={formStylesManager.setTitleFontSize}
                    getValidation={[() => validateNumericValue(formStylesManager.stylesData.title.fontSize)]}
                    errorText={errorText}
                />
                <SelectStyle label={labelLocal.fontFamily}
                    inputWidth='11.8rem'
                    getValue={() => formStylesManager.stylesData.page.fontFamily}
                    onValueChange={formStylesManager.setPageFontFamily}
                >
                    {Object.keys(globalFontFamily).map((key) => <MenuItem key={key} value={key} > {globalFontFamily[key as keyof typeof globalFontFamily]}</MenuItem>)}
                </SelectStyle>
            </div>
            <div className={styles.line}>
                <TextFieldStyle label={labelLocal.pagePadding}
                    getValue={() => formStylesManager.pagePaddingText}
                    onValueChange={formStylesManager.setPagePadding}
                    getValidation={[() => validateNumericValue(formStylesManager.pagePaddingText)]}
                    errorText={errorText}
                />
                <TextFieldStyle label={labelLocal.sectionGap}
                    getValue={() => formStylesManager.stylesData.section.marginBottom}
                    onValueChange={formStylesManager.setSectionMarginBottom}
                    getValidation={[() => validateNumericValue(formStylesManager.stylesData.section.marginBottom)]}
                    errorText={errorText}
                />
                <TextFieldStyle label={labelLocal.sectionAddGap}
                    getValue={() => formStylesManager.stylesData.sectionItem.marginBottom}
                    onValueChange={formStylesManager.setSectionItemMarginBottom}
                    getValidation={[() => validateNumericValue(formStylesManager.stylesData.sectionItem.marginBottom)]}
                    errorText={errorText}
                />
            </div>
            <div className={styles.line}>
                <TextFieldStyle label={labelLocal.titleGap}
                    getValue={() => formStylesManager.stylesData.title.marginBottom}
                    onValueChange={formStylesManager.setTitleMarginBottom}
                    getValidation={[() => validateNumericValue(formStylesManager.stylesData.title.marginBottom)]}
                    errorText={errorText}
                />
                <div />
                <div className={styles.buttonContainer} >
                    <Button variant='outlined'
                        onClick={() => formStylesManager.setStylesData(initialStylesData)}>{buttonLocal.defaultStyle}</Button>
                </div>
            </div>
        </div>
    </>
}

export default observer(StyleControlArea);