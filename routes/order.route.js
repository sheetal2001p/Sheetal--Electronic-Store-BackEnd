const express = require("express");

const router = express.Router();

const {placeOrder,myOrders,getallOrders,deleteOrder} = require("../controllers/order.controller");

const {auth} = require("../middleware/auth");

router.post("/placeorder",auth,placeOrder);

router.get("/myOrders",auth,myOrders);

router.get("/getallOrders",getallOrders);

router.delete("/deleteOrder/:id",deleteOrder);


module.exports = router;