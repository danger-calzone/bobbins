// models/Bobbin.js
module.exports = (sequelize, DataTypes) => {
  const Bobbin = sequelize.define(
    'Bobbin',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageSrc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      offspringId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Bobbins',
          key: 'id',
        },
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Bobbins',
          key: 'id',
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isForSale: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      isAvailableForBreeding: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: 'Bobbins',
      timestamps: true,
    },
  );

  Bobbin.associate = models => {
    Bobbin.belongsToMany(models.User, {
      through: 'BobbinArtists',
      foreignKey: 'artistId',
      as: 'artists',
    });
    Bobbin.belongsToMany(models.Clothing, {
      through: 'BobbinClothing',
      foreignKey: 'clothingId',
      as: 'clothing',
    });
    Bobbin.belongsToMany(models.Expression, {
      through: 'BobbinExpressions',
      foreignKey: 'bobbinId',
      as: 'expressions',
    });
    Bobbin.belongsToMany(models.Mutation, {
      through: 'BobbinMutations',
      foreignKey: 'bobbinId',
      as: 'mutations',
    });
    Bobbin.belongsTo(models.Bobbin, {
      foreignKey: 'offspringId',
      as: 'offspringDetails',
    });
    Bobbin.belongsTo(models.Bobbin, {
      foreignKey: 'parentId',
      as: 'parentDetails',
    });
  };

  return Bobbin;
};
