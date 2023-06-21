module.exports = (sequelize, DataTypes)=>{
    const ResetPasswordToken = sequelize.define('ResetPasswordToken', {
        // Model attributes are defined here
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          token: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          expiryDate: {
            type: DataTypes.DATE,
            allowNull: false,
          },
      }, {tableName: 'ResetPasswordTokens'});
      ResetPasswordToken.associate = function(models) {
        // associations can be defined here
        ResetPasswordToken.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
                }
          });
      };
      return ResetPasswordToken;
}