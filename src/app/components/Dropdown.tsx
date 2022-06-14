import React from 'react';
import {Field} from "react-final-form";
import styled from "styled-components";
import ErrorLabel from "./ErrorLabel";

type Props = {
    label: string;
    name: string;
    width?: string | number;
    options: string[];
    required?: boolean;
    validate?: (value: any) => undefined | string;
};

const InputWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

const StyledSelect = styled.select`
  border: 2px solid palevioletred;
  margin: 2px;
  padding: 2px;
  border-radius: 3px;
  box-sizing: border-box;
`;

const Dropdown: React.FC<Props> = ({label, name, options, required, validate, ...rest}) => {
    return (
        <InputWrapper>
            <div>{label}</div>
            <Field name={name} placeholder={label} validate={validate}>
                {({input, meta}) => {
                    return <>
                        <StyledSelect {...input} {...rest} required={required}>
                            <option/>
                            {options.map(option => (<option key={option}>{option}</option>))}
                        </StyledSelect>
                        {meta.touched && meta.error && <ErrorLabel>{meta.error}</ErrorLabel>}
                    </>
                }}
            </Field>
        </InputWrapper>
    )
};

export default Dropdown;
