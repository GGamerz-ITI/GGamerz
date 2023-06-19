const express = require('express');
const cors = require('cors');
const path = require("path");
const { Sequelize } = require('sequelize');

const app = express();

//enable parsing of json object in the body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


// Connecting to Database
const connectDB = require(path.join(__dirname, "./db"));
connectDB();

// Required For Routers
const UserRouter = require(path.join(__dirname ,"./routers/UserRouter"));
const CartRouter = require(path.join(__dirname ,"./routers/CartRouter"));
const OrderRouter = require(path.join(__dirname ,"./routers/OrderRouter"));
const CouponRouter = require(path.join(__dirname ,"./routers/CouponRouter"));

// Routers
app.use('/api/users',UserRouter);
app.use('/api/cart',CartRouter);
app.use('/api/order',OrderRouter);
app.use('/api/coupons',CouponRouter);


// Start the server
const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
