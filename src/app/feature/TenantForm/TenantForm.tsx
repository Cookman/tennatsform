import React, {useCallback} from 'react';
import {Form, FormSpy} from 'react-final-form'
import {useAppDispatch} from "../../../state/hooks";
import {
    createTenantAsync,
    isLoadingSelector,
    tenantErrorSelector,
    tenantSelector
} from "../../../state/tennant/tenant.slice";
import {shallowEqual, useSelector} from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Panel from "../../components/Panel";
import styled from "styled-components";
import DateInput from "../../components/DateInput";
import Dropdown from "../../components/Dropdown";
import ErrorLabel from "../../components/ErrorLabel";

type Props = {};

const FormContent = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`
const options = ['Parent', 'Sibling', 'Employer', 'Other']

const requiredValidator = (value: string) => value ? undefined : 'Required'

const dateValidator = (firstDate: string, secondDate: string) => {
    return !firstDate || !secondDate || new Date(firstDate).getTime() < new Date(secondDate).getTime()
}

const TenantForm: React.FC<Props> = ({}) => {
    const dispatch = useAppDispatch()

    const isLoading = useSelector(isLoadingSelector, shallowEqual)
    const tenant = useSelector(tenantSelector, shallowEqual)
    const error = useSelector(tenantErrorSelector, shallowEqual)

    const onSubmit = useCallback(async (values: any) => {
        console.log(JSON.stringify(values))
        await dispatch(createTenantAsync(values))
    }, [])

    return (
        <Form
            onSubmit={onSubmit}
            render={({handleSubmit, form, pristine, valid, values}) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <FormContent>
                            <Panel title='Personal'>
                                <Input name='personal.first_name'
                                       label='First name'
                                       required
                                       validate={value =>
                                           value?.length > 2
                                               ? undefined : 'Minimum length should be 3 symbols'
                                       }
                                />
                                <Input name='personal.last_name' label='Last name'
                                       required
                                       validate={requiredValidator}/>
                                <Input name='personal.current_address' label='Address'
                                       required
                                       validate={requiredValidator}/>
                            </Panel>

                            <Panel title='Employer'>
                                <Input name='employer.name' label='Employer name'
                                       required
                                       validate={requiredValidator}/>
                                <DateWrapper>
                                    <DateInput name='employer.start_date' label='Employment start date'
                                               required
                                               validate={value => {
                                                   return dateValidator(value, values.employer?.end_date)
                                                       ? undefined : 'error'
                                               }}
                                    />
                                    <DateInput name='employer.end_date' label='Employment end date'
                                               required
                                               validate={value => {
                                                   return dateValidator(values.employer?.start_date, value)
                                                       ? undefined : 'error'
                                               }}
                                    />
                                </DateWrapper>
                                <FormSpy subscription={{valid: true, values: true, active: true}}>
                                    {({form, values}) => {
                                        const dateValid = dateValidator(values.employer?.start_date, values.employer?.end_date)
                                        return (
                                            dateValid ? null :
                                                <ErrorLabel>Start date should be less than end date</ErrorLabel>
                                        )
                                    }}
                                </FormSpy>
                            </Panel>

                            <Panel title='Guarantor'>
                                <Input name='guarantor.name' label='Guarantor name'
                                       required
                                       validate={requiredValidator}/>
                                <Input name='guarantor.address' label='Guarantor address'
                                       required
                                       validate={requiredValidator}/>
                                <Dropdown name='guarantor.relation' label='Relationship to guarantor'
                                          options={options}
                                          required
                                          validate={requiredValidator}/>
                            </Panel>
                            <ButtonsWrapper>
                                <Button onClick={() => {
                                    form.reset()
                                }} title='Cancel'/>
                                <Button type="submit" title='Submit' styleType={'primary'} showSpinner={isLoading}
                                        disabled={!valid || pristine}/>
                            </ButtonsWrapper>
                            {error && <ErrorLabel>{error}</ErrorLabel>}
                        </FormContent>
                    </form>
                )
            }}
        />
    );
};

export default TenantForm;
