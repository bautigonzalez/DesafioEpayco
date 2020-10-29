const { User, Wallet} = require("../models/index")

const userController = {
    findAll(req, res){
        User.find().populate("wallet")
        .then(users=>res.json(users))
    },
    register(req, res){
        User.create(req.body)
        .then((user)=>Wallet.create({user: user}))
        .then((wallet)=>User.findByIdAndUpdate({_id: wallet.user._id}, {wallet: wallet}))
        .then((user)=>User.findById(user._id))
        .then((user)=>res.json(user))
    },
    login(req, res){
        res.json(req.user)
    },
    logout(req, res){
        req.logout();
        res.sendStatus(200)
    },
    check(req, res){
        res.json(req.user);
    }
}

module.exports = userController;