const { User, Wallet, Movement} = require("../models/index")
const nodemailer = require("nodemailer")
const { findOneAndUpdate } = require("../models/users")

const walletController = {
   charge(req, res){
    Wallet.findById(req.body.walletId)
    .then((wallet)=>Wallet.findByIdAndUpdate({_id: req.body.walletId}, {value: Number(wallet.value) + Number(req.body.charge) }))
    .then((wallet)=>Movement.create({isCharge: true, value: req.body.charge, to: wallet.user}))
    .then(()=>Wallet.findById(req.body.walletId))
    .then(wallet=>res.status(201).json(wallet))
    .catch(error => res.status(400).json({ error: error.toString() }))
   },
   value(req, res){
      Wallet.findById(req.body.walletId)
      .then(wallet => res.json(wallet))
   },
   sendCode(req, res){
      const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
           user: process.env.EMAIL || "desafioepayco@gmail.com",
           pass: process.env.PASSWORD || "ePayco123",
         },
       })

      const mailOptions = {
         from: process.env.EMAIL || "desafiepayco@gmail.com",
         to: "batigonza@gmail.com",
         subject: "Codigo de verificación",
         html:
           `<h1>Codigo de verificación</h1>
           <h3>Su codigo de verificación es ${req.body.code}</h3>
           <img src="https://i.ibb.co/nq2jz8W/logoepayco-1.png"/>
           `,
       };

      transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
          console.log(error)
          return res.sendStatus(400)
         } else {
           console.log("Email sent")
           return res.sendStatus(200)
         }
       })
   },
   pay(req, res){
      Wallet.findById(req.body.walletId)
      .then((wallet)=>{
         if(Number(wallet.value) - Number(req.body.charge) >= 0 ){ 
         return Wallet.findByIdAndUpdate({_id: req.body.walletId}, {value: Number(wallet.value) - Number(req.body.charge) }) 
         }
         throw new Error(400);
      })
      .then(()=>{
         User.findOne({document: req.body.from})
         .then((user)=>{
            const from = user
            User.findOne({document: req.body.to}).populate("wallet")
            .then((user)=>{
               const to = user
               Wallet.findOneAndUpdate({user: to._id}, {value: (Number(to.wallet.value) + Number(req.body.charge)) }) 
               .then(()=>Movement.create({value: req.body.charge, from, to}))
            })
         })
      })
      .then(()=>Wallet.findById(req.body.walletId))
      .then(wallet=>res.status(201).json(wallet))
      .catch(error => res.status(400).json({ error: error.toString() }))
   }
}

module.exports = walletController;