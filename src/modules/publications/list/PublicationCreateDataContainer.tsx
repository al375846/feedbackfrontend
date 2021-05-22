import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import CredentialsContext from '../../../contexts/CredentialsContext';
import { Category, CategoryCreateOptions } from '../../../entities/Category';
import { Publication, PublicationCreateInput } from '../../../entities/Publication';
import { ROUTE_PUBLICATION_INFO } from '../../../routing/Routes';
import { PublicationRepository } from '../repository/PublicationRepository';
import { PublicationPostParams } from '../repository/PublicationRequestType';
import PublicationCreateView from './PublicationCreateView';

const PublicationCreateDataContainer = () => {

    const [ categories, setCategories ] = useState<Category[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ isAddingPublication, setIsAddingPublication ] = useState<boolean>(false);
    const { register, handleSubmit, watch } = useForm<PublicationCreateInput>();
    const category = watch('category');
    const subcategory = watch('subcategory');

    const history = useHistory();
    const repository = new PublicationRepository();
    const credentials = useContext(CredentialsContext);

    const navigateToPublication = (id: number) => history.push(ROUTE_PUBLICATION_INFO.replace(':id', id.toString()))

    const onAddingChange = (adding: boolean) => setIsAddingPublication(adding)

    const handlePost = (publication: Publication) => {
        navigateToPublication(publication.id)
        setLoading(false)
        setIsAddingPublication(false)
    }

    const onSubmit = (data: PublicationCreateInput) => {
        const categorypost = subcategory === CategoryCreateOptions.DEFAULT 
            ? category 
            : subcategory

        const publicationData: PublicationPostParams = {
            title: data.title,
            category: {name: categorypost},
            tags: data.tags.split(' '),
            description: data.description,
            date: new Date()
        };
        
        setLoading(true)
        let publication: Publication
        repository.postPublication(publicationData)
        .then(res => {
            publication = res.data.publication;
            if (data.files) {
                const filesData = new FormData();
                for (let i = 0; i < data.files.length; i++)
                    filesData.append(data.files[i].name, data.files[i], data.files[i].name)
                repository.postPublicationFiles(publication.id.toString(), filesData)
                .then(() => handlePost(publication))
                .catch(err => window.alert(err))
            }
            else handlePost(publication)
        })
        .catch(err => window.alert(err))
    }

    useEffect(() => {

        if (categories.length === 0 && credentials.token)
            repository.getCategories()
            .then(res => setCategories(res.data.categories))
            .catch(err => window.alert(err))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories])
    
    return (
        <PublicationCreateView 
            isAddingPublication={isAddingPublication}
            onAddingChange={onAddingChange}
            loading={loading}
            register={register}
            handleSubmit={handleSubmit}
            categories={categories}
            onSubmit={onSubmit}
            category={category}
            usertype={credentials.usertype}/>
    )
}

export default PublicationCreateDataContainer