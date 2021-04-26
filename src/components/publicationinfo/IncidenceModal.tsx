import React, { useContext, useState } from 'react'
import { createPortal } from "react-dom"
import { Button, Form, Modal } from 'react-bootstrap'

import api from '../../api/Api'
import CredentialsContext from '../../contexts/CredentialsContext'

export interface IncidenceModalProps {
    id: string
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const IncidenceModal = (props: IncidenceModalProps) => {

    const [description, setDescription] = useState<string>('')
    const [type, setType] = useState<string>('')
    const credentials = useContext(CredentialsContext)

    if (!props.show) return null

    const handleSubmit = async() => {
        const incdata = {
            type: type,
            description: description
        }

        await api.post(`/api/incidence/publication/${props.id}`, incdata, {
            headers: {
                Authorization: `Bearer ${credentials.token}`
            }
        })

        props.setShow(false)
        setDescription('')
    }

    const ModalDom = (
        <Modal show={props.show} onHide={() => props.setShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
            <Modal.Title>Indique el motivo de la incidencia</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group>
                <Form.Check type='radio' id="spam" label="Es spam" name="types" value="Es spam" onChange={e => setType(e.target.value)}/>
                <Form.Check type='radio' id="inapropiate" label="Es inapropiado" name="types" 
                value="Es inapropiado" onChange={e => setType(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} value={description} onChange={e => setDescription(e.target.value)}/>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={() => handleSubmit()}>
                Submit
            </Button>
            <Button variant="secondary" onClick={() => props.setShow(false)}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
    return createPortal(ModalDom, document.getElementById('modal') as HTMLElement)
}

export default IncidenceModal