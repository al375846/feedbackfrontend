import React from 'react'
import { CategoryAdminStore } from '../../../contexts/CategoryAdminContext'
import AdminProfileDataContainer from './AdminProfileDataContainer'
import CreateCategoryDataContainer from './CreateCategoryDataContainer'

const AdminScreen = () => {
    return (
        <CategoryAdminStore>
            <AdminProfileDataContainer />
            <CreateCategoryDataContainer />
        </CategoryAdminStore>
    )
}

export default AdminScreen
