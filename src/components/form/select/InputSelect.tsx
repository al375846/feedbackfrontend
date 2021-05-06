import React, { FunctionComponent } from "react";
import { Form } from "react-bootstrap";
import { UseFormRegister } from "react-hook-form";

interface InputSelectProps {
    name: string;
    label: string;
    options: JSX.Element[];
    input: string;
    register: UseFormRegister<any>;
}

const InputSelect: FunctionComponent<InputSelectProps> = (
    {
        name,
        label,
        options,
        input,
        register
    }
) => {
    return (
        <Form.Group 
            controlId={name}
        >
            <Form.Label>{label}</Form.Label>
            <Form.Control 
                as="select"
                {...register(input)}
            >
                {options}
            </Form.Control>
        </Form.Group>
    );
};

export default InputSelect;