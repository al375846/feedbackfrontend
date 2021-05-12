import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'

import CredentialsContext from '../../contexts/CredentialsContext'
import { User } from '../../entities/User'
import './ProfileTotal.css'
import SuggestionCreate from './SuggestionCreate'
import DeleteUserModal from './DeleteUserModal'
import ChangePasswordModal from './ChangePasswordModal'
import { ProfileRepository } from './repository/ProfileRepository'
import { useForm } from 'react-hook-form'
import InputForm from '../../components/form/input/InputForm'
import ProfileInfoCard from '../../components/cards/ProfileInfoCard'

type UserParams = {
    email: string,
    name: string,
    lastname: string,
    address: string,
    phone: string
}

const ProfileInfo = () => {

    const credentials = useContext(CredentialsContext);
    const [ user, setUser ] = useState<User>();
    const [ edit, setEdit ] = useState<boolean>(false);
    const [ deletemodal, setDeletemodal ] = useState<boolean>(false);
    const [ passwordmodal, setPasswordmodal ] = useState<boolean>(false);
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credentials.token, user])

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

    const handleEdit = (bool: boolean) => setEdit(bool);

    const handleDelete = (bool: boolean) => setDeletemodal(bool);

    const handlePassword = (bool: boolean) => setPasswordmodal(bool);

    if ( loading || !user )
        return <div><Spinner animation="border"/></div> 

    return (
        <div>
            <ProfileInfoCard 
                edit={edit}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handlePassword={handlePassword}/>
            
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
                <DeleteUserModal show={deletemodal} handleDelete={handleDelete}/>
                <ChangePasswordModal show={passwordmodal} handlePassword={handlePassword}/>
            </div>
        </div>
    )
}

export default ProfileInfo