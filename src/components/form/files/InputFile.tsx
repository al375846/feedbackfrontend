import React, { FunctionComponent } from "react";
import { Form } from "react-bootstrap";
import { UseFormRegister } from "react-hook-form";

interface InputFileProps {
    name: string;
    label: string;
    accept: string;
    files: React.RefObject<HTMLInputElement>;
}

const InputFile: FunctionComponent<InputFileProps> = (
    {
        name,
        label,
        accept,
        files
    }
) => {
    return (
        <Form.Group 
            controlId="files"
        >
            <Form.Label>{label}</Form.Label>
            <Form.File 
                ref={files}
                id={name}
                multiple={true}
                accept={accept}
            />
        </Form.Group>
    );
};

export default InputFile;