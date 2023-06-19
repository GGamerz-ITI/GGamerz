module.exports = (sequelize, DataTypes)=>{
    const Order = sequelize.define('Order', {
        // Model attributes are defined here
          total: {
            allowNull: false,
            type: DataTypes.DECIMAL 
          },
          status: {
            allowNull: false,
            type: DataTypes.ENUM,
            values: ['accepted', 'pending', 'rejected'],
            defaultValue: 'pending',
          }
      }, {});
      Order.associate = function(models) {
        // associations can be defined here
        Order.belongsTo(models.User);
        Order.belongsTo(models.Coupon);

        Order.belongsToMany(models.Game,{
          foreignKey: {
            name: "orderId",
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
          through: models.OrderGame
        });

      };
      return Order;
}