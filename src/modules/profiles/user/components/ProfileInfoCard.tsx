import React, { FunctionComponent } from 'react'
import { Button } from 'react-bootstrap'

interface ProfileInfoCardProps {
    edit: boolean,
    handleEdit: (bool: boolean) => void,
    handleChange: (change: boolean) => void,
    handleDelete: (del: boolean) => void,
}

const ProfileInfoCard: FunctionComponent<ProfileInfoCardProps> = (
    {
        edit,
        handleEdit,
        handleChange,
        handleDelete
    }
) => {
    return (
        <div className="profile-icon">
        <img className="ui medium bordered image" 
            alt="Profile" 
            src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Elliot_Grieveson.png" />
        <div className="profile-buttons">
            <Button onClick={() => handleEdit(!edit)} className="profile-edit">
                <i className="edit outline icon"></i>
                Editar
            </Button>
            <Button variant="danger" onClick={() => handleDelete(true)}>
                <i className="trash icon"></i>
                Eliminar
            </Button>
        </div>
        <div className="change-password">
            <Button variant="primary" onClick={() => handleChange(true)}>
                <i className="key icon"></i>
                Change password
            </Button>
        </div>
    </div>
    )
}

export default ProfileInfoCard
