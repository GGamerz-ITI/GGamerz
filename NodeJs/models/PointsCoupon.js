const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = ()=>{
    const PointsCoupon = sequelize.define('PointsCoupon', {
        // Model attributes are defined here
          points: {
            allowNull: false,
            type: DataTypes.INTEGER 
          }
      }, {tableName: 'Points-coupons'});
      PointsCoupon.associate = function(models) {
        // associations can be defined here
        PointsCoupon.belongsTo(models.Coupon);
      };
      return PointsCoupon;
}