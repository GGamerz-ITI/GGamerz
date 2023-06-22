module.exports = (sequelize, DataTypes)=>{

    const Review = sequelize.define('Review', {
        // Model attributes are defined here
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
      }, {});
    Review.associate = function (models) {
        Review.hasMany(models.Comment, {
            foreignKey: {
              name: 'reviewId',
              allowNull: true,
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
            }
        });
        Review.belongsTo(models.User);
        Review.belongsTo(models.Game);
    };
    return Review;
}