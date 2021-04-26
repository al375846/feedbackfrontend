import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Spinner } from 'react-bootstrap'

import CredentialsContext from '../../contexts/CredentialsContext'
import { User } from '../../entities/User'
import api from '../../api/Api'
import './ProfileTotal.css'
import SuggestionCreate from './SuggestionCreate'

const ProfileInfo = () => {

    const credentials = useContext(CredentialsContext)
    const [user, setUser] = useState<User>()
    const [edit, setEdit] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [userame, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [phone, setPhone] = useState<string>('')

    useEffect(() => {
        const searchUser = async () => {
            const {data} = await api.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })

            setUser(data.user)
            
        }

        if (credentials.token && !user)
            searchUser()
        
        if (user) {
            setName(user.name)
            setLastname(user.lastname)
            setUsername(user.username)
            setEmail(user.email)
            setAddress(user.address)
            setPhone(user.phone)
        }

    }, [credentials.token, user])

    if (!user)
        return (
            <div>
                <Spinner animation="border" />
            </div> 
        )

    const renderSubmitButton = () => {
        if (edit)
            return (
                <div>
                <Button variant="primary" type="submit" className="profile-submit">
                    Submit
                </Button>
                <Button onClick={() => setEdit(!edit)}>
                    Cancel
                </Button>
                </div>
                
            )
        return null
    }

    return (
        <div>
            <div className="profile-icon">
                <img className="ui medium bordered image" alt="Profile" src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Elliot_Grieveson.png" />
                <div className="profile-buttons">
                    <Button onClick={() => setEdit(!edit)} className="profile-edit">
                        <i className="edit outline icon"></i>
                        Editar
                    </Button>
                    <Button variant="danger" >
                        <i className="trash icon"></i>
                        Eliminar
                    </Button>
                </div>
            </div>
            <div className="profile-info">
                <Form>
                    <Form.Row>
                    <Form.Group as={Col} controlId="userName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} readOnly={!edit} onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="userLastname">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control type="text" value={lastname} readOnly={!edit} onChange={(e) => setLastname(e.target.value)}/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="userUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={userame} readOnly={!edit} onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="userEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={email} readOnly={!edit} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="userAddress">
                    <Form.Label>Addres</Form.Label>
                    <Form.Control type="text" value={address} readOnly={!edit} onChange={(e) => setAddress(e.target.value)}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="userPhone">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control type="text" value={phone} readOnly={!edit} onChange={(e) => setPhone(e.target.value)}/>
                    </Form.Group>
                    </Form.Row>
                    {renderSubmitButton()}
                </Form>
                <SuggestionCreate />
            </div>
        </div>
    )
}

export default ProfileInfo