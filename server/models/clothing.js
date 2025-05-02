// models/Clothing.js
module.exports = (sequelize, DataTypes) => {
  const Clothing = sequelize.define(
    'Clothing',
    {
      clothing: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Clothings',
      timestamps: true,
    },
  );

  Clothing.associate = models => {
    Clothing.belongsToMany(models.Bobbin, {
      through: 'BobbinClothing',
      as: 'bobbins',
      foreignKey: 'clothingId',
    });
  };

  return Clothing;
};
