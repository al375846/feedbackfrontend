import React, { useContext, useEffect, useRef, useState } from 'react'
import { Badge } from 'react-bootstrap'

import { CategoryRaw } from '../../entities/Category'
import api from '../../api/Api'
import CredentialsContext from '../../contexts/CredentialsContext'
import './PublicationTotal.css'

export interface CategoryMenuProps {
    setSelected: React.Dispatch<React.SetStateAction<number>>
    selected: number
}

const CategoryMenu = (props: CategoryMenuProps) => {

    const [categories, setCategories] = useState<CategoryRaw[]>([])
    const credentials = useContext(CredentialsContext)
    const divCategory = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const searchCategories = async () => {
            const {data} = await api.get('/api/category/raw', {
                headers: {
                    Authorization: `Bearer ${credentials.token}`
                }
            })

            data.categories.push({id: -2, name: 'Todas', description:'', parent: null})
            if (credentials.usertype === 'expert')
                data.categories.push({id: -1, name: 'Favoritas', description:'', parent: null})
            const cats = data.categories as CategoryRaw[]
            cats.sort((a, b) => {
                if(a.id < b.id)
                    return -1;
                else
                    return 1;
            })
            setCategories(cats)
        }

        if (credentials.token)
            searchCategories()
    }, [credentials.token, credentials.usertype])

    const setVariant = (id: number) => {
        if (id === props.selected)
            return 'primary'
        else
        return 'light'
    }

    const renderCategories = categories.map((category) => {
        return (
            <div className="category" key={category.id}>
                <h4>
                <Badge variant={setVariant(category.id)} onClick={() => props.setSelected(category.id)}>
                    {category.name}
                </Badge>
                </h4>
            </div>
        )
    })

    const scollLeft = () => {
        let actual = divCategory.current!.scrollLeft
        divCategory.current?.scrollTo({left: actual - 200})
    }

    const scollRight = () => {
        let actual = divCategory.current!.scrollLeft
        divCategory.current?.scrollTo({left: actual + 200})
    }

    return (
        <div className="horizontal-menu">
            <div className="arrow-prev" onClick={scollLeft}>
                <h4>
                    <Badge variant="secondary">
                    <i className="angle left icon"></i>
                    </Badge>
                </h4>
            </div>
            <div className="categories" ref={divCategory}>{renderCategories}</div>
            <div className="arrow-next" onClick={scollRight}>
                <h4>
                    <Badge variant="secondary">
                    <i className="angle right icon"></i>
                    </Badge>
                </h4>
            </div>
        </div>
    )
}

export default CategoryMenu