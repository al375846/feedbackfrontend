import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { CategoryAdminStore } from '../../../contexts/CategoryAdminContext'
import CategoriesInfo from './CategoriesInfo'
import SuggestionList from './SuggestionList'

const AdminProfile = () => {
    return (
        <div>
            <div>
            <CategoryAdminStore>
            <Tabs fill defaultActiveKey="categories" id="admin-profile">
                <Tab eventKey="categories" title="Categories">
                    <CategoriesInfo />
                </Tab>
                <Tab eventKey="suggestions" title="Suggestions">
                    <SuggestionList />
                </Tab>
            </Tabs>
            </CategoryAdminStore>
            </div>
        </div>
    )
}

export default AdminProfile