import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export default function EditTodo({match}) {
    const [todo, setTodo] = useState({
        title: '',
        content: '',
        date: '',
        id: ''
    })
    const history = useHistory()

    useEffect(() =>{
        const getTodo = async () =>{
            const token = localStorage.getItem('tokenStore')
            if(match.params.id){
                const res = await axios.get(`/api/todos/${match.params.id}`, {
                    headers: {Authorization: token}
                })
                setTodo({
                    title: res.data.title,
                    content: res.data.content,
                    date: new Date(res.data.date).toLocaleDateString(),
                    id: res.data._id
                })
            }
        }
        getTodo()
    },[match.params.id])

    const onChangeInput = e => {
        const {name, value} = e.target;
        setTodo({...todo, [name]:value})
    }


    const editTodo = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title, content, date, id} = todo;
                const newTodo = {
                    title, content, date
                }

                await axios.put(`/api/todos/${id}`, newTodo, {
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
            <h2>Edit Task</h2>
            <form onSubmit={editTodo} autoComplete="off">
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
