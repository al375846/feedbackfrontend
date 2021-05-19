import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CredentialsContext from '../../../contexts/CredentialsContext';
import { Category } from '../../../entities/Category';
import { Publication } from '../../../entities/Publication';
import { PublicationPostParams, PublicationRepository } from '../repository/PublicationRepository';

type PublicationCreateInput = {
    title: string,
    tags: string,
    description: string,
    category: string,
    subcategory: string,
    files: FileList
}

const PublicationCreateDataContainer = () => {

    const [ categories, setCategories ] = useState<Category[]>();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ isAdding, setIsAdding ] = useState<boolean>(false);
    const { register, handleSubmit, watch } = useForm<PublicationCreateInput>();
    const category = watch('category');
    const subcategory = watch('subcategory');

    const repository = new PublicationRepository();
    const credentials = useContext(CredentialsContext);

    const handlePost = (publication: Publication) => {
        
        setLoading(false);
    }

    const onSubmit = (data: PublicationCreateInput) => {
        const categorypost = subcategory === "-1" ? category : subcategory

        const publicationData: PublicationPostParams = {
            title: data.title,
            category: {name: categorypost},
            tags: data.tags.split(' '),
            description: data.description,
            date: new Date()
        };
        
        setLoading(true)
        let publication: Publication
        repository.postPublication(publicationData, credentials.token)
        .then(res => {
            publication = res.data.publication;
            if (data.files) {
                const filesData = new FormData();
                for (let i = 0; i < data.files.length; i++)
                    filesData.append(data.files[i].name, data.files[i], data.files[i].name)
                repository.postPublicationFiles(publication.id, filesData, credentials.token)
                .then(() => handlePost(publication))
                .catch(err => window.alert(err))
            }
            else {
                handlePost(publication)
            }
        })
        .catch(err => window.alert(err))
    }


    useEffect(() => {

        const searchCategories = () => {
            repository.getCategories(credentials.token)
            .then(res => setCategories(res.data.categories))
            .catch(err => window.alert(err))
            .finally(() => {})
        }

        if (credentials.token && !categories)
            searchCategories()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories, credentials.token])
    
    return (
        <div>
            
        </div>
    )
}

export default PublicationCreateDataContainer
