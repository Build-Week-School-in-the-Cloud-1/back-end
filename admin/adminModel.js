const db = require("../data/dbConfig.js");

module.exports = {
    assign,
    findAll,
    findById,
    edit,
    remove
};

async function assign(assignment) {
    const [id] = await db("volunteer_tasks").insert(assignment).returning('id')
    return findById(id)
 }

function findAll(){
    return db('volunteer_tasks')
}

async function findById(assignmentId){
    await db("volunteer_tasks").where({id:assignmentId}).first()
}

function edit(userId,changes) {

    return db("volunteer_tasks").where({ id: userId }).update(changes)
        .then(() => findById(userId));
}

function remove(userId) {
    return db("volunteer_tasks").where({id: userId}).del();
}

