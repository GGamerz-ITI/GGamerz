module.exports = (sequelize, DataTypes)=>{
    const PointsCoupon = sequelize.define('PointsCoupon', {
        // Model attributes are defined here
          points: {
            allowNull: false,
            type: DataTypes.INTEGER 
          }
      }, {tableName: 'points-coupons'});
      PointsCoupon.associate = function(models) {
        // associations can be defined here
        PointsCoupon.belongsTo(models.Coupon);
      };
      return PointsCoupon;
}