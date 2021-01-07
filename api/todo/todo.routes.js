const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {updateTodo,addTodo, getTodos, deleteTodo,getTodo} = require('./todos.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/',getTodos)
router.get('/:id', getTodo)
// router.post('/',  requireAuth, addTodo)
router.post('/', addTodo)
router.put('/', updateTodo)
router.delete('/:id', deleteTodo)
// router.delete('/:id',  requireAuth, deleteReview)

module.exports = router