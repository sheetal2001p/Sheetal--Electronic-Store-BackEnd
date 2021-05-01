const express = require("express");

const app = express();

require('dotenv').config();

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const cors = require("cors");

const  userRoutes = require("./routes/user.route");

const  productRoutes = require("./routes/products.route");

const  orderRoutes = require("./routes/order.route");

const  wishlistRoutes = require("./routes/wishlist.routes");

const port = process.env.PORT;
const url = process.env.DB_URL;

app.use(cors());

app.use(bodyParser.json());

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(wishlistRoutes);

const connect = async () => {
    try {
        const connection = await mongoose.connect(url,
            { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected");
    }

    catch (err) {
        console.log("some err occured");
        console.log("err:", err);
    }

};
connect();


app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});
