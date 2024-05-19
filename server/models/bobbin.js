module.exports = (sequelize, DataTypes) => {
  const Bobbin = sequelize.define(
    'Bobbin',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      imageSrc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Bobbins', // Ensure this matches the table name in your migration
      timestamps: true, // Sequelize will manage createdAt and updatedAt
    },
  );

  return Bobbin;
};
