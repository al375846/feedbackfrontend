import React, { FunctionComponent } from "react";
import { Form } from "react-bootstrap";
import { UseFormRegister } from "react-hook-form";

interface InputRadioProps {
    options: RadioValues[]
    input: string;
    register: UseFormRegister<any>;
}

interface RadioValues {
    id: string,
    label: string,
    value: string,
}

const InputRadio: FunctionComponent<InputRadioProps> = (
    {
        options,
        input,
        register
    }
) => {

    const renderOptions = options.map(option => {
        return <Form.Check 
                    key={option.id}
                    type='radio'
                    id={option.id} 
                    label={option.label}
                    {...register(input)}
                    value={option.value}
                    required={true}
                />
    })
    return (
        <Form.Group>
            {renderOptions}
        </Form.Group>
    );
};

export default InputRadio