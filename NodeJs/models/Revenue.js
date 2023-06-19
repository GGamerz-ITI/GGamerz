module.exports = (sequelize, DataTypes)=>{
    const Revenue = sequelize.define('Revenue', {
        name:{
            type: DataTypes.STRING
          },
          price:{
            type: DataTypes.DECIMAL
          },
          tags:{
            type: DataTypes.JSON
          },
    }, {});

    return Revenue;
}