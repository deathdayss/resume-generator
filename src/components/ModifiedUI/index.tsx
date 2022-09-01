import localization, { languageManager } from "@/data/localization";
import { StateKey, ValueChangePair, ValueChangePairHook } from "@/hooks";
import styled from "@emotion/styled";
import { Checkbox, checkboxClasses, FormControlLabel, inputClasses, inputLabelClasses, Select, SelectProps, TextField, TextFieldProps } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export const TextFieldLabel = styled(TextField)(`
  .${inputLabelClasses.root} {
    font-size: 1rem;
    font-weight: bold
  }
`);

type TextFieldStyleProps = {
    inputClassName?: string,
    inputWidth?: string,
    inputStyle?: object,
    getValue?: () => string,
    onValueChange?: (e: string) => void,
    getValidation?: (() => boolean)[],
    errorText?: string[],
} & TextFieldProps

export const TextFieldStyle = observer(({ inputWidth, inputClassName, inputStyle, variant, fullWidth, getValue, onValueChange, getValidation, errorText, ...leftProps }: TextFieldStyleProps) => {
    let errorIndex = -1;
    if (getValidation) {
        for (let i = 0; i < getValidation.length; ++i) {
            const validationResult = getValidation[i]();
            if (!validationResult) {
                errorIndex = i;
                break;
            }
        }
    }
    return <div className={inputClassName} style={{
        width: inputWidth,
        display: 'inline-block',
        ...inputStyle
    }}>
        <TextFieldLabel {...leftProps}
            value={getValue ? getValue() : undefined}
            error={errorIndex >= 0}
            helperText={errorIndex >= 0 && errorText ? errorText[errorIndex] : undefined}
            onChange={onValueChange ? (e) => {
                onValueChange(e.target.value)
            } : undefined}
            fullWidth={fullWidth === undefined ? true : fullWidth} variant={variant ? variant : 'filled'} />
    </div>
})

type SelectStyleProps = {
    selectClassName?: string,
    selectWidth?: string,
    selectStyle?: object,
} & TextFieldStyleProps

export const SelectStyle = observer((props: SelectStyleProps) => {
    const { selectWidth, selectClassName, selectStyle, variant, fullWidth, ...leftProps } = props;
    return <div className={selectClassName} style={{
        width: selectWidth,
        display: 'inline-block',
        ...selectStyle
    }}>
        <TextFieldStyle {...leftProps} inputWidth={'100%'} select fullWidth={fullWidth === undefined ? true : fullWidth} variant={variant ? variant : 'filled'} />
    </div>
})

type PeriodTextFieldProps = {
    keys: StateKey[],
    valueChangePairHook: ValueChangePairHook
} & TextFieldStyleProps

export const PeriodTextField = ({ keys, valueChangePairHook, inputStyle = { flex: '1' }, ...leftProps }: PeriodTextFieldProps) => {
    // const langCode = useContext(LanguageContext);
    const labelLocal = localization[languageManager.langCode].form.label;
    return <div style={{ display: 'inline-flex' }}>
        <TextFieldStyle label={labelLocal.startTime} {...valueChangePairHook([...keys, 0])} inputStyle={inputStyle} {...leftProps} />
        <div style={{ width: '10%', minWidth: '2rem' }} />
        <TextFieldStyle label={labelLocal.endTime} {...valueChangePairHook([...keys, 1])} inputStyle={inputStyle} {...leftProps} />
    </div>
}

type CheckTextFieldStyleProps = TextFieldStyleProps & {
    valueOnChange: ValueChangePairHook,
    keys: StateKey[],
    className?: string,
    width?: string,
    style?: object
}

export const CheckTextFieldStyle = (props: CheckTextFieldStyleProps) => {
    const { valueOnChange, keys, className, width, style, ...leftProps } = props;
    const inputValueOnChange = valueOnChange(keys);
    const { value, onChange } = valueOnChange(keys, (value: string) => {
        if (value === null) {
            return false;
        }
        return true;
    },
        (e) => {
            if (e.target.checked) {
                return '';
            }
            return null;
        });
    return <div className={className} style={{
        width: width,
        display: 'inline-flex',
        alignItems: 'center',
        ...style
    }}>
        <FormControlLabel style={{ marginRight: '0.5rem' }} control={<Checkbox checked={value} onChange={onChange} />} label={value ? null : <span style={{ userSelect: 'none' }}>{leftProps.label}</span>} />
        {value ? <TextFieldStyle inputStyle={{
            width: '100%'
        }} {...leftProps} {...inputValueOnChange} /> : null}
    </div>
}