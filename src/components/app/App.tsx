import React from "react"
import { Publication } from "../../entities/Publication"
import PublicationList from "../publications/PublicationList"
import SearchBar from "../searchbar/SearchBar"
import api from '../../api/Api'

interface AppState {
    token: string,
    publications: Array<Publication>
 }

interface AppProps {
}

class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props)
        this.state = {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MTc4Nzc3ODQsImV4cCI6MTYxNzg4MTM4NCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiY2FybG9zbW8ifQ.EOfBxZyo-u6YzwfjY-Ha9H-Z9Wulg0DdqBKWfNHc9Udb3h4JN_IKRbg07P6zfy4XQWWxK3XsHoQUxEVcbhxEkmshfivhT8r3FjOkhE1gdc5UZuNbh3O9lZaXAo8TEM6BIOe_VO9EO3FUED4UIE4vKYxUI6pe5iH331U7rm4it5cyP5PXtTAhKZxQJcgAZDmxEJcpVLfRl3Iqqv-nuSAo9wWTYpB-No2bdB4j-80bZziBzoCGEngemHa7ygvdgTpEgGSSa5SJt-FLQ7mLFc60L1Iu11pQexpkiCR9bWAH7nTHS6Sg1kcAzJgx0qh6tdOKd9-lXGEQ6uaBo0vpXY1qeaeUoiLWaDbl7Ss6zh9IMV_ar8NkysBE3YKLL6VgBS9hARKdDt2g7gKtZePQWI4iVAzJ5D1_aAg2Dchs_uppQuBi_TVn1o6wcr0pP_HSjhs02wTxGC2gWDL7IKppW2c1atuvVXahI2m_S96SAh80_-E_raZGcbNvYlYHjHJMRD-LRJBh_D-6GwbVvoDuh4Sh5jfqaWdXEm__lnnvyz4RiWk-FrNf-kFLvcoSM_nnmfHxAc8aTU0xeE83FIDYvOGBQVxSbs_GhKkPfnj_MmqceXQHdmCTHu3yJBpcdGSN8TAjBcxNxeSYOh3YxuAYLuvWpElZDRVBLvIjHrewh5iSavU',
            publications: []
        }
    }

    onSearchSubmit = async (term: string) => {
        const res = await api.get('/api/publication', {
            params: {filter: term},
            headers: {
                Authorization: `Bearer ${this.state.token}`
            }
        })
        this.setState({publications: res.data.publications})
    }

    componentDidMount = async () => {
        const res = await api.get('/api/publication', {
            headers: {
                Authorization: `Bearer ${this.state.token}`
            }
        })
        this.setState({publications: res.data.publications})
    }

    render() {
        return (
            <div className="ui container" style={{marginTop: '10px'}}>
                <SearchBar onSubmit={this.onSearchSubmit}/>
                <PublicationList publications={this.state.publications}/>
            </div>
        )
    }
}

export default App