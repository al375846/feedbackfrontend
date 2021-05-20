import React, { FunctionComponent } from 'react'
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { Publication } from '../../../entities/Publication'
import PublicationInfo from './components/PublicationInfo'
import { IncidenceInput } from './PublicationInfoDataContainer'

interface PublicationInfoViewProps {
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

const PublicationInfoView: FunctionComponent<PublicationInfoViewProps> = (
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
    return (
        <div>
            <PublicationInfo 
                publication={publication}
                showIncidence={showIncidence}
                handleIncidence={handleIncidence}
                alert={alert}
                showAlert={showAlert}
                loading={loading}
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                downloadFile={downloadFile}/>
        </div>
    )
}

export default PublicationInfoView
