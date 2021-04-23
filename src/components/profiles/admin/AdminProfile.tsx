import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import CategoriesInfo from './CategoriesInfo'

const AdminProfile = () => {
    return (
        <div>
            <div>
            <Tabs fill defaultActiveKey="categories" id="admin-profile">
                <Tab eventKey="categories" title="Categories">
                    <CategoriesInfo />
                </Tab>
                <Tab eventKey="suggestions" title="Suggestions">
                    
                </Tab>
            </Tabs>
            </div>
        </div>
    )
}

export default AdminProfile