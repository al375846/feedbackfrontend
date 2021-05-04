import React, {FunctionComponent} from "react";
import "./input-form.css";
import {Col, Form} from "react-bootstrap";

interface InputFormProps {
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    type: string;
}

const InputForm: FunctionComponent<InputFormProps> = (
    {
        name,
        label,
        value,
        onChange,
        type
    }
) => {
    return (
        <Form.Group
            as={Col}
            controlId={name}
        >
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </Form.Group>
    );
};

export default InputForm;
