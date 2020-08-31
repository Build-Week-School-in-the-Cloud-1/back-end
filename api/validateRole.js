// const Users = require("../users/users-model.js");
// const bcrypt = require("bcryptjs");
// const secrets = require('../config/secrets.js')
// const jwt = require('jsonwebtoken')

module.exports = {
    admin: (req, res, next) => {
        const role = req.jwt.role;
    if (role == "Admin" ){
       next()
    } else {
        res.status(401).json({ message: "You cannot access this function"})
    }},

    volunteer: (req, res, next) => {   
        next();
    },

    taskGet: (req, res, next) => {
        const role = req.jwt.role;
    if (role == "Admin" || "Volunteer" ){
       next()
    } else {
        res.status(401).json({ message: "You cannot access this function"})
    }},

    volunteer: (req, res, next) => {   
        next();
    },
}