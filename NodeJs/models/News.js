module.exports = (sequelize, DataTypes) => {
    const News = sequelize.define('News', {
        content:{
            type: DataTypes.STRING,
            allowNull: false,
    
          },
          title:{
            type: DataTypes.STRING,
            allowNull: false,
    
          }
    })
    return News;
}