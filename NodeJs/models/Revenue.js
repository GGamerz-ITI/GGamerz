const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = () => {
    const Revenue = sequelize.define('Revenue', {
        name:{
            type: DataTypes.STRING
          },
          price:{
            type: DataTypes.DECIMAL
          },
          tags:{
            type: DataTypes.JSON
          },
    }, {});

    return Revenue;
}