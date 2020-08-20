const db = require("../data/dbConfig.js");

module.exports = {
    findAll,
    findBy,
    asyncFindBy,
    findById,
    register,
    update,
    remove
};

function findAll() {
    return db("users");
}

function findBy(filter) {
    return db("users").where(filter).first();
}
 function asyncFindBy(filtered){
    return db('users').where(filtered)
}

function findById(user) {
    return db("users").where({id: user}).first();
}

async function register(user) {
    const [id] = await db('users').insert(user).returning('id')
    return findById(id)
 }

function update(changes, id) {
    return db("users").where({ id: id }).update(changes).then(() => findById(id));
}

function remove(user) {
    return db("users").where({id: user}).del();
}

