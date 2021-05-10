import React, { useContext, useEffect, useRef, useState } from 'react'
import { Badge } from 'react-bootstrap'

import { CategoryRaw } from '../../../entities/Category'
import CredentialsContext from '../../../contexts/CredentialsContext'
import './PublicationTotal.css'
import { PublicationRepository } from '../repository/PublicationRepository'

export interface CategoryMenuProps {
    setSelected: React.Dispatch<React.SetStateAction<number>>
    selected: number
}

const CategoryMenu = (props: CategoryMenuProps) => {

    const [categories, setCategories] = useState<CategoryRaw[]>()
    const credentials = useContext(CredentialsContext)
    const divCategory = useRef<HTMLDivElement>(null)
    const repository = new PublicationRepository();

    const wheelListener = (e: WheelEvent) => {
        e.preventDefault()
        divCategory.current!.scrollTo({
          left: divCategory.current!.scrollLeft + e.deltaY
        })
    }

    useEffect(() => {
        const searchCategories = () => {
            repository.getCategoriesRaw(credentials.token)
            .then(res => {
                res.data.categories.push({
                    id: -2,
                    name: 'Todas',
                    description:'',
                    parent: null
                })
                if (credentials.usertype === 'expert')
                    res.data.categories.push({
                        id: -1,
                        name: 'Favoritas',
                        description:'',
                        parent: null
                    })
                res.data.categories.sort((a, b) => {
                    return a.id < b.id ? -1 : 1
                })
                setCategories(res.data.categories)
            })
            .catch(err => window.alert(err))
            .finally(() => {})
        }

        if (credentials.token)
            searchCategories()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [credentials.token, credentials.usertype])

    useEffect(() => {
        const refValue = divCategory.current

        refValue!.addEventListener('wheel', wheelListener)

        return () => refValue?.removeEventListener('wheel', wheelListener)
    }, [])

    const setVariant = (id: number): string => {
        return id === props.selected ? 'primary' : 'light'
    }

    const scrollLeft = () => {
        let actual = divCategory.current!.scrollLeft
        divCategory.current?.scrollTo({left: actual - 200})
    }

    const scrollRight = () => {
        let actual = divCategory.current!.scrollLeft
        divCategory.current?.scrollTo({left: actual + 200})
    }

    const renderCategories = categories?.map((category) => {
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

    return (
        <div className="horizontal-menu">
            <div className="arrow-prev" onClick={scrollLeft}>
                <h4>
                    <Badge variant="secondary">
                    <i className="angle left icon"></i>
                    </Badge>
                </h4>
            </div>
            <div className="categories" ref={divCategory}>{renderCategories}</div>
            <div className="arrow-next" onClick={scrollRight}>
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
