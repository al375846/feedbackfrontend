import React, { FunctionComponent } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form'
import { History } from '../../../../entities/History'
import { User } from '../../../../entities/User'
import { UserParams } from '../UserDataContainer'
import HistoryInfo from './HistoryInfo'
import ProfileInfo from './ProfileInfo'


interface UserProfileProps {
    history: History[] | undefined,
    user: User | undefined,
    edit: boolean,
    handleEdit: (edit: boolean) => void,
    onSubmit: (data: UserParams) => void,
    register: UseFormRegister<UserParams>,
    handleSubmit: UseFormHandleSubmit<UserParams>,
    handleChange: (change: boolean) => void,
    handleDelete: (del: boolean) => void,
}

const UserProfile: FunctionComponent<UserProfileProps> = (
    {
        history,
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

    return (
        <div>
            <div>
                <Tabs fill defaultActiveKey="profileap" 
                    id="apprentice-profile">
                    <Tab eventKey="profileap" title="Profile">
                        <ProfileInfo 
                            user={user}
                            edit={edit}
                            handleEdit={handleEdit}
                            onSubmit={onSubmit}
                            register={register}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            handleDelete={handleDelete}/>
                    </Tab>
                    <Tab eventKey="historyap" title="History">
                        <HistoryInfo 
                            history={history}/>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default UserProfile