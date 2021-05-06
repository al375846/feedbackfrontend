import React, { FunctionComponent } from "react";
import { Form } from "react-bootstrap";
import { UseFormRegister } from "react-hook-form";

interface InputFileProps {
    name: string;
    label: string;
    accept: string;
    input: string;
    register: UseFormRegister<any>;
}

const InputFile: FunctionComponent<InputFileProps> = (
    {
        name,
        label,
        accept,
        input,
        register
    }
) => {
    return (
        <Form.Group 
            controlId="files"
        >
            <Form.Label>{label}</Form.Label>
            <Form.File 
                {...register(input)}
                id={name}
                multiple={true}
                accept={accept}
            />
        </Form.Group>
    );
};

export default InputFile;