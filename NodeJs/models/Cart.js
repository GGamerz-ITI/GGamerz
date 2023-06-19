module.exports = (sequelize, DataTypes)=>{
    const Cart = sequelize.define('Cart', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {});
    Cart.associate = function (models) {
        
    };
    return Cart;
}