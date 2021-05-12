import React, { FunctionComponent, useContext } from 'react'
import { Tab, Tabs } from 'react-bootstrap'

import { CategoryAdminStore } from '../../../contexts/CategoryAdminContext'
import CredentialsContext from '../../../contexts/CredentialsContext'
import CategoriesInfo from './CategoriesInfo'
import SuggestionList from './SuggestionList'

interface AdminProfileProps {

}

const AdminProfile: FunctionComponent<AdminProfileProps> = () => {

    const credentials = useContext(CredentialsContext);

    if (!credentials.token)
        return ( 
            <div style={{textAlign: 'center'}}>
                <h1>
                    Please Login or Register
                </h1>
            </div> 
        )

    return (
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
    )
}

export default AdminProfile