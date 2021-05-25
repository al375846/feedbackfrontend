import React, { FunctionComponent, useEffect } from 'react'
import { Badge } from 'react-bootstrap'

import { CategoryRaw } from '../../../../entities/Category'
import './PublicationTotal.css'

export interface CategoryMenuProps {
    onSelectedChange: (selected: number) => void
    selected: number,
    categories: CategoryRaw[],
    divCategory: React.RefObject<HTMLDivElement>
}

const CategoryMenu: FunctionComponent<CategoryMenuProps> = (
    {
        selected,
        onSelectedChange,
        categories,
        divCategory
    }
) => {

    const wheelListener = (e: WheelEvent) => {
        e.preventDefault()
        divCategory.current!.scrollTo({
          left: divCategory.current!.scrollLeft + e.deltaY
        })
    }

    useEffect(() => {
        const refValue = divCategory.current

        refValue!.addEventListener('wheel', wheelListener)

        return () => refValue?.removeEventListener('wheel', wheelListener)
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setVariant = (id: number): string => {
        return id === selected ? 'primary' : 'light'
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
                <Badge variant={setVariant(category.id)} onClick={() => onSelectedChange(category.id)}>
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