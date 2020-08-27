const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

const Users = require("../users/users-model.js");
const validate = require("../api/validate.js");


router.post("/register",validate.register,(req,res) => {
    const creds = req.body
    const hash = bcrypt.hashSync(creds.password, 14)
    creds.password = hash
    Users.register(creds)
        .then(added => {
            if(added && bcrypt.hashSync(creds.password, added.password)){
                const token = generateToken(added)
                const user = added[0]
                res.status(201).json({ message: `${creds.username} is logged in!`,
                    token, user
                })
            } else {
                res.status(401).json({errormessage: "You shall not pass!"})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'You did not create a user'})
        })
});

router.post('/login', validate.login,(req,res) => {
    const body = req.body
    Users.findByEmail(body.email)
        .then(user => {
            if(user && bcrypt.hashSync(body.password, user.password)){
                const token = generateToken(user)
                res.status(200).json({ message: "You are logged in!",
                    token, user
                })
            } else {
                res.status(401).json({errormessage: "You shall not pass!"})
            }
        })
        .catch(err => {
            res.status(500).json({ errormessage: "Could not get the user", err})
        })
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role,
        created_at: Date.now()
    };

    const options = {
        expiresIn: "3h",
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
};

router.put('/:id', validate.loggedon,(req,res)=>{
    const { id } = req.params
    const body = req.body
    Users.update(body, id)
        .then(changes => 
            res.status(201).json(changes))
});

router.delete("/:id", validate.loggedon, (req,res)=>{
    const { id } = req.params
    Users.remove(id)
        .then(num =>
            res.status(200).json({ message:`${num} member was deleted`}))
        .catch(err =>
            res.status(404).json({ errormessage: "This member was not deleted"}))
});

router.get('/search', (req,res)=> {
    const body = req.body
    Users.search(body)
        .then(volunteers =>{
            res.status(201).json(volunteers)})
})


module.exports = router;