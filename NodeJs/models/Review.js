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
    };
    return Review;
}