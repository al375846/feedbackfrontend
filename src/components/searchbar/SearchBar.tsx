import React from "react"

interface SearchState {
    search: string;
 }

interface SearchProps {
    onSubmit: Function
}

class SearchBar extends React.Component<SearchProps, SearchState> {
    
    constructor(props: SearchProps) {
        super(props)
        this.state = {search: ''}
    }
    
    onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        this.setState({search: event.target.value})
    }

    onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        this.props.onSubmit(this.state.search)
    }

    render() {
        return (
            <div className="ui segment">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                    <label>Search</label>
                    <input type="text" value={this.state.search} onChange={this.onInputChange}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar