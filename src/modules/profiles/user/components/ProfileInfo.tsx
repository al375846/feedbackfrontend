import React, { FunctionComponent} from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'

import './ProfileTotal.css'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import ProfileInfoCard from '../../../../components/cards/ProfileInfoCard'
import InputForm from '../../../../components/form/input/InputForm'
import { User } from '../../../../entities/User'
import { UserParams } from '../UserDataContainer'

export interface ProfileInfoProps {
    user: User | undefined,
    edit: boolean,
    handleEdit: (edit: boolean) => void,
    onSubmit: (data: UserParams) => void,
    register: UseFormRegister<UserParams>,
    handleSubmit: UseFormHandleSubmit<UserParams>,
    handleChange: (change: boolean) => void,
    handleDelete: (del: boolean) => void,
}

const ProfileInfo: FunctionComponent<ProfileInfoProps> = (
    {
        user,
        edit,
        handleEdit,
        onSubmit,
        register,
        handleSubmit,
        handleChange,
        handleDelete
    }
) => {

    if ( !user )
        return <div><Spinner animation="border"/></div> 

    return (
        <div>
            <ProfileInfoCard 
                edit={edit}
                handleEdit={handleEdit}
                handleChange={handleChange}
                handleDelete={handleDelete}/>
            
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
                    <Button variant="secondary" onClick={() => handleEdit(!edit)} disabled={!edit}>
                        Cancel
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ProfileInfo