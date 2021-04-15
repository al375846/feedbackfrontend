import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

import CredentialsContext from '../../contexts/CredentialsContext'
import { Publication } from '../../entities/Publication'
import api from '../../api/Api'
import './PublicationInfo.css'

type PublicationInfoParams = {id: string}

const PublicationInfo = ({match}: RouteComponentProps<PublicationInfoParams>) => {

    const [publication, setPublication] = useState<Publication>()
    const credentials = useContext(CredentialsContext)

    useEffect(() => {
        const searchPublication = async () => {
            const {data} = await api.get(`/api/publication/${match.params.id}`, {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })

            setPublication(data.publication)
        }

        if (credentials.token)
            searchPublication()
    }, [publication])
    
    if (!publication)
        return (
            <div className="loading">
                <Spinner animation="border" />
            </div> 
        )

    /*const renderImages = publication.images.map((image) => {
        return (
            <img className="ui small image" src={`https://feedback-uji.s3.eu-west-3.amazonaws.com/files/${image}`}></img>
        )
    })*/

    return (
        <div>
            {publication.title}
        </div>
    )
}

export default PublicationInfo