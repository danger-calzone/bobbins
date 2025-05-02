// models/Expression.js
module.exports = (sequelize, DataTypes) => {
  const Expression = sequelize.define(
    'Expression',
    {
      expression: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Expressions',
      timestamps: true,
    },
  );

  Expression.associate = models => {
    Expression.belongsToMany(models.Bobbin, {
      through: 'BobbinExpressions',
      as: 'bobbins',
      foreignKey: 'expressionId',
    });
  };

  return Expression;
};
