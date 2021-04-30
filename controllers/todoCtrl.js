const Todos = require('../models/todoModel')

const todoCtrl = {
    getTodos: async (req, res) =>{
        try {
            const todos = await Todos.find({user_id: req.user.id})
            res.json(todos)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createTodo: async(req, res) =>{
        try {
            const {title, content, date} = req.body;
            const newTodo = new Todos({
                title,
                content,
                date,
                user_id: req.user.id,
                name: req.user.name
            })
            await newTodo.save()
            res.json({msg: "Created a Todo"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteTodo: async(req, res) =>{
        try {
            await Todos.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Todo"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateTodo: async(req, res) =>{
        try {
            const {title, content, date} = req.body;
            await Todos.findOneAndUpdate({_id: req.params.id},{
                title,
                content,
                date
            })
            res.json({msg: "Updated a Todo"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getTodo: async(req, res) => {
        try {
            const todo = await Todos.findById(req.params.id)
            res.json(todo)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = todoCtrl