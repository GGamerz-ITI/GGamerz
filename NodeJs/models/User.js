module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define('User', {
        // Model attributes are defined here
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },      
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        emailVerifiedAt: {
          type: DataTypes.DATE,
          allowNull: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        discord: {
          type: DataTypes.STRING,
          allowNull: true
        },
        points:{
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'user',
        },
        bgColor: {
          type: DataTypes.STRING,
          defaultValue : "rgba(112, 192, 219, 0.527)",
        },
        character: {
          type: DataTypes.STRING,
          defaultValue : "https://res.cloudinary.com/ds5puha49/image/upload/v1687129084/PkBYcGy_jz4ta4.png",
        },
        level: {
          type: DataTypes.STRING,
          defaultValue : "https://res.cloudinary.com/ds5puha49/image/upload/v1687129775/6009637_ow81gz.png",
        },
        isBanned: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        preferences:{
          type: DataTypes.JSON,
          allowNull: true
        }
      }, {});
      User.associate = function(models) {
        // associations can be defined here
        User.hasMany(models.Order, {
          foreignKey: {
            name: 'userId',
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        });
    
        User.hasMany(models.Review, {
            foreignKey: {
              name: 'userId',
              allowNull: false,
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
            }
        });

        User.hasMany(models.Comment, {
            foreignKey: {
              name: 'userId',
              allowNull: false,
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
            }
        });

        User.belongsToMany(models.Game,{
          foreignKey: {
            name: "userId",
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
            },
          through: models.Cart
        });
    
        User.belongsToMany(models.User,{
          foreignKey: {
            name: "userId",
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
            },
          as: 'followers', // people Who follow me
          through: models.Follower
        });

        User.belongsToMany(models.User,{
          foreignKey: {
            name: "followingId",
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
            },
          as: 'following', // People I follow them
          through: models.Follower
        });
      };
      return User;
}