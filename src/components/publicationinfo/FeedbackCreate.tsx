import React, { useState, useContext, FormEvent, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'

import CredentialsContext from '../../contexts/CredentialsContext'
import api from '../../api/Api'
import './FeedbackCreate.css'
import { Feedback } from '../../entities/Feedback'

export interface FeedbackCreateProps {
    publication: number,
    visible: boolean,
    setShowCreate: React.Dispatch<React.SetStateAction<boolean>>,
    postFeedback: (feedback: Feedback) => void
}

const FeedbackCreate = (props: FeedbackCreateProps) => {

    const credentials = useContext(CredentialsContext)

    const [description, setDescription] = useState<string>('')
    const files = useRef<HTMLInputElement>(null)

    if (!props.visible)
        return (
            <div style={{display: 'none'}}>
            </div>
        )

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()

        const feeddata = {
            description: description,
            date: new Date()
        }

        const postFeedbackNew = async() => { 
            const {data} = await api.post(`/api/feedback/publication/${props.publication}`, feeddata, {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })

            const feedback: Feedback = data.feedback

            if (files.current && files.current.files) {
                const f = new FormData()
                
                for (let i = 0; i < files.current.files.length; i++) {
                    f.append(files.current.files[i].name, files.current.files[i], files.current.files[i].name)
                    if ('application/pdf' === files.current.files[0].type)
                        feedback.document.push(files.current.files[0].name)
                    else if ('video/mp4' === files.current.files[0].type)
                        feedback.video.push(files.current.files[0].name)
                    else
                        feedback.images.push(files.current.files[0].name)
                }
                api.post(`/api/file/feedback/${feedback.id}`, f, {
                    headers: {
                        Authorization: `Bearer ${credentials.token}`
                    }
                })
            }

            props.postFeedback(feedback)
        }

        postFeedbackNew().then(() => {
            props.setShowCreate(false)
            setDescription('')
        })
    }

    return (
        <div className="feedback-form">
            <div className="create-form">
                <Form onSubmit={(e) => handleSubmit(e)}>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={5} value={description} onChange={e => setDescription(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="files">
                        <Form.Label>Files</Form.Label>
                        <Form.File id="files" multiple={true} ref={files} accept="application/pdf,video/mp4,image/jpg,image/jpeg,image/png"/>
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{marginRight: '1em'}}>
                        Submit
                    </Button>
                    <Button variant="primary" type="button" onClick={() => props.setShowCreate(false)}>
                        Cancel
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default FeedbackCreate