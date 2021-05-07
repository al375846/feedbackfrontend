import React, { useContext, useState } from 'react'
import { createPortal } from "react-dom"
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import CredentialsContext from '../../../contexts/CredentialsContext'
import InputTextArea from '../../../components/form/textarea/InputTextArea'
import InputRadio from '../../../components/form/radio/InputRadio'
import { PublicationRepository } from '../repository/PublicationRepository'


export interface IncidenceModalProps {
    id: string,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    showAlert: (message: string) => void
}

type IncidenceInput = {
    description: string,
    type: string
}

const IncidenceModal = (props: IncidenceModalProps) => {

    const { register, handleSubmit } = useForm<IncidenceInput>();
    const credentials = useContext(CredentialsContext);

    const repository = new PublicationRepository();

    const handlePost = () => {
        props.showAlert('Incidencia enviada')
        props.setShow(false)
    }

    if (!props.show) return null

    const onSubmit = (data: IncidenceInput) => {

        const incidenceData = {
            type: data.type,
            description: data.description
        }
        
        repository.postIncidence(props.id, incidenceData, credentials.token)
        .then(() => handlePost())
        .catch(err => window.alert(err))
        .finally(() => {})
    }

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

    const ModalDom = (
        <Modal show={props.show} onHide={() => props.setShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Indique el motivo de la incidencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputRadio 
                        options={radioValues}
                        input={'type'}
                        register={register}
                    />

                    <InputTextArea 
                        name={"incidence-description"}
                        label={"Description"}
                        row={4}
                        value={""}
                        type={"text"}
                        input={'description'}
                        register={register}
                    />

                    <Button variant="primary" style={{marginRight: '1em'}} type="submit">
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={() => props.setShow(false)}>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
    return createPortal(ModalDom, document.getElementById('modal') as HTMLElement)
}

export default IncidenceModal