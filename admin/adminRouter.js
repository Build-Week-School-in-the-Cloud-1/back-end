const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const secrets = require("../config/secrets.js");

const AM = require("./adminModel.js");
// const validate = require("../api/validate.js");

router.get('/', (req,res)=> {
    AM.findAll()
        .then(assignments =>
            res.status(201).json(assignments))
        .catch(err => 
            res.status(500).json({ errormessage: "Error retrieving assignments", err }));
})

router.post("/",(req,res) => {
    const body = req.body
    AM.assign(body)
        .then(added => {
            res.status(201).json(body)})
        .catch(err => {
            res.status(500).json({errormessage: 'Creating a task for a volunteer failed.', err})
        })
  })

  router.put('/:id', (req,res) => {
      const {id} = req.params;
      const body = req.body;
      console.log("body and id @ adminROuter", id, body)
    AM.edit(id,body)
        .then(assignment => {
            res.status(201).json(body)})
        .catch(err => {
            res.status(500).json({ errormessage: "Could not edit the assignment", err})
        })
  })

router.delete("/:id", (req,res)=>{
    const { id } = req.params
    AM.remove(id)
        .then(num =>
            res.status(200).json({ message:`${num} assignment was deleted`}))
        .catch(err =>
            res.status(404).json({ errormessage: "This asssignment was not deleted"}))
})



module.exports = router;