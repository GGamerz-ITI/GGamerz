const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = () => {
    const OrderGame = sequelize.define('OrderGame', {
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {tableName: 'orders-games'});
    OrderGame.associate = function (models) {
        
    };
    return OrderGame;
}