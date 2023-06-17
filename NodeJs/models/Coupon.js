const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = ()=>{
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
          expDate:{
            type: DataTypes.DATE
          }
      }, {});
      Coupon.associate = function(models) {
        // associations can be defined here

        Coupon.hasMany(models.Order, {
            foreignKey: {
              name: 'couponId',
              allowNull: false,
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
            }
          });


          ///////////////
          Coupon.hasOne(models.PointsCoupon,{
            foreignKey: {
                name: "couponId",
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
          })
          ////////////////
      };
      return Coupon;
}