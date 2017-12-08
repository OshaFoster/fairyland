const express = require("express");
const expressJwt = require("express-jwt");
const settings = require("../settings.js");
const Admin = require("../models/admin.js");
const orderListRoute = express.Router();
const Order = require("../models/order.js")

const auth = expressJwt({ secret: settings.secret });

orderListRoute.use(auth);

orderListRoute.get("/", (req, res)=>{
  Order.find().populate("items.cupcake").exec((err, orders)=>{
    if (err) return res.status(500).send(err);
    return res.send(orders);
  })
})

orderListRoute.put("/:id", (req, res)=>{
  Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .populate("items.cupcake")
    .exec((err, orders)=>{
        if (err) return res.status(500).send(err);
        return res.send(orders);
    });
});


orderListRoute.route("/verify")
    .get((req, res) => {
        Admin.findById(req.user._id, (err, user) => {
            if(err){
                res.status(500).send({
                    success: false,
                    err
                })
            } else if(user === null){
                res.status(400).send({
                    success: false,
                    err: "User not found!"
                })
            } else {
                res.status(200).send({
                    success: true,
                    user: user.withoutPassword(),
                })
            }
        })
    });


module.exports = orderListRoute;