const { User, Wallet} = require("../models/index")

const walletController = {
   charge(req, res){
    Wallet.findById(req.body.walletId)
    .then((wallet)=>Wallet.findByIdAndUpdate({_id: req.body.walletId}, {value: Number(wallet.value) + Number(req.body.charge) }))
    .then(()=>Wallet.findById(req.body.walletId))
    .then(wallet=>res.status(201).json(wallet))
    .catch(error => res.status(400).json({ error: error.toString() }))
   },
   value(req, res){
      Wallet.findById(req.body.walletId)
      .then(wallet => res.json(wallet))
   }
}

module.exports = walletController;