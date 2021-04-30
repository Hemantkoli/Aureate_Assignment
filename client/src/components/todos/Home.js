import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {format} from 'timeago.js'
import axios from 'axios'

export default function Home() {
    const [todos, setTodos] = useState([])
    const [token, setToken] = useState('')

    const handleChange=({target})=>{
        if (target.checked){
            //target.removeAttribute('checked');
           //console.log(target.name)
           let temp=document.getElementById(target.name);
           temp.style.textDecoration = "line-through";
           let checkboxes=document.getElementsByClassName(target.className);
           let selected=false;
            for(let i=0;i<checkboxes.length;i++)
            {
               if(checkboxes[i].checked)
               {selected=true;}
               else
               {selected=false;break;}
            }
            if(selected===true)
            {
                let temp=document.getElementById(target.className);
                temp.style.background = "orange";
            }
            
        } else {
          
            //target.addAttribute('checked');
            //console.log(target.name)
            let temp=document.getElementById(target.name);
            temp.style.textDecoration = "";
            let checkboxes=document.getElementsByClassName(target.className);
            let selected=false;
             for(let i=0;i<checkboxes.length;i++)
             {
                if(checkboxes[i].checked)
                {selected=true;}
                else
                {selected=false;break;}
             }
             if(selected===false)
             {
                 let temp=document.getElementById(target.className);
                 temp.style.background = "#07193f";
             }
        }
    }

    const getTodos = async (token) =>{
        const res = await axios.get('api/todos', {
            headers:{Authorization: token}
        })
        setTodos(res.data)
    }

    useEffect(() =>{
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if(token){
            getTodos(token)
        }
    }, [])

    const deleteTodo = async (id) =>{
        try {
            if(token){
                await axios.delete(`api/todos/${id}`, {
                    headers: {Authorization: token}
                })
                getTodos(token)
            }
        } catch (error) {
            window.location.href = "/";
        }
    }

    
    return (
        <div className="note-wrapper">
            {   
                todos.map(todo =>(
                    <div id={todo.title} className="card" key={todo._id}>
                        <h4 title={todo.title}>{todo.title}</h4>
                        <div className="text-wrapper">
                            {
                                todo.content.split("\n").map(itemArray=>(<div key={itemArray}>
                                <label id={`${itemArray}${todo.date}`}>
                                <input type="checkbox"
                                onClick={handleChange}
                                name={`${itemArray}${todo.date}`}
                                className={todo.title}
                                />{` ${itemArray}`}<br /></label></div>))
                            }
                        </div>
                        <div className="card-footer">
                            {todo.name}  
                            <p className="date">{format(todo.date)}</p>
                        </div>
                        <Link className="edit" to={`edit/${todo._id}`} >➕</Link>
                        <button className="close" 
                        onClick={() => deleteTodo(todo._id)} >❌</button>
                    </div>
                ))
            }
            
        </div>
    )
}
