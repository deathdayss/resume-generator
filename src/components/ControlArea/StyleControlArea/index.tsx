import { SelectStyle, TextFieldStyle } from '@/components/ModifiedUI';
import { initialFormStyles } from '@/components/PdfDocument/docStyles';
import localization, { LanguageContext } from '@/data/localization';
import { DocFormDataContext } from '@/data/resumeData';
import fontFamily from '@/fonts';
import { usePropsForInput } from '@/hooks';
import { Button, MenuItem } from '@mui/material';
import { useContext } from 'react';
import styles from './index.module.scss';

const StyleControlArea = () => {
    const { formStyleArgs, setFormStyleArgs } = useContext(DocFormDataContext);
    const langCode = useContext(LanguageContext);
    const buttonLocal = localization[langCode].form.button;
    const labelLocal = localization[langCode].form.label;
    const { valueChangePairHook } = usePropsForInput(formStyleArgs, setFormStyleArgs);
    return <>
        <div className={styles.styleTitle}>{localization[langCode].form.title.style}</div>
        <div className={styles.styleBody}>
            <div className={styles.line}>
                <TextFieldStyle label={labelLocal.bodyFontSize} {...valueChangePairHook(['page', 'fontSize'])} />
                <TextFieldStyle label={labelLocal.titleFontSize} {...valueChangePairHook(['title', 'fontSize'])} />
                <SelectStyle label={labelLocal.fontFamily} selectWidth='11.8rem' {...valueChangePairHook(['page', 'fontFamily'])}>
                    {Object.keys(fontFamily).map((key) => <MenuItem key={key} value={key} > {fontFamily[key as keyof typeof fontFamily]}</MenuItem>)}
                </SelectStyle>
            </div>
            <div className={styles.line}>
                <TextFieldStyle label={labelLocal.pagePadding} {...valueChangePairHook(['page', 'padding'], (value) => value.substring(0, value.length - 2), (myEvent) => myEvent + 'in')} />
                <TextFieldStyle label={labelLocal.sectionGap} {...valueChangePairHook(['section', 'marginBottom'])} />
                <TextFieldStyle label={labelLocal.sectionAddGap} {...valueChangePairHook(['sectionItem', 'marginBottom'])} />
            </div>
            <div className={styles.line}>
                <TextFieldStyle label={labelLocal.titleGap} {...valueChangePairHook(['title', 'marginBottom'])} />
                <div />
                <div>
                    <Button variant='outlined' onClick={() => setFormStyleArgs(initialFormStyles)} style={{ float: 'right' }}>{buttonLocal.defaultStyle}</Button>
                </div>
            </div>
        </div>
    </>
}

export default StyleControlArea;