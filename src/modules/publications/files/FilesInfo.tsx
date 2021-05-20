import React, { FunctionComponent } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Button } from 'react-bootstrap'

import '../detail/components/PublicationInfoTotal.css'
import { getFilename } from './FileDownload'

export interface FilesInfoProps {
    files: string[],
    downloadFile: (filename: string) => void
}

const FilesInfo: FunctionComponent<FilesInfoProps> = (
    {
        files,
        downloadFile
    }
) => {

    pdfjs.GlobalWorkerOptions.workerSrc = 
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

    const renderimage = (image: string) => {
        return (
            <div className="file-info">
                <img src={`https://feedback-heroku.herokuapp.com/api/public/file/${image}`} 
                    alt={image} id={image} width="100%" height="100%"/>
            </div>
        )
    }

    const rendervideo = (video: string) => {
        return (
            <div className="file-info">
                <video src={`https://feedback-heroku.herokuapp.com/api/public/file/${video}`} 
                    id={video} width="100%" height="100%"/>
            </div>
        )
    }

    const renderdocument = (document: string) => {
        return (
            <div style={{height: "9em", overflow: 'hidden'}}>
                <Document file={`https://feedback-heroku.herokuapp.com/api/public/file/${document}`} 
                    onLoadSuccess={() => {}}>
                <Page pageNumber={1} width={250} className="file-pdf"/>
                </Document>
            </div>
        )
    }

    const renderallfiles = files.map((file) => {
        const split = file.split('.')
        let renderdownload
        if (split[split.length - 1] === 'pdf')
            renderdownload = renderdocument(file)
        else if (split[split.length - 1] === 'mp4')
            renderdownload = rendervideo(file)
        else
            renderdownload = renderimage(file)
        return (
            <Button variant="light" onClick={() => downloadFile(file)} key={file} className="file-preview">
                {renderdownload}
                <div className="file-description">
                    {getFilename(file)}
                </div>
                <div className="file-download">
                    <i className="download icon"></i>
                </div>
            </Button>
        )
    })

    return (
        <div>
            {renderallfiles}
        </div>
    )

}

export default FilesInfo