import React, { useContext, useEffect, useRef, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Badge, Button, Spinner } from 'react-bootstrap'

import CredentialsContext from '../../contexts/CredentialsContext'
import { Publication } from '../../entities/Publication'
import api from '../../api/Api'
import './PublicationInfo.css'
import moment from 'moment'

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

        const searchFile = (filename: string) => {
            const extension = filename.split('.')
            const type = extension[extension.length - 1]
            let file: HTMLMediaElement | HTMLImageElement | HTMLVideoElement
            if (type === 'pdf')
                file = document.getElementById(filename) as HTMLMediaElement
            else if (type === 'mp4')
                file = document.getElementById(filename) as HTMLVideoElement
            else
                file = document.getElementById(filename) as HTMLImageElement
            let request = new XMLHttpRequest()
            request.responseType = 'blob'
            request.open('get', `https://feedback-heroku.herokuapp.com/api/file/${filename}`, true)
            request.setRequestHeader('Authorization', `Bearer ${credentials.token}`)
            request.onreadystatechange = e => {
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    console.log(request.response)
                    let url = URL.createObjectURL(request.response)
                    file.src = url
                    file.onload = () => {
                        URL.revokeObjectURL(file.src)
                    }
                }
            }
            request.send(null)
        }

        if (credentials.token && !publication)
            searchPublication()
        
        if (publication) {
            publication.document.forEach((document) => {
                searchFile(document)
            })
    
            publication.video.forEach((video) => {
                searchFile(video)
            })
    
            publication.images.forEach((image) => {
                searchFile(image)
            })
        }
            
    }, [publication])
    
    if (!publication)
        return (
            <div className="loading">
                <Spinner animation="border" />
            </div> 
        )

    const mymes: { [extension: string]: string }  = {
        jpg: 'image/jpg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        pdf: 'application/pdf',
        mp4: 'video/mp4'
    }

    const getFilename = (filename: string) => {
        const fileparts = filename.split('-')
        const extension = filename.split('.')
        const type = extension[extension.length - 1]
        let name = ''
        for (let i = 0; i < fileparts.length - 1; i++) {
            if (i !== 0)
                name += '-'
            name += fileparts[i]
        }
        name += '.' +type
        return name
    }

    const dowloandFile = (filename: string) => {

        const extension = filename.split('.')
        const type = extension[extension.length - 1]
        const filetype = mymes[type]

        api.get(`/api/file/${filename}`, {
            headers: {
                Authorization: `Bearer ${credentials.token}`
            },
            responseType: 'blob'
        }).then(response => {
            let file = new File([response.data], getFilename(filename), {type: filetype})
            const url = window.URL.createObjectURL(file);
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', filename)
            document.body.appendChild(link)
            link.click()
        })
    }

    const renderimages = publication.images.map((image) => {
        return (
            <Button variant="light" onClick={() => dowloandFile(image)} key={image} className="file-preview">
                <div className="file-info">
                    <img src="" alt={image} id={image} width="100%" height="100%"/>
                </div>
                <div className="file-description">
                    {getFilename(image)}
                    <i className="download icon"></i>
                </div>
            </Button>
        )
    })

    const rendervideos = publication.video.map((video) => {
        return (
            <Button variant="light" onClick={() => dowloandFile(video)} key={video} className="file-preview">
                <div>
                    <video src="" id={video} width="100%" height="100%"/>
                </div>
                <div>
                    {getFilename(video)}
                    <i className="download icon"></i>
                </div>
            </Button>
        )
    })

    const renderfiles = publication.document.map((document) => {
        return (
            <Button variant="light" onClick={() => dowloandFile(document)} key={document} className="file-preview">
                <div>
                    <embed  src="" id={document} width="100%" height="100%" type="application/pdf" />
                </div>
                <div>
                    {getFilename(document)}
                    <i className="download icon"></i>
                </div>
            </Button>
        )
    })
    

    const formatDate = (date: Date): string => {
        return moment(date).format('LLL');
    }

    const renderTags = publication.tags.map((tag) => {
        return (
            <span className="render-tags" key={tag}>
            <Badge variant="secondary">{tag}</Badge>
            </span>
        )
    })

    return (
        <div>
            <div className="ui header">
                <h1>{publication.title}</h1>
            </div>
            <div className="metadata item">
                <span className="date">
                    {formatDate(publication.date)}
                </span>
            </div>
            <hr />
            <div className="content">
                <div className="comment">
                    <div className="content">
                        <div className="text">{publication.description}</div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="comment">
                    <div className="content">
                        <div className="text tags">{renderTags}</div>
                    </div>
                </div>
            </div>
            <hr />
            <div>
                {renderfiles}
                {renderimages}
                {rendervideos}
            </div>
        </div>
    )
}

export default PublicationInfo