import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router'
import CredentialsContext from '../../../contexts/CredentialsContext'
import { CategoryRaw } from '../../../entities/Category'
import { Publication } from '../../../entities/Publication'
import { categoryAll, isCustomCategory, isUserExpert, PublicationCategories } from '../categories/PublicationCategory'
import { PublicationRepository, PublicationResponseData } from '../repository/PublicationRepository'
import PublicationListView from './PublicationListView'

const PublicationListDataContainer = () => {

    const [ publications, setPublications ] = useState<Array<Publication>>([])
    const [ categories, setCategories ] = useState<Array<CategoryRaw>>([categoryAll])
    const [ itemSize, setItemsize ] = useState<number>(0)
    const [ page, setPage ] = useState<number>(1)
    const [ left, setLeft ] = useState<number>(0)
    const [ cursor, setCursor ] = useState<number>(-1)
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ finalSearchTerm, setFinalSearchTerm ] = useState<string>('')
    const [ showCreate, setShowCreate ] = useState<boolean>(false)
    const [ selectedCategory, setSelectedCategory ] = useState(PublicationCategories.ALL)
    
    const history = useHistory();
    const repository = new PublicationRepository();
    const credentials = useContext(CredentialsContext);

    const navigateToPublication = (id: number) => history.push(`/publication/${id}`)

    const onSelectCategory = (selected: number) => setSelectedCategory(selected)

    const handleShow = (show: boolean) => setShowCreate(show);

    const postPublication = (publication: Publication) => navigateToPublication(publication.id)

    const handleSearchTerm = (term: string) => setFinalSearchTerm(term)

    const onPageChange = (page: number) => setPage(page)
    
    const handleSearch = (data: PublicationResponseData) => {
        setPublications(data.publications)
        setItemsize(data.itemSize)
        if (cursor === -1) {
            setLeft(data.leftSize)
            setCursor(data.publications[0].id + 1) 
        }
        else {
            setLeft((page - 1)*data.itemSize + data.leftSize) 
        }
    }

    const getParams = () => {
        return {
            cursor: cursor,
            page: page,
            filter: finalSearchTerm
        }
    }

    const findAllByExpert = () => {
        repository.findAllByExpert(getParams(), credentials.token)
        .then((res) => handleSearch(res.data))
        .catch((err) => window.alert(err))
        .finally(() => setLoading(false));
    }

    const findAllByCategory = () => {
        repository.findAllByCategory(selectedCategory, getParams(), credentials.token)
        .then((res) => handleSearch(res.data))
        .catch((err) => window.alert(err))
        .finally(() => setLoading(false));
    }

    const findAll = () => {
        repository.findAll(getParams(), credentials.token)
        .then((res) => handleSearch(res.data))
        .catch((err) => window.alert(err))
        .finally(() => setLoading(false));
    }

    const findCategories = () => {
        repository.getCategoriesRaw(credentials.token)
        .then(res => {
            const newCategories = [categoryAll, ...isUserExpert(credentials.token), ...res.data.categories]
            setCategories(newCategories)
        })
        .catch(err => window.alert(err))
        .finally(() => {})
    }

    useEffect(() => {
        setLoading(true);
        if (selectedCategory === PublicationCategories.FAVOURITE)
            findAllByExpert()
        else if (isCustomCategory(selectedCategory))
            findAllByCategory()
        else
            findAll()          
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finalSearchTerm, credentials.token, selectedCategory, page, cursor])

    useEffect(() => {
        findCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credentials.token, credentials.usertype])

    return (
        <PublicationListView 
            handleSearchTerm={handleSearchTerm}
            handleShow={handleShow}
            selected={selectedCategory}
            onSelectedChange={onSelectCategory}
            showCreate={showCreate}
            postPublication={postPublication}
            publications={publications}
            itemSize={itemSize}
            left={left}
            page={page}
            loading={loading}
            onPageChange={onPageChange}
            categories={categories}/>
    )
}

export default PublicationListDataContainer