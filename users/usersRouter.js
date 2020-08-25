const router = require("express").Router();
const Users = require("./users-model.js");
const validate = require("../api/validate.js");

router.use("/:id", validate.user);

router.get("/:id", (req, res, next) => {
    const user = req.user;
    res.status(200).json(user);
});

router.put("/:id", validate.loggedon, (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;

    Users.update(changes, id)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(err => next({ code: 500, message: "Error updating user data", err }));
});

router.delete("/:id", validate.loggedon, (req, res, next) => {
    const { id } = req.params;

    Users.remove(id)
        .then(() => res.status(204).end())
        .catch(err => next({ code: 500, message: "Error removing user data", err }));
});

module.exports = router;