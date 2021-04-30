const router = require('express').Router()
const auth = require('../middleware/auth')
const todoCtrl = require('../controllers/todoCtrl')

router.route('/')
    .get(auth, todoCtrl.getTodos)
    .post(auth, todoCtrl.createTodo)

router.route('/:id')
    .get(auth, todoCtrl.getTodo)
    .put(auth, todoCtrl.updateTodo)
    .delete(auth, todoCtrl.deleteTodo)


module.exports = router