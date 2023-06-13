const { Sequelize } = require('sequelize');
require('dotenv').config({path: __dirname + '/.env'})

const connectDB = async ()=>{
    const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: process.env.DIALECT
      });
    
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connectDB;