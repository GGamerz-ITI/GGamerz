const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = () => {
    const Follower = sequelize.define('Follower', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        followerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {});
    Follower.associate = function (models) {
        
    };
    return Follower;
}