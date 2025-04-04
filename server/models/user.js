// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
    },
    {
      tableName: 'Users',
      timestamps: true,
    },
  );

  User.associate = models => {
    User.belongsToMany(models.Bobbin, {
      through: 'BobbinArtists',
      as: 'bobbins',
      foreignKey: 'artistId',
    });
    User.belongsToMany(models.Role, {
      through: 'UserRole',
      as: 'roles',
      foreignKey: 'userId',
    });
  };

  return User;
};
