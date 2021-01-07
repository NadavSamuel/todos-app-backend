const logger = require('../../services/logger.service')
const todoService = require('./todo.service')

async function getTodos(req, res) {
    try {
        const query = {byUser:req.session.user.username,...req.query}
        const todos = await todoService.query(query)
        res.send(todos)
    } catch (err) {
        console.log('Cannot get todos', err);
        console.log('query sent: ', query);
        console.log('req.byUser sent: ', req.session.user);
        logger.error('Cannot get todos', err);
        logger.error('query sent: ', query);
        logger.error('req.byUser sent: ', req.session.user);
        res.status(500).send({ error: 'cannot get todos',querySent:query})

    }
}
async function getTodo(req, res) {
    const todo = await todoService.getById(req.params.id)
    res.send(todo)
}

async function deleteTodo(req, res) {
    try {
        await todoService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete review', err);
        res.status(500).send({ error: 'cannot delete review' })
    }
}

async function addTodo(req, res) {
    let todo = req.body.todoToSave;
    const byUser = req.session.user.username;
    todo = await todoService.add(todo,byUser)
    res.send(todo)
}
async function updateTodo(req, res) {
    const todo = req.body.todoToSave;
    const byUser = req.session.user.username;
    const updatedTodo = await todoService.update(todo,byUser)
    res.send(updatedTodo)
}
module.exports = {
    getTodos,
    deleteTodo,
    addTodo,
    getTodo,
    updateTodo
}