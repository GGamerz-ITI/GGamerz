module.exports = (sequelize, DataTypes)=>{
    const VerificationToken = sequelize.define('VerificationToken', {
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
      }, {tableName: 'VerificationTokens'});
      VerificationToken.associate = function(models) {
        // associations can be defined here
        VerificationToken.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
                }
          });
      };
      return VerificationToken;
}