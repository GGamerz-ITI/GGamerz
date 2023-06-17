const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = () => {
    const Review = sequelize.define('Review', {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {});

    Review.associate = function (models) {
        
        Review.hasMany(models.Comment, {
            foreignKey: {
                name: 'reviewId',
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
        });
        Review.belongsTo(models.User);
        Review.belongsTo(models.Game);

    };
    return Review;
}