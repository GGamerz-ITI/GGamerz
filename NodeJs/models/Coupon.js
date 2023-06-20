module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define('Coupon', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      allowNull: false,
      type: DataTypes.DECIMAL
    }, 
    points: {
      type: DataTypes.INTEGER
    },
    expDate: {
      type: DataTypes.DATE
    }
  }, {});
  Coupon.associate = function (models) {
    // associations can be defined here

    Coupon.hasMany(models.Order, {
      foreignKey: {
        name: 'couponId',
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  };
  return Coupon;
}