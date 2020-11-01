const { User, Wallet, Movement} = require("../models/index")
const nodemailer = require("nodemailer")

const userController = {
    findAll(req, res){
        User.find().populate("wallet")
        .then(users=>res.json(users))
    },
    register(req, res){
        User.create(req.body)
        .then((user)=>Wallet.create({user: user}))
        .then((wallet)=>User.findByIdAndUpdate({_id: wallet.user._id}, {wallet: wallet}))
        .then((user)=>{
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: process.env.EMAIL || "desafioepayco@gmail.com",
                  pass: process.env.PASSWORD || "ePayco123",
                },
              })
       
             const mailOptions = {
                from: process.env.EMAIL || "desafiepayco@gmail.com",
                to: req.body.email,
                subject: "Bienvenido a ePayco",
                html:
                  `<h1>Bienvenido, ${req.body.name}</h1>
                  <img src="https://i.ibb.co/nq2jz8W/logoepayco-1.png"/>
                  `,
              };
       
             transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                 console.log(error)
                } else {
                  console.log("Email sent")
                }
              })

            return User.findById(user._id)
        })
        .then((user)=>res.json(user))
        .catch(e=>res.sendStatus(400))
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