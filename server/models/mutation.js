// models/Mutation.js
module.exports = (sequelize, DataTypes) => {
  const Mutation = sequelize.define(
    'Mutation',
    {
      mutation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isSpecial: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      isUnique: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      tableName: 'Mutations',
      timestamps: true,
    },
  );

  Mutation.associate = models => {
    Mutation.belongsToMany(models.Bobbin, {
      through: 'BobbinMutations',
      as: 'bobbins',
      foreignKey: 'mutationId',
    });
  };

  return Mutation;
};
