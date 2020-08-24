const db = require("../data/dbConfig.js");

module.exports = {
    findAll,
    findByEmail,
    findById,
    register,
    update,
    remove
};

function findAll() {
    return db("users");
}

function findByEmail(filter) {
    return db("users").where({email:filter}).first();
}

async function findById(user) {
     await await db("users").where({id: user});
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

