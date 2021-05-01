const express = require("express");

const router = express.Router();

const {addproducts,getproducts,deleteproduct,updateproduct} = require("../controllers/products.controller");

const {auth} = require("../middleware/auth");

router.post("/addProduct",addproducts);
router.get("/getProducts",getproducts)
router.delete("/deleteProduct/:id",deleteproduct);
router.put("/updateProduct/:id",updateproduct);


module.exports = router;