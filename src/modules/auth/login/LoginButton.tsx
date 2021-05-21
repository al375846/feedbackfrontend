import React, { FunctionComponent, useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import CredentialsContext from '../../../contexts/CredentialsContext';
import { AuthRepository } from '../repository/AuthRepository';
import LoginModal from './LoginModal'

interface LoginButtonProps {
    
}

const LoginButton: FunctionComponent<LoginButtonProps> = () => {

    const credentials = useContext(CredentialsContext);
    const [ show, setShow ] = useState<boolean>(false)
    const repository = new AuthRepository();
    const history = useHistory();

    const navigateToHome = () => history.push('/');

    const onShowChange = (show: boolean) => setShow(show);

    const onHandleLogout = () => {

        const logData = {
            onesignal: localStorage.getItem('onesignal')!
        }

        repository.logout(logData, credentials.token)
        .then(() => {
            localStorage.removeItem('onesignal')
        })
        .catch(err => window.alert(err))
        .finally(() => {
            credentials.removeAll()
            navigateToHome()
        })
    }

    if (!credentials.token)
        return (
            <div className="item">
                <Button variant="primary" onClick={() => setShow(true)}>
                    Log in
                </Button>

                <LoginModal show={show} onShowChange={onShowChange}/>
            </div>
        )
    else 
        return (
            <div className="item">
                <Link to="/profile" className="item">
                    <i className="user icon"></i>
                    {credentials.username}
                </Link>

                <Button variant="secondary" onClick={() => onHandleLogout()}>
                    Log out
                </Button>
            </div>  
        )
}

export default LoginButton