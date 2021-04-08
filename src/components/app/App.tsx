import React from "react"

interface AppState {
    token: string,
 }

interface AppProps {
}

export interface Publication {
    id: number,
    title: string,
    category: {name: string},
    description: string,
    tags: Array<string>,
    video: Array<string>,
    document: Array<string>,
    images: Array<string>,
    apprentice: {username: string},
    date: Date
}

class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props)
        this.state = {
            token: '',
        }
    }

    render() {
        return (
            <div className="ui container">
                App
            </div>
        )
    }
}

export default App