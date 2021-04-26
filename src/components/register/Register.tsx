import React, { FormEvent, useContext, useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'

import api from '../../api/Api'
import CredentialsContext from '../../contexts/CredentialsContext'
import './Register.css'

const Register = () => {

    const [name, setName] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmpassword, setConfirmpassword] = useState<string>('')
    const [type, setType] = useState<string>('')
    const credentials = useContext(CredentialsContext)

    const login = async() => {
        const {data} = await api.post('/api/login_check', {
            username: username,
            password: password
        })
        localStorage.setItem('token', data.token)
        console.log(data)
    }

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()

        const regdata = {
            username: username,
            password: password,
            email: email,
            name: name,
            lastname: lastname,
            address: address,
            phone: phone
        }

        const {data} = await api.post(`/api/register/${type}`, regdata)
        localStorage.setItem('username', data.user.username)
        localStorage.setItem('usertype', type)
        console.log(data)

        await login()

        const link = document.createElement('a')
        link.href = '/'
        document.body.appendChild(link)
        link.click()
    }
    
    return(
        <div>
            <div className="register-form">
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Row>
                <Form.Group as={Col} controlId="registerName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col} controlId="registerLastname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} controlId="registerUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col} controlId="registerEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} controlId="registerAddress">
                <Form.Label>Addres</Form.Label>
                <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col} controlId="registerPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} controlId="registerPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col} controlId="registerConfirmpassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)}/>
                </Form.Group>
                </Form.Row>
                <Form.Group>
                <Form.Label>Tipo de usuario</Form.Label>
                <Form.Check type='radio' id="apprentice" label="Aprendiz" name="types" value="apprentice" onChange={e => setType(e.target.value)}/>
                <Form.Check type='radio' id="expert" label="Experto" name="types" value="expert" onChange={e => setType(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" className="profile-submit">
                Submit
                </Button>
            </Form>
            </div>
        </div>
    )
}

export default Register