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
const ReviewRouter = require(path.join(__dirname ,"./routers/ReviewRouter"));
const CommentRouter = require(path.join(__dirname ,"./routers/CommentRouter"));
const CartRouter = require(path.join(__dirname ,"./routers/CartRouter"));
const CouponRouter = require(path.join(__dirname ,"./routers/CouponRouter"));

// Routers
app.use('/api/reviews',ReviewRouter);
app.use('/api/users',UserRouter);
app.use('/api/cart',CartRouter);
app.use('/api/comments',CommentRouter);
app.use('/api/coupons',CouponRouter);


// Start the server
const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
