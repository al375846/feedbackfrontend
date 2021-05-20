import React, { FunctionComponent} from 'react'
import { createPortal } from "react-dom"
import { Button, Form, Modal } from 'react-bootstrap'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

import InputTextArea from '../../../../components/form/textarea/InputTextArea'
import InputRadio from '../../../../components/form/radio/InputRadio'
import { IncidenceInput } from '../PublicationInfoDataContainer'


export interface IncidenceModalProps {
    show: boolean,
    handleIncidence: (bool: boolean) => void,
    showAlert: () => void,
    register: UseFormRegister<IncidenceInput>,
    handleSubmit: UseFormHandleSubmit<IncidenceInput>,
    onSubmit: (data: IncidenceInput) => void
}

const IncidenceModal: FunctionComponent<IncidenceModalProps> = (
    {
        show,
        handleIncidence,
        showAlert,
        register,
        handleSubmit,
        onSubmit
    }
) => {

    const radioValues = [
        {
            id: "spam",
            label: "Es spam",
            value: "Es spam",
        },
        {
            id: "inapropiate",
            label: "Es inapropiado",
            value: "Es inapropiado",
        }
    ]

    if (!show) return null

    const ModalDom = (
        <Modal show={show} onHide={() => handleIncidence(false)}
            backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Indique el motivo de la incidencia
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputRadio 
                        options={radioValues}
                        input={'type'}
                        register={register}/>

                    <InputTextArea 
                        name={"incidence-description"}
                        label={"Description"}
                        row={4}
                        value={""}
                        input={'description'}
                        register={register}/>

                    <Button variant="primary"className="submit-button" type="submit">
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={() => handleIncidence(false)}>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
    return createPortal(ModalDom, document.getElementById('modal') as HTMLElement)
}

export default IncidenceModal