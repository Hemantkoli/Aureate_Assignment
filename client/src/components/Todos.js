import React from 'react'
import Header from './todos/Nav'
import Home from './todos/Home'
import CreateTodo from './todos/CreateTodo'
import EditTodo from './todos/EditTodo'
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default function Notes({setIsLogin}) {
    return (
        <Router>
        <div className="notes-page">
            <Header setIsLogin={setIsLogin} />
            <section>
                <Route path="/" component={Home} exact />
                <Route path="/create" component={CreateTodo} exact />
                <Route path="/edit/:id" component={EditTodo} exact />
            </section>
            
        </div>
        </Router>
    )
}
