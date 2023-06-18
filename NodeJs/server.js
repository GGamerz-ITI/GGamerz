const express = require('express');
const cors = require('cors');
const path = require("path");

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

// Routers
app.use('/api/users',UserRouter);


