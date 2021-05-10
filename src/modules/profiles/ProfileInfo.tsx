import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'

import CredentialsContext from '../../contexts/CredentialsContext'
import { User } from '../../entities/User'
import api from '../../api/Api'
import './ProfileTotal.css'
import SuggestionCreate from './SuggestionCreate'
import DeleteUserModal from './DeleteUserModal'
import ChangePasswordModal from './ChangePasswordModal'
import { ProfileRepository } from './repository/ProfileRepository'
import { useForm } from 'react-hook-form'
import InputForm from '../../components/form/input/InputForm'

type UserParams = {
    email: string,
    name: string,
    lastname: string,
    address: string,
    phone: string
}

const ProfileInfo = () => {

    const credentials = useContext(CredentialsContext);
    const [user, setUser] = useState<User>();
    const [edit, setEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [deletemodal, setDeletemodal] = useState<boolean>(false);
    const [passwordmodal, setPasswordmodal] = useState<boolean>(false);
    const repository = new ProfileRepository();
    const [ loading, setLoading ] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<UserParams>();

    useEffect(() => {
        const searchUser = () => {
            setLoading(true)
            repository.getUser(credentials.token)
            .then(res => setUser(res.data.user))
            .catch(err => window.alert(err))
            .finally(() => setLoading(false))
        }

        if (credentials.token && !user)
            searchUser()

    }, [credentials.token, user])

    if ( loading || !user )
        return <div><Spinner animation="border"/></div> 

    const onSubmit = (data: UserParams) => {
       
        const userData = {
            username: credentials.username,
            email: data.email,
            name: data.name,
            lastname: data.lastname,
            address: data.address,
            phone: data.phone
        }

        repository.putUser(userData, credentials.token)
        .then(() => setEdit(false))
        .catch(err => window.alert(err))
            
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
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <InputForm 
                                name={"edit-name"}
                                label={"Name"}
                                value={user.name}
                                type={"text"}
                                required={true}
                                input={'name'}
                                register={register}
                            />
                        </Col>
                        <Col>
                            <InputForm 
                                name={"edit-lastname"}
                                label={"Lastame"}
                                value={user.lastname}
                                type={"text"}
                                required={true}
                                input={'lastname'}
                                register={register}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputForm 
                                name={"edit-email"}
                                label={"Email"}
                                value={user.email}
                                type={"email"}
                                required={true}
                                input={'email'}
                                register={register}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputForm 
                                name={"edit-address"}
                                label={"Address"}
                                value={user.address}
                                type={"text"}
                                required={true}
                                input={'address'}
                                register={register}
                            />
                        </Col>
                        <Col>
                            <InputForm 
                                name={"edit-phone"}
                                label={"Phone"}
                                value={user.phone}
                                type={"text"}
                                required={true}
                                input={'phone'}
                                register={register}
                            />
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="profile-submit" disabled={!edit}>
                    Submit
                    </Button>
                    <Button variant="secondary" onClick={() => setEdit(!edit)} disabled={!edit}>
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