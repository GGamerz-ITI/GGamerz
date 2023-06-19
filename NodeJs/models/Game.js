module.exports = (sequelize, DataTypes)=>{
    const Game = sequelize.define('Game', {
        // Model attributes are defined here
        name: {   type: DataTypes.STRING,  
            allowNull: false   }, 
         price: {  allowNull: false,            
                 type: DataTypes.DECIMAL },
         releaseDate: {  type: DataTypes.DATE,  },     
        description: {   type: DataTypes.STRING,      
        allowNull: false         },
        character: { type: DataTypes.STRING,  },      
        images: {  type: DataTypes.JSON    },      
        tags: { type: DataTypes.JSON         },      
        types: {type: DataTypes.JSON         },      
        os: { type: DataTypes.JSON         }
      }, {});
    Game.associate = function (models) {
        
        Game.belongsToMany(models.User, {
            foreignKey: {
                name: 'gameId',
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            through: models.Cart
        });

        Game.hasMany(models.Review, {
            foreignKey: {
                name: 'gameId',
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
        });
        Game.belongsToMany(models.Order, {
            foreignKey: {
                name: 'gameId',
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            through: models.OrderGame
        });
    };
    return Game;
}