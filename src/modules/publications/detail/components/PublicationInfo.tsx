import React, {FunctionComponent} from 'react'
import {Alert, Spinner} from 'react-bootstrap'

import {Publication} from '../../../../entities/Publication'
import './PublicationInfoTotal.css'
import IncidenceModal from './IncidenceModal'
import PublicationDetails from '../../../../components/cards/PublicationDetails'
import { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form'
import { IncidenceInput } from '../PublicationInfoDataContainer'

interface PublicationInfoProps {
    publication: Publication | undefined,
    showIncidence: boolean,
    handleIncidence: (bool: boolean) => void,
    alert: boolean,
    showAlert: () => void,
    loading: boolean,
    register: UseFormRegister<IncidenceInput>,
    handleSubmit: UseFormHandleSubmit<IncidenceInput>,
    onSubmit: (data: IncidenceInput) => void,
    downloadFile: (filename: string) => void
}

const PublicationInfo: FunctionComponent<PublicationInfoProps> = (
    {
        publication,
        showIncidence,
        handleIncidence,
        alert,
        showAlert,
        loading,
        register,
        handleSubmit,
        onSubmit,
        downloadFile
    }
) => {

    if (loading || !publication)
        return <div className="loading"><Spinner animation="border"/></div>

    return (
        <div>
            <PublicationDetails 
                publication={publication}
                handleIncidence={handleIncidence}
                downloadFile={downloadFile}/>

            <IncidenceModal 
                show={showIncidence} 
                handleIncidence={handleIncidence} 
                showAlert={showAlert} 
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}/>

            <div className="created">
                <Alert variant="success" show={alert}>
                    Incidencia enviada
                </Alert>
            </div>
        </div>
    )
}

export default PublicationInfo