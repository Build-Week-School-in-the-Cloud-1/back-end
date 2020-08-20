const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

const Users = require("../users/users-model.js");
const validate = require("../api/validate.js");


router.post("/register",(req,res) => {
    const creds = req.body
    const hash = bcrypt.hashSync(creds.password, 14)
    creds.password = hash
    Users.register(creds)
        .then(added => {
            if(added && bcrypt.hashSync(creds.password, added.password)){
                const token = generateToken(added)
                // req.session.added = added;
                res.status(200).json({ message: `${added.username} is logged in!`,
                    token
                })
            } else {
                res.status(401).json({errormessage: "You shall not pass!"})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'You did not create a user'})
        })
  })

  router.post('/login', validate.login,(req,res) => {
    const body = req.body
    Users.asyncFindBy(body)
        .then(user => {
            console.log(user)
            if(user && bcrypt.hashSync(body.password, user.password)){
                const token = generateToken(user)
                res.status(200).json({ message: `${body.username} is logged in!`,
                    token
                })
            } else {
                res.status(401).json({errormessage: "You shall not pass!"})
            }
        })
        .catch(err => {
            res.status(500).json({ errormessage: "Could not get the user", err})
        })
  })

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        created_at: Date.now()
    };

    const options = {
        expiresIn: "3h",
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
}

router.get("/:id", (req,res, next) => {
    const { id } = params
    Users.findById(id)
        .then(user => 
            res.status(200).json(user))
        .catch(err => 
            res.status(500).json({error: "Could not get user", err}))
})

module.exports = router;