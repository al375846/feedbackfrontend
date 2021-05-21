import React, { FunctionComponent } from 'react'
import { Tab, Tabs } from 'react-bootstrap'

import { Category } from '../../../../entities/Category'
import { Suggestion } from '../../../../entities/Suggestion'
import CategoriesInfo from './CategoriesInfo'
import SuggestionList from './SuggestionList'

interface AdminProfileProps {
    categoryparent: string,
    suggestions: Suggestion[] | undefined,
    categories: Category[] | undefined,
    handleCategory: (cat: Category) => void,
    handleAccept: (suggestion: Suggestion) => void,
    handleRemove: (suggestion: Suggestion) => void
}

const AdminProfile: FunctionComponent<AdminProfileProps> = (
    {
        categoryparent,
        suggestions,
        categories,
        handleCategory,
        handleAccept,
        handleRemove
    }
) => {

    return (
        <div>
            <Tabs fill defaultActiveKey="categories" id="admin-profile">
                <Tab eventKey="categories" title="Categories">
                    <CategoriesInfo
                        categoryparent={categoryparent}
                        categories={categories}
                        handleCategory={handleCategory} />
                </Tab>
                <Tab eventKey="suggestions" title="Suggestions">
                    <SuggestionList
                        suggestions={suggestions}
                        handleAccept={handleAccept}
                        handleRemove={handleRemove} />
                </Tab>
            </Tabs>
        </div>
    )
}

export default AdminProfile