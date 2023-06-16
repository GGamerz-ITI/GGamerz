const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = ()=>{
    const Order = sequelize.define('Order', {
        // Model attributes are defined here
          total: {
            allowNull: false,
            type: Sequelize.DECIMAL 
          },
          status: {
            allowNull: false,
            type: Sequelize.ENUM,
            values: ['accepted', 'pending', 'rejected'],
            defaultValue: 'pending',
          }
      }, {});
      Order.associate = function(models) {
        // associations can be defined here
        Order.belongsTo(models.User);
        Order.belongsTo(models.Coupon);

        Order.belongsToMany(models.Game,{
          foreignKey: 'orderId',
          through: models.OrderGame
        });

      };
      return Order;
}