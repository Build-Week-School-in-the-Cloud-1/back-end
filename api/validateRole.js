const Users = require("../users/users-model.js");
const bcrypt = require("bcryptjs");
const secrets = require('../config/secrets.js')
const jwt = require('jsonwebtoken')

module.exports = {
    admin: (req, res, next) => {
        next();
    },

    volunteer: (req, res, next) => {   
        next();
    },
    
    student: (req, res, next) => {
        next();
    },
    
    
}