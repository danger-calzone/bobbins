// models/Mutation.js
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Roles',
      timestamps: true,
    },
  );

  Role.associate = models => {
    Role.belongsToMany(models.User, {
      through: 'UserRoles',
      as: 'users',
      foreignKey: 'roleId',
    });
  };

  return Role;
};
