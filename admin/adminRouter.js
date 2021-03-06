const router = require("express").Router();
const validate = require('../api/validateRole.js')
const getValid = require('../api/validateRole')

const Users = require('../users/users-model')
const AM = require("./adminModel.js");

router.get('/', validate.admin, (req,res)=> {
    AM.findAll()
        .then(assignments =>
            res.status(201).json(assignments))
        .catch(err => 
            res.status(500).json({ errormessage: "Error retrieving assignments", err }));
});

router.get('/users', getValid.admin,(req,res)=> {
    Users.findAll()
        .then(users => {
            res.status(201).json(users)
        })
})

router.post("/", validate.admin,(req,res) => {
    const body = req.body
    AM.assign(body)
        .then(added => {
            console.log(added)
            res.status(201).json(added[0])})
        .catch(err => {
            res.status(500).json({errormessage: 'Creating a task for a volunteer failed.', err})
        })
});

router.put('/:id', validate.admin, (req,res) => {
    const {id} = req.params;
    const body = req.body;
    AM.edit(id,body)
        .then(assignment => {
            res.status(201).json(body)})
        .catch(err => {
            res.status(500).json({ errormessage: "Could not edit the assignment", err})
    })
});

router.delete("/:id", validate.admin, (req,res)=>{
    const { id } = req.params
    AM.remove(id)
        .then(num =>
            res.status(200).json({ message:`${num} assignment was deleted`}))
        .catch(err =>
            res.status(404).json({ errormessage: "This asssignment was not deleted"}))
});



module.exports = router;