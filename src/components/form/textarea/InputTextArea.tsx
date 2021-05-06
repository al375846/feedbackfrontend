import React, { FunctionComponent } from "react";
import { Form } from "react-bootstrap";
import { UseFormRegister } from "react-hook-form";

interface InputTextAreaProps {
    name: string;
    label: string;
    row: number
    value: string;
    type: string;
    input: string;
    register: UseFormRegister<any>;
}

const InputTextArea: FunctionComponent<InputTextAreaProps> = (
    {
        name,
        label,
        row,
        value,
        type,
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
                as="textarea"
                rows={row}
                type={type}
                defaultValue={value}
                {...register(input)}
                required={true}
            />
        </Form.Group>
    );
};

export default InputTextArea;