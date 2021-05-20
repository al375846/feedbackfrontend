import { PublicationRepository } from "../repository/PublicationRepository"

const mymes: { [extension: string]: string }  = {
    jpg: 'image/jpg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    pdf: 'application/pdf',
    mp4: 'video/mp4'
}

export const getFilename = (filename: string) => {
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

export const dowloandFile = (filename: string, repository: PublicationRepository) => {

    const extension = filename.split('.')
    const type = extension[extension.length - 1]
    const filetype = mymes[type]

    repository.getFile(filename)
    .then(res => {
        let file = new File([res.data], filename, {type: filetype})
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(file)
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
    })
    .catch(err => window.alert(err))
    .finally(() => {})
}