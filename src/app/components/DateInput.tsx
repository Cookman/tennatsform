import React from 'react';
import {Field} from "react-final-form";
import styled from "styled-components";
import ErrorLabel from "./ErrorLabel";

type Props = {
    label: string;
    name: string;
    required?: boolean;
    validate?: (value: any) => undefined | string;
    showError?: boolean;
};

const InputWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

const DateInput = styled.input<{ hasWarning?: boolean }>`
  border: ${({hasWarning}) => hasWarning ? '2px solid palevioletred' : '2px solid gray'};
  border-radius: 3px;
  margin: ${props => props.size};
  padding: ${props => props.size};
  width: ${({width = '100%'}) => {
    return width
  }};
`;

const Input: React.FC<Props> = ({label, name, required, validate, showError = false}) => {
    return (
        <InputWrapper>
            <div>{label}</div>
            <Field name={name} placeholder={label} validate={validate}>
                {({input, meta}) => {
                    return <>
                        <DateInput {...input} type="date" required={required} hasWarning={meta.touched && meta.error}/>
                        {showError && meta.touched && meta.error && <ErrorLabel>{meta.error}</ErrorLabel>}
                    </>
                }}
            </Field>
        </InputWrapper>
    );
};

export default Input;
