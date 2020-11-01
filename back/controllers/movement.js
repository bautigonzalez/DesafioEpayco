const { Movement} = require("../models/index")

const movementController = {
    find(req, res){
        Movement.find({$or: [{ from: req.body.user }, { to: req.body.user}]})
        .then(movements=>res.json(movements))
    }
}

module.exports = movementController;