import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Document, Page, pdfjs } from 'react-pdf'

import { Feedback } from '../../entities/Feedback'
import api from '../../api/Api'
import CredentialsContext from '../../contexts/CredentialsContext'
import './PublicationFeedbacks.css'
import { Rate } from '../../entities/Rate'

export interface FeedbackCardProps {
    feedback: Feedback
}

const FeedbackCard = (props: FeedbackCardProps) => {

    const credentials = useContext(CredentialsContext)
    const [rating, setRating] = useState<Rate | null>(props.feedback.valoration)

    useEffect(() => {

    }, [rating])

    pdfjs.GlobalWorkerOptions.workerSrc = 
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

    const mymes: { [extension: string]: string }  = {
        jpg: 'image/jpg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        pdf: 'application/pdf',
        mp4: 'video/mp4'
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
            let file = new File([response.data], filename, {type: filetype})
            const url = window.URL.createObjectURL(file);
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', filename)
            document.body.appendChild(link)
            link.click()
        })
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
        if (name.length > 20)
            name = name.substr(0,20) + '...'
        return name
    }

    const renderimages = props.feedback.images.map((image) => {
        return (
            <Button variant="light" onClick={() => dowloandFile(image)} key={image} className="file-preview">
                <div className="file-info">
                    <img src={`https://feedback-heroku.herokuapp.com/api/public/file/${image}`} alt={image} id={image} width="100%" height="100%"/>
                </div>
                <div className="file-description">
                    {getFilename(image)}
                </div>
                <div className="file-download">
                    <i className="download icon"></i>
                </div>
            </Button>
        )
    })

    const rendervideos = props.feedback.video.map((video) => {
        return (
            <Button variant="light" onClick={() => dowloandFile(video)} key={video} className="file-preview">
                <div className="file-info">
                    <video src={`https://feedback-heroku.herokuapp.com/api/public/file/${video}`} id={video} width="100%" height="100%"/>
                </div>
                <div>
                    {getFilename(video)}
                </div>
                <div className="file-download">
                    <i className="download icon"></i>
                </div>
            </Button>
        )
    })

    const renderfiles = props.feedback.document.map((document) => {
        return (
            <Button variant="light" onClick={() => dowloandFile(document)} key={document} className="file-preview">
                <div style={{height: "9em", overflow: 'hidden'}}>
                    <Document file={`https://feedback-heroku.herokuapp.com/api/public/file/${document}`} onLoadSuccess={() => {}}>
                    <Page pageNumber={1} width={250} className="file-pdf"/>
                    </Document>
                </div>
                <div>
                    {getFilename(document)}
                </div>
                <div className="file-download">
                    <i className="download icon"></i>
                </div>
            </Button>
        )
    })

    const handleRatingClick = async(rate: number) => {
        if (!rating) {
            const ratedata = {
                grade: rate,
                date: new Date()
              }
            const {data} = await api.post(`/api/rating/feedback/${props.feedback.id}`, ratedata, {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })
            setRating(data.rating)
        }
        else {
            const ratedata = {
                grade: rate,
              }
            const {data} = await api.put(`/api/rating/feedback/${rating.id}`, ratedata, {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })
            setRating(data.rating)
        }
    }

    const renderstars = () => {
        if (!rating)
            return (
                <div className="rating">
                <i className="star outline icon" onClick={() => handleRatingClick(1)}></i>
                <i className="star outline icon" onClick={() => handleRatingClick(2)}></i>
                <i className="star outline icon" onClick={() => handleRatingClick(3)}></i>
                <i className="star outline icon" onClick={() => handleRatingClick(4)}></i>
                <i className="star outline icon" onClick={() => handleRatingClick(5)}></i>
                </div>
            )
        else
            return (
                <div className="rating">
                <i className={`star ${rating.grade >= 1 ? '' : 'outline'} icon`} onClick={() => handleRatingClick(1)}></i>
                <i className={`star ${rating.grade >= 2 ? '' : 'outline'} icon`} onClick={() => handleRatingClick(2)}></i>
                <i className={`star ${rating.grade >= 3 ? '' : 'outline'} icon`} onClick={() => handleRatingClick(3)}></i>
                <i className={`star ${rating.grade >= 4 ? '' : 'outline'} icon`} onClick={() => handleRatingClick(4)}></i>
                <i className={`star ${rating.grade === 5 ? '' : 'outline'} icon`} onClick={() => handleRatingClick(5)}></i>
                </div>
            )
    }

    return (
        <Card className="feedback-card" key={props.feedback.id}>
            <Card.Header>
                <div className="ui secondary menu">
                    <div className="item">
                        {renderstars()}
                    </div>
                    <div className="right menu item">
                        <i className="user icon" />
                        {props.feedback.expert.username}
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <div className="content">
                    <div className="comment">
                        <div className="content">
                            <div className="text">{props.feedback.description}</div>
                        </div>
                    </div>
                </div>
            </Card.Body>
                <div>
                    {renderfiles}
                    {renderimages}
                    {rendervideos}
                </div>
                <small className="text-muted">
                    <div className="ui secondary menu">
                        <div className="metadata item">
                        <span className="date">
                            {moment(props.feedback.date).format('D MMM YYYY HH:mm:ss')}
                        </span>
                        </div>
                    </div>
                </small>
        </Card>
    )
}

export default FeedbackCard