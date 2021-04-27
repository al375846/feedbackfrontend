import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Spinner } from 'react-bootstrap'

import CredentialsContext from '../../contexts/CredentialsContext'
import { User } from '../../entities/User'
import api from '../../api/Api'
import './ProfileTotal.css'
import SuggestionCreate from './SuggestionCreate'
import DeleteUserModal from './DeleteUserModal'
import ChangePasswordModal from './ChangePasswordModal'

const ProfileInfo = () => {

    const credentials = useContext(CredentialsContext)
    const [user, setUser] = useState<User>()
    const [edit, setEdit] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [deletemodal, setDeletemodal] = useState<boolean>(false)
    const [passwordmodal, setPasswordmodal] = useState<boolean>(false)

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

    const handleEdit = async(e: FormEvent) => {
        e.preventDefault()
        
        const userdata = {
            username: username,
            email: email,
            name: name,
            lastname: lastname,
            address: address,
            phone: phone
        }

        const {data} = await api.put('/api/user', userdata, {
            headers: {
                Authorization: `Bearer ${credentials.token}`
            }
        })

        if (data.user.username !== credentials.username) {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('usertype')
            credentials.onTokenChange('')
            credentials.onUsertypeChange('')
            credentials.onUsernameChange('')
            const link = document.createElement('a')
            link.href = '/'
            document.body.appendChild(link)
            link.click()
        }

        setEdit(false)
            
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
                    <Button variant="danger" onClick={() => setDeletemodal(true)}>
                        <i className="trash icon"></i>
                        Eliminar
                    </Button>
                </div>
                <div className="change-password">
                    <Button variant="secondary" onClick={() => setPasswordmodal(true)}>
                        <i className="key icon"></i>
                        Change password
                    </Button>
                </div>
            </div>
            <div className="profile-info">
                <Form onSubmit={e => handleEdit(e)}>
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
                    <Form.Label>
                        Username <i className="info circle icon" 
                        title="Si cambia su nombre de usuario tendrá que volver a iniciar sesión" />
                    </Form.Label>
                    <Form.Control type="text" value={username} readOnly={!edit} onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="userEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={email} readOnly={!edit} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="userAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={address} readOnly={!edit} onChange={(e) => setAddress(e.target.value)}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="userPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" value={phone} readOnly={!edit} onChange={(e) => setPhone(e.target.value)}/>
                    </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit" className="profile-submit" disabled={!edit}>
                    Submit
                    </Button>
                    <Button onClick={() => setEdit(!edit)} disabled={!edit}>
                        Cancel
                    </Button>
                </Form>
                <SuggestionCreate />
                <DeleteUserModal show={deletemodal} setShow={setDeletemodal}/>
                <ChangePasswordModal show={passwordmodal} setShow={setPasswordmodal}/>
            </div>
        </div>
    )
}

export default ProfileInfo