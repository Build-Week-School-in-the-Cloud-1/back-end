const Users = require("../users/users-model.js");
const bcrypt = require("bcryptjs");
const secrets = require('../config/secrets.js')
const jwt = require('jsonwebtoken')

module.exports = {
    user: (req, res, next) => {
        const { id } = req.params;

        Users.findById(id)
            .then(user => {
                if(user) {
                    req.user = user;
                    next();
                } else {
                    next({ code: 404, message: "User not found!" });
                }
            })
            .catch(err => next({ code: 500, message: "Error retrieving user data.", err }));
    },

    register: (req, res, next) => {
        const user = req.body;

        if(!(user.fname && user.lname && user.email && user.username && user.password && user.country && user.role)) {
            next({ code: 400, message: "Missing required data: First Name, Last Name, Email, Username, Password" });
        } else {
            next();
        }
    },
    
    login: (req, res, next) => {
        const {username, password } = req.body;

        if(!(username && password)) {
            next({ code: 400, message: "Missing required data: Username, Password" });
        } else {
            Users.findBy({ username })
                .then(user => {
                    if(user && bcrypt.compareSync(password, user.password)){
                        req.user = user;
                        next();
                    } else {
                        next({ code: 401, message: "Username and/or Password incorrect!" });
                    }
                })
                .catch(err => next({ code: 500, message: "Error retrieving user data", err }));
        }
    },
    
    loggedon: (req, res, next) => {
        const {authorization} = req.headers;
        const secret = secrets.jwtSecret ;

    if (authorization){
        jwt.verify(authorization, secret, (err, decodedToken) => {
            if(err){
                 res.status(401).json({ message: "You cannot edit this users information."})
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ message: "You shall not pass."})
    }
    }
}