const db = require("../data/dbConfig.js");

module.exports = {
    findAll,
    findById,
    addTask,
    editTask,
    removeTask
};

function findAll(){
    return db('tasks')
};

function findById(taskId){
    return db("tasks").where({id:taskId}).first()
};

async function addTask(task) {
    const [id] = await db("tasks").insert(task).returning('id')
    return findById(id)
};

function editTask(userId, changes) {
    console.log(changes)
    return db("tasks").where({ id: userId }).update(changes)
        .then(() => findById(userId));
};

function removeTask(userId) {
    return db("tasks").where({id: userId}).del();
};

