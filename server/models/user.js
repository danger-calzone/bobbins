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
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Users', // Ensure this matches the table name in your migration
      timestamps: true, // Sequelize will manage createdAt and updatedAt
    },
  );

  return User;
};
