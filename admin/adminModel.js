const db = require("../data/dbConfig.js");

module.exports = {
    findAll,
    assign,
    edit,
    remove
};

function findAll(){
    return db('volunteer_tasks')
}

function findById(id){
    return db("volunteer_tasks").where({id:id})
}

async function assign(task) {
    const [id] = await db("volunteer_tasks").insert(task).returning('id')
    return findById(id)
 }

function edit(changes, userId) {
    return db("volunteer_tasks").where({ id: userId }).update(changes)
        .then(() => findById(userId));
}

function remove(userId) {
    return db("volunteer_tasks").where({id: userId}).del();
}

