
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('todo')
    try {
        const currUserTodos = await collection.find(criteria).toArray();
        return currUserTodos;
    } catch (err) {
        console.log('ERROR: cannot find todos')
        throw err;
    }
}
async function getById(todoId) {
    const collection = await dbService.getCollection('todo')
    try {
        const todo = await collection.findOne({ "_id": ObjectId(todoId) })
        return todo
    } catch (err) {
        console.log(`ERROR: while finding todo ${todoId}`)
        throw err;
    }
}

async function remove(todoId) {
    const collection = await dbService.getCollection('todo')
    try {
        await collection.deleteOne({ "_id": ObjectId(todoId) });
        console.log('collection is, ',collection)
    } catch (err) {
        console.log(`ERROR: cannot remove todo ${todoId}`);
        throw err;
    }
}
async function update(todo,byUser) {
    const collection = await dbService.getCollection('todo');
    todo._id = ObjectId(todo._id);
    try {
        delete todo.lastUpdated
        await collection.updateOne({ 'byUser':byUser,'_id': todo._id }, { $currentDate:{'lastUpdated':true}, $set: todo },{upsert:true})
        return todo;
    } catch (err) {
        console.log(`ERROR: cannot update todo ${todo._id}`);
        throw err;
    }
}


async function add(todo,byUser) {
    const collection = await dbService.getCollection('todo');
    try {
        todo.created = new Date(Date.now()).toISOString();
        todo.byUser= byUser
        await collection.insertOne(todo);
        return todo;
    } catch (err) {
        console.log(`ERROR: cannot insert todo`)
        throw err;
    }
}

function _buildCriteria({byUser,title = ''}) {
    const criteria = {
        title:new RegExp(title,'i'),
        byUser
    };
    return criteria;
}

module.exports = {
    query,
    remove,
    add,
    update,
    getById
}


