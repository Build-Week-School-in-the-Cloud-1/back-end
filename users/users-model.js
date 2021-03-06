const db = require("../data/dbConfig.js");

module.exports = {
    findAll,
    findByEmail,
    findById,
    register,
    update,
    search,
    remove
};

function findAll() {
    return db("users");
}

function findByEmail(filter) {
    return db("users").where({email:filter}).first();
}

function findById(user) {
    return db("users").where({id: user});
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

function search(query) {
    const userRole = query.role
    const userSkill = query.skill
    const userCountry = query.country
    return db('users').where({role: userRole, skill: userSkill, country: userCountry})
}

