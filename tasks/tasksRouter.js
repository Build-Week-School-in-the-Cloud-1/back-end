const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const secrets = require("../config/secrets.js");

const TM = require("./tasksModel.js");
// const validate = require("../api/validate.js");

router.get('/', (req,res)=> {
    TM.findAll()
        .then(tasks =>
            res.status(201).json(tasks))
        .catch(err => 
            res.status(500).json({ errormessage: "Error retrieving tasks", err }));
});

router.post("/",(req,res) => {
    const body = req.body
    TM.addTask(body)
        .then(added => {
            res.status(201).json(added)})
        .catch(err => {
            res.status(500).json({errormessage: 'Creating a task failed.', err})
        })
});

router.put('/:id', (req,res) => {
    const {id} = req.params;
    const body = req.body;
    TM.editTask(id, body)
        .then(task => 
            res.status(201).json(task))
        .catch(err => {
            res.status(500).json({ errormessage: "Could not edit the task", err})
        })
});

router.delete("/:id", (req,res)=>{
    const { id } = req.params
    TM.removeTask(id)
        .then(num =>
            res.status(200).json({ message:`${num} task was deleted`}))
        .catch(err =>
            res.status(404).json({ errormessage: "This task was not deleted"}))
});

module.exports = router;