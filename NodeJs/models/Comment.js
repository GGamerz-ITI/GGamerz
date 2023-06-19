module.exports = (sequelize, DataTypes)=>{
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