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
const ProductRouter = require(path.join(__dirname ,"./routers/ProductRouter"));
const UserStatsRouter = require(path.join(__dirname ,"./routers/UserStatsRouter"));
const FollowRouter = require(path.join(__dirname ,"./routers/FollowRouter"));
const CartRouter = require(path.join(__dirname ,"./routers/CartRouter"));
const OrderRouter = require(path.join(__dirname ,"./routers/OrderRouter"));
const CouponRouter = require(path.join(__dirname ,"./routers/CouponRouter"));
const PaymentRouter = require(path.join(__dirname, "./routers/PaymentRouter"))
const NewsRouter = require(path.join(__dirname, "./routers/NewsRouter"))

// Routers
app.use('/api/products',ProductRouter);
app.use('/api/reviews',ReviewRouter);
app.use('/api/users',UserRouter);
app.use('/api/stats',UserStatsRouter);
app.use('/api/cart',CartRouter);
app.use('/api/order',OrderRouter);
app.use('/api/comments',CommentRouter);
app.use('/api/coupons',CouponRouter);
app.use('/api/community',FollowRouter);
app.use("/api/payment", PaymentRouter);
app.use("/api/news", NewsRouter);

// Start the server
const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
