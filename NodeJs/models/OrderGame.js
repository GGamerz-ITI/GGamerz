module.exports = (sequelize, DataTypes)=>{
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