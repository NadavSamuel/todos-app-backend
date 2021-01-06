const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {updateTodo,addTodo, getTodos, deleteTodo,getTodo} = require('./todos.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', requireAuth,getTodos)
router.get('/:id', getTodo)
// router.post('/',  requireAuth, addTodo)
router.post('/',requireAuth, addTodo)
router.put('/',requireAuth, updateTodo)
router.delete('/:id',requireAuth, deleteTodo)
// router.delete('/:id',  requireAuth, deleteReview)

module.exports = router