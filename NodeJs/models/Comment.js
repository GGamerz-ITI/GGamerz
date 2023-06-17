const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = () => {
    const Comment = sequelize.define('Comment', {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {});

    Comment.associate = function (models) {

        Comment.belongsTo(models.User);
        Comment.belongsTo(models.Review);

    };
    return Comment;
}