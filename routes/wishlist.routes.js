const express = require("express");

const router = express.Router();

const {addtowishlist,mywishlist,deletewishitem} = require("../controllers/wishlist.controller");

const {auth} = require("../middleware/auth");

router.post("/addtowishlist",auth,addtowishlist);

router.get("/mywishlist",auth,mywishlist);

router.delete("/deletefromWishlist/:id",deletewishitem);


module.exports = router;