import React from 'react';
import {Field} from "react-final-form";
import styled from "styled-components";
import ErrorLabel from "./ErrorLabel";

type Props = {
    label: string;
    name: string;
    width?: string | number;
    required?: boolean;
    validate?: (value: any) => undefined | string;
};

const InputWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

const StyledInput = styled.input<{ hasWarning?: boolean }>`
  border: ${({hasWarning}) => hasWarning ? '2px solid palevioletred' : '2px solid gray'};
  margin: 2px;
  padding: 2px;
  border-radius: 3px;
  box-sizing: border-box;
  width: ${({width = '100%'}) => {
    return width
  }};
`;

const Input: React.FC<Props> = ({label, name, required, validate, ...rest}) => {
    return (
        <InputWrapper>
            <div>{label}</div>
            <Field name={name} placeholder={label} validate={validate}>
                {({input, meta}) => {
                    return <>
                        <StyledInput {...input} {...rest} required={required} hasWarning={meta.touched && meta.error}/>
                        {meta.touched && meta.error && <ErrorLabel>{meta.error}</ErrorLabel>}
                    </>
                }}
            </Field>
        </InputWrapper>
    );
};

export default Input;
