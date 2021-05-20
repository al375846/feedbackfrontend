import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

import CredentialsContext from '../../../contexts/CredentialsContext';
import PublicationDetailsContext from '../../../contexts/PublicationDetailsContext';
import { dowloandFile } from '../files/FileDownload';
import { PublicationRepository } from '../repository/PublicationRepository';
import PublicationInfoView from './PublicationInfoView'

interface PublicationInfoDataContainerProps {
    id: string
}

export type IncidenceInput = {
    description: string,
    type: string
}

const PublicationInfoDataContainer: FunctionComponent<PublicationInfoDataContainerProps> = (
    {
        id
    }
) => {

    const [ showIncidence, setShowIncidence ] = useState<boolean>(false)
    const [ alert, setAlert ] = useState<boolean>(false)
    const [ loading, setLoading ] = useState<boolean>(false)
    const { register, handleSubmit } = useForm<IncidenceInput>()

    const repository = new PublicationRepository()
    const credentials = useContext(CredentialsContext)
    const publicationContext = useContext(PublicationDetailsContext)

    const downloadFilesPublication = (filename: string) => dowloandFile(filename, repository)

    const handleIncidence = (bool: boolean) => setShowIncidence(bool)

    const showAlert = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const handlePost = () => {
        showAlert()
        handleIncidence(false)
    }

    const onSubmit = (data: IncidenceInput) => {

        const incidenceData = {
            type: data.type,
            description: data.description
        }
        
        repository.postIncidence(id, incidenceData, credentials.token)
        .then(() => handlePost())
        .catch(err => window.alert(err))
        .finally(() => {})
    }

    useEffect(() => {
        if (!publicationContext.publication) {
            setLoading(true);
            repository.findById(id, credentials.token)
                .then((res) => publicationContext.onPublicationChange(res.data.publication))
                .catch((err) => window.alert(err))
                .finally(() => setLoading(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicationContext.publication, credentials.token, id])

    return (
        <div>
            <PublicationInfoView 
                publication={publicationContext.publication}
                showIncidence={showIncidence}
                handleIncidence={handleIncidence}
                alert={alert}
                showAlert={showAlert}
                loading={loading}
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                downloadFile={downloadFilesPublication}/>
        </div>
    )
}

export default PublicationInfoDataContainer