import { StateKey, ValueChangePair, ValueChangePairHook } from "@/hooks";
import styled from "@emotion/styled";
import { Checkbox, checkboxClasses, FormControlLabel, inputClasses, inputLabelClasses, Select, SelectProps, TextField, TextFieldProps } from "@mui/material";

export const TextFieldLabel = styled(TextField)(`
  .${inputLabelClasses.root} {
    font-size: 1rem;
    font-weight: bold
  }
`);

type TextFieldStyleProps = TextFieldProps & {
    inputClassName?: string,
    inputWidth?: string
    inputStyle?: object,
}

export const TextFieldStyle = ({ inputWidth, inputClassName, inputStyle, variant, ...leftProps }: TextFieldStyleProps) => {
    return <div className={inputClassName} style={{
        width: inputWidth,
        display: 'inline-block',
        ...inputStyle
    }}>
        <TextFieldLabel {...leftProps} fullWidth={true} variant={variant ? variant : 'filled'} />
    </div>
}

type SelectStyleProps = TextFieldProps & {
    selectClassName?: string,
    selectWidth?: string,
    selectStyle?: object,
}

export const SelectStyle = (props: SelectStyleProps) => {
    const { selectWidth, selectClassName, selectStyle, variant, ...leftProps } = props;
    return <div className={selectClassName} style={{
        width: selectWidth,
        display: 'inline-block',
        ...selectStyle
    }}>
        <TextFieldLabel {...leftProps} select fullWidth={true} variant={variant ? variant : 'filled'} />
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
        if (value === undefined) {
            return false;
        }
        return true;
    },
        (e) => {
            if (e.target.checked) {
                return '';
            }
            return undefined;
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