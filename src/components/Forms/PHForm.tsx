import React from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type TFormConfig = {
    resolver?: any
    defaultValues?: Record<string,unknown>
}

type TLFormProps = {
    children:React.ReactNode
    onSubmit: SubmitHandler<FieldValues>
} & TFormConfig
const LFForm = ({children,onSubmit,resolver,defaultValues}:TLFormProps) => {
    const formConfig:TFormConfig = {}
    if (resolver) {
        formConfig['resolver'] = resolver
    }
    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues
    }
    const methods = useForm(formConfig);
    
    const submit:SubmitHandler<FieldValues> = (data,event) =>{
        // event.preventDefault(); 
        onSubmit(data);
        // methods.reset(); // reset the fields
    }
    
    
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submit)}>
                {children}
            </form>
        </FormProvider>
    );
};

export default LFForm;