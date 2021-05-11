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

const badgeAll = {
    id: -2,
    name: 'Todas',
    description:'',
    parent: null
}

const expert = {
    id: -1,
    name: 'Favoritas',
    description:'',
    parent: null
}

const CategoryMenu = (props: CategoryMenuProps) => {

    const [ categories, setCategories ] = useState<CategoryRaw[]>([badgeAll])
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
                let newCategories
                if (credentials.usertype === 'expert')
                    newCategories = [badgeAll, expert, ...res.data.categories]
                else
                    newCategories = [badgeAll, ...res.data.categories]
                setCategories(newCategories)
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
            <div className="category" key={category.id} id={'cat'+category.id}>
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
            <div className="arrow-prev" onClick={scrollLeft} id="scroll-left">
                <h4>
                    <Badge variant="secondary">
                    <i className="angle left icon"></i>
                    </Badge>
                </h4>
            </div>
            <div className="categories" ref={divCategory} id="categories-scroll">{renderCategories}</div>
            <div className="arrow-next" onClick={scrollRight} id="scroll-right">
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
