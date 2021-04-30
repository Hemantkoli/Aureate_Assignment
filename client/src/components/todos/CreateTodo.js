import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export default function CreateTodo() {
    const [todo, setTodo] = useState({
        title: '',
        content: '',
        date: ''
    })
    const history = useHistory()

    const onChangeInput = e => {
        const {name, value} = e.target;
        setTodo({...todo, [name]:value})
    }


    const createTodo = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title, content, date} = todo;
                const newTodo = {
                    title, content, date
                }

                await axios.post('/api/todos', newTodo, {
                    headers: {Authorization: token}
                })
                
                return history.push('/')
            }
        } catch (err) {
            window.location.href = "/";
        }
    }

    return (
        <div className="create-note">
            <h2>Create Task</h2>
            <form onSubmit={createTodo} autoComplete="off">
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={todo.title} id="title"
                    name="title" required onChange={onChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Sub Tasks</label>
                    <textarea type="text" value={todo.content} id="content"
                    name="content" required rows="10" onChange={onChangeInput} />
                </div>

                <label htmlFor="date">Date: {todo.date} </label>
                <div className="row">
                    <input type="date" id="date"
                    name="date" onChange={onChangeInput} />
                </div>

                <button type="submit">Save</button>
            </form>
        </div>
    )
}
